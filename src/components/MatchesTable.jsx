import { useNavigate } from 'react-router-dom';
import { Swords } from 'lucide-react';
import StatusPill from './StatusPill.jsx';
import EmptyState from './EmptyState.jsx';

// teamId is an object {_id, name} on detail pages, a plain id string on the /matchs list,
// and null for tournament matches whose teams aren't known yet
function teamName(side) {
  const team = side?.teamId;
  if (!team) return 'TBD';
  if (typeof team === 'string') return `#${team.slice(-6)}`;
  return team.name;
}

function MatchesTable({ matches, showRound = false }) {
  const navigate = useNavigate();

  if (matches.length === 0) {
    return <EmptyState icon={Swords} title="No matches yet" text="Scheduled matches will appear here." />;
  }

  return (
    <div className="overflow-x-auto rounded-card border border-neutral-200 bg-white shadow-card dark:border-neutral-800 dark:bg-neutral-900">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50 text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/60">
            <th className="px-4 py-2.5 font-medium">Match</th>
            {showRound && <th className="px-4 py-2.5 font-medium">Round</th>}
            <th className="px-4 py-2.5 text-right font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {matches.map((m) => {
            const [t1, t2] = m.teams ?? [];
            return (
              <tr
                key={m._id}
                onClick={() => navigate(`/matches/${m._id}`)}
                className="cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
              >
                <td className="px-4 py-3">
                  {/* Team A  [2 – 1]  Team B */}
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <span className="truncate text-right font-medium">{teamName(t1)}</span>
                    <span className="rounded-md bg-neutral-100 px-2 py-0.5 font-semibold dark:bg-neutral-800">
                      {t1?.goals ?? 0} – {t2?.goals ?? 0}
                    </span>
                    <span className="truncate font-medium">{teamName(t2)}</span>
                  </div>
                </td>
                {showRound && (
                  <td className="px-4 py-3 text-neutral-500">{m.round ? `Round ${m.round}` : '—'}</td>
                )}
                <td className="px-4 py-3 text-right">
                  <StatusPill status={m.status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MatchesTable;
