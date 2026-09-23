import { useNavigate } from 'react-router-dom';
import StatusPill from './StatusPill.jsx';

function MatchesTable({ matches }) {
  const navigate = useNavigate();

  if (matches.length === 0) {
    return <p className="text-neutral-500">No matches.</p>;
  }

  const label = (t) =>
    t?.teamId?.name ?? (typeof t?.teamId === 'string' ? t.teamId.slice(-6) : '—');

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-neutral-200 dark:border-neutral-800 text-xs uppercase text-neutral-500">
          <th className="py-2 pr-4 font-medium">Team 1</th>
          <th className="py-2 pr-4 font-medium text-center">Score</th>
          <th className="py-2 pr-4 font-medium">Team 2</th>
          <th className="py-2 pr-4 font-medium">Status</th>
        </tr>
      </thead>
      <tbody>
        {matches.map((m) => {
          const [t1, t2] = m.teams ?? [];
          return (
            <tr
              key={m._id}
              onClick={() => navigate(`/matches/${m._id}`)}
              className="cursor-pointer border-b border-neutral-100 dark:border-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900"
            >
              <td className="py-2 pr-4 font-medium">{label(t1)}</td>
              <td className="py-2 pr-4 text-center font-semibold">
                {t1?.goals ?? 0} — {t2?.goals ?? 0}
              </td>
              <td className="py-2 pr-4 font-medium">{label(t2)}</td>
              <td className="py-2 pr-4">
                <StatusPill status={m.status} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default MatchesTable;
