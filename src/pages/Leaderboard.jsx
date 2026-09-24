import { useState } from 'react';
import { getLeaderboard } from '../api/players.js';
import useFetch from '../hooks/useFetch.js';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LeaderboardTable from '../components/LeaderboardTable.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Pagination from '../components/Pagination.jsx';

function Leaderboard() {
  const [page, setPage] = useState(1);
  const { data, error, loading, refetch } = useFetch(() => getLeaderboard(page), [page]);

  return (
    <div>
      <PageHeader title="Leaderboard" subtitle="Players ranked by score." />

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : (
        <>
          {/* 10 players per page → page 2 starts at rank 11 */}
          <LeaderboardTable players={data.items} offset={(data.page - 1) * 10} />
          <Pagination page={data.page} pages={data.pages} onChange={setPage} />
        </>
      )}
    </div>
  );
}

export default Leaderboard;
