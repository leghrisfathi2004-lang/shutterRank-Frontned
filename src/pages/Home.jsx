import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.jsx';

function Home() {
  const { user } = useAuth();
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">
        Welcome to <span className="text-brand-500">ShutterRank</span>
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400">
        Track players, teams, matches, and tournaments.
      </p>
      <div className="flex gap-3">
        <Link to="/players" className="text-brand-600 dark:text-brand-400 hover:underline">
          Browse players
        </Link>
        {!user && (
          <Link to="/login" className="text-brand-600 dark:text-brand-400 hover:underline">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
