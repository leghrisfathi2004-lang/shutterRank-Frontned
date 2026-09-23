import { listPlayers } from '../api/players.js';
import useFetch from '../hooks/useFetch.js';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import PlayersTable from '../components/PlayersTable.jsx';

function Players() {
  const { data: page, error, loading } = useFetch(() => listPlayers(1), []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Players</h1>
      <p className="text-sm text-neutral-500">
        Page {page.page} / {page.pages} — {page.total} total
      </p>
      <PlayersTable players={page.items} />
    </div>
  );
}

export default Players;
