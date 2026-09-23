import { useState } from 'react';
import { listTeams, listOpenTeams, listFullTeams } from '../api/teams.js';
import useFetch from '../hooks/useFetch.js';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Tabs from '../components/Tabs.jsx';
import TeamsGrid from '../components/TeamsGrid.jsx';

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
  const { data: page, error, loading } = useFetch(() => fetchers[tab](1), [tab]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Teams</h1>
      <Tabs tabs={TABS} active={tab} onChange={setTab} />
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <p className="text-sm text-neutral-500">
            {page.total} total — page {page.page} / {page.pages}
          </p>
          <TeamsGrid teams={page.items} />
        </>
      )}
    </div>
  );
}

export default Teams;
