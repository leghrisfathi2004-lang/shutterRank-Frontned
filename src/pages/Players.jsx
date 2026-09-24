import { useState } from 'react';
import { listPlayers } from '../api/players.js';
import useFetch from '../hooks/useFetch.js';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import PlayersTable from '../components/PlayersTable.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Pagination from '../components/Pagination.jsx';

function Players() {
  const [page, setPage] = useState(1);
  const { data, error, loading, refetch } = useFetch(() => listPlayers(page), [page]);

  return (
    <div>
      <PageHeader title="Players" subtitle="Everyone on ShutterRank." />

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : (
        <>
          <PlayersTable players={data.items} />
          <Pagination page={data.page} pages={data.pages} onChange={setPage} />
        </>
      )}
    </div>
  );
}

export default Players;
