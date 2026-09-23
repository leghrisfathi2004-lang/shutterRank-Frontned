import { getLeaderboard } from '../api/players.js';
import useFetch from '../hooks/useFetch.js';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LeaderboardTable from '../components/LeaderboardTable.jsx';

function Leaderboard() {
  const { data: page, error, loading } = useFetch(() => getLeaderboard(1), []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      <p className="text-sm text-neutral-500">Top {page.items.length} players</p>
      <LeaderboardTable players={page.items} />
    </div>
  );
}

export default Leaderboard;
