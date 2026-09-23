import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const LINKS = [
  { to: '/players', label: 'Players' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/matches', label: 'Matches' },
];

function Navbar() {
  const { user, loading, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-10 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto max-w-5xl px-6 py-3 flex items-center gap-4">
        <Link to="/" className="text-lg font-bold text-brand-600 dark:text-brand-400">
          ShutterRank
        </Link>
        {LINKS.map((l) => (
          <Link key={l.to} to={l.to} className="text-sm hover:underline">
            {l.label}
          </Link>
        ))}

        <div className="ml-auto flex items-center gap-2 text-sm">
          {loading ? (
            <span className="text-neutral-500">…</span>
          ) : user ? (
            <>
              <span className="hidden sm:inline">Signed in as <strong>{user.name}</strong></span>
              <button
                onClick={logout}
                className="rounded-md px-3 py-1 text-red-600 hover:bg-red-500/10 dark:text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-md bg-brand-500 px-3 py-1 text-white hover:bg-brand-600"
            >
              Login
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
