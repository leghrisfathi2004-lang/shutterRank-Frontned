import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../Context/AuthContext.jsx';

const primaryBtn =
  'inline-flex h-11 items-center gap-2 rounded-lg bg-brand-600 px-5 text-sm font-medium text-white shadow-card hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600';
const secondaryBtn =
  'inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-5 text-sm font-medium shadow-card hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800';

function Home() {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white px-6 py-14 shadow-card sm:px-12 sm:py-20 dark:border-neutral-800 dark:bg-neutral-900">
      {/* faint grid in the background, fading toward the bottom */}
      <div
        className="pointer-events-none absolute inset-0 text-neutral-200 [mask-image:linear-gradient(to_bottom,black,transparent)] dark:text-neutral-800"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          Teams · Matches · Tournaments
        </span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          Compete, climb, <span className="text-brand-600 dark:text-brand-400">win.</span>
        </h1>
        <p className="mt-4 max-w-lg text-neutral-600 dark:text-neutral-400">
          ShutterRank always shows you who's winning — maybe that's you.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {user ? (
            <Link to="/me" className={primaryBtn}>
              Go to dashboard
              <ArrowRight size={16} />
            </Link>
          ) : (
            <>
              <Link to="/login" className={primaryBtn}>
                Sign in
                <ArrowRight size={16} />
              </Link>
              <Link to="/register" className={secondaryBtn}>
                Create an account
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
