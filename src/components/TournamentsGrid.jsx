import { Link } from 'react-router-dom';
import { Gift, Trophy } from 'lucide-react';
import StatusPill from './StatusPill.jsx';
import EmptyState from './EmptyState.jsx';

function TournamentsGrid({ tournaments }) {
  if (tournaments.length === 0) {
    return <EmptyState icon={Trophy} title="No tournaments" text="No tournaments have been created yet." />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tournaments.map((t) => (
        <Link
          key={t._id}
          to={`/tournaments/${t._id}`}
          className="rounded-card border border-neutral-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-pop dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-400">
              <Trophy size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{t.name}</p>
              <p className="mt-1 text-xs text-neutral-500">{t.teams?.length ?? 0} teams</p>
            </div>
            <StatusPill status={t.status} />
          </div>

          {/* the list endpoint populates prize → { provider, value } */}
          <p className="mt-4 flex items-center gap-2 border-t border-neutral-100 pt-3 text-sm dark:border-neutral-800">
            <Gift size={15} className="text-accent-500" />
            {t.prize ? `${t.prize.provider} · ${t.prize.value}` : 'No prize'}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default TournamentsGrid;
