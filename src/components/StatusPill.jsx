// green = good/active, grey = neutral, amber = in progress, red = full
const GREEN = 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400';
const GREY = 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400';
const AMBER = 'bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-400';
const RED = 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400';

const COLORS = {
  open: GREEN,
  full: RED,
  scheduled: GREY,
  live: GREEN,
  completed: GREY,
  progress: AMBER,
  complete: GREEN,
  assigned: GREEN,
  unassigned: GREY,
};

function StatusPill({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${COLORS[status] || GREY}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full bg-current ${status === 'live' ? 'animate-pulse' : ''}`} />
      {status}
    </span>
  );
}

export default StatusPill;
