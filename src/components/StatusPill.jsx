function StatusPill({ status }) {
  const styles = {
    open: 'bg-brand-500/15 text-brand-600 dark:text-brand-400',
    full: 'bg-red-500/15 text-red-600 dark:text-red-400',
    scheduled: 'bg-neutral-500/15 text-neutral-600 dark:text-neutral-400',
    live: 'bg-accent-500/20 text-accent-500',
    completed: 'bg-neutral-500/15 text-neutral-600 dark:text-neutral-400',
    progress: 'bg-accent-500/20 text-accent-500',
    complete: 'bg-brand-500/15 text-brand-600 dark:text-brand-400',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
        styles[status] || styles.open
      }`}
    >
      {status}
    </span>
  );
}

export default StatusPill;
