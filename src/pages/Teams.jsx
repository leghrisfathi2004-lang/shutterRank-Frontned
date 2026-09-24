import { useState } from 'react';
import { listTeams, listOpenTeams, listFullTeams } from '../api/teams.js';
import useFetch from '../hooks/useFetch.js';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Tabs from '../components/Tabs.jsx';
import TeamsGrid from '../components/TeamsGrid.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Pagination from '../components/Pagination.jsx';

const TABS = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'full', label: 'Full' },
];

const fetchers = {
  all: listTeams,
  open: listOpenTeams,
  full: listFullTeams,
};

function Teams() {
  const [tab, setTab] = useState('all');
  const [page, setPage] = useState(1);
  const { data, error, loading, refetch } = useFetch(() => fetchers[tab](page), [tab, page]);

  // new tab → start again from page 1
  const changeTab = (value) => {
    setTab(value);
    setPage(1);
  };

  return (
    <div>
      <PageHeader title="Teams" subtitle="Browse squads and join one that has room." />
      <div className="mb-5">
        <Tabs tabs={TABS} active={tab} onChange={changeTab} />
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : (
        <>
          <TeamsGrid teams={data.items} />
          <Pagination page={data.page} pages={data.pages} onChange={setPage} />
        </>
      )}
    </div>
  );
}

export default Teams;
