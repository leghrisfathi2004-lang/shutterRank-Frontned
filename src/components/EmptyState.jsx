import { Inbox } from 'lucide-react';

// shown instead of a list/table when there's nothing to display
function EmptyState({ icon: Icon = Inbox, title, text, action }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-neutral-300 px-6 py-12 text-center dark:border-neutral-800">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 dark:bg-neutral-800">
        <Icon size={20} />
      </span>
      <p className="font-semibold">{title}</p>
      {text && <p className="max-w-sm text-sm text-neutral-500">{text}</p>}
      {action}
    </div>
  );
}

export default EmptyState;
