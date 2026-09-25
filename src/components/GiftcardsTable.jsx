import { Gift, Send } from 'lucide-react';
import StatusPill from './StatusPill.jsx';
import EmptyState from './EmptyState.jsx';
import Button from './Button.jsx';

// onAssign(id) → the page opens the AssignGiftcardModal for that gift card
function GiftcardsTable({ giftcards, onAssign }) {
  if (giftcards.length === 0) {
    return <EmptyState icon={Gift} title="No gift cards" text="Create a gift card to use it as a tournament prize." />;
  }

  return (
    <div className="overflow-x-auto rounded-card border border-neutral-200 bg-white shadow-card dark:border-neutral-800 dark:bg-neutral-900">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50 text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/60">
            <th className="px-4 py-2.5 font-medium">Provider</th>
            <th className="px-4 py-2.5 font-medium">Value</th>
            <th className="px-4 py-2.5 font-medium">Code</th>
            <th className="px-4 py-2.5 font-medium">Status</th>
            <th className="px-4 py-2.5 text-right font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {giftcards.map((g) => (
            <tr key={g._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
              <td className="px-4 py-3 font-medium">{g.provider}</td>
              <td className="px-4 py-3 font-semibold">{g.value}</td>
              <td className="px-4 py-3 font-mono text-xs text-neutral-500">{g.code}</td>
              <td className="px-4 py-3">
                <StatusPill status={g.status} />
              </td>
              <td className="px-4 py-3 text-right">
                {!g.winnerId && (
                  <Button size="sm" variant="secondary" icon={Send} onClick={() => onAssign(g._id)}>
                    Assign
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GiftcardsTable;
