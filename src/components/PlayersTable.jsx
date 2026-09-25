import { Users } from 'lucide-react';
import Avatar from './Avatar.jsx';
import EmptyState from './EmptyState.jsx';

function PlayersTable({ players }) {
  if (players.length === 0) {
    return <EmptyState icon={Users} title="No players yet" text="Registered players will appear here." />;
  }

  return (
    <div className="overflow-x-auto rounded-card border border-neutral-200 bg-white shadow-card dark:border-neutral-800 dark:bg-neutral-900">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50 text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/60">
            <th className="px-4 py-2.5 font-medium">Player</th>
            <th className="px-4 py-2.5 font-medium">Team</th>
            <th className="px-4 py-2.5 text-right font-medium">Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {players.map((p) => (
            <tr key={p._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar name={p.name} size="sm" />
                  <span className="font-medium">{p.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-neutral-500">{p.teamId?.name ?? 'Free agent'}</td>
              <td className="px-4 py-3 text-right font-semibold">{p.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayersTable;
