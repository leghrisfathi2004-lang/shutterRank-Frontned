import { useNavigate } from 'react-router-dom';

function PlayersTable({ players }) {
  const navigate = useNavigate();

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-neutral-200 dark:border-neutral-800 text-xs uppercase text-neutral-500">
          <th className="py-2 pr-4 font-medium">Name</th>
          <th className="py-2 pr-4 font-medium">Score</th>
          <th className="py-2 pr-4 font-medium">Team</th>
        </tr>
      </thead>
      <tbody>
        {players.map((p) => (
          <tr
            key={p._id}
            onClick={() => navigate(`/players/${p._id}`)}
            className="cursor-pointer border-b border-neutral-100 dark:border-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            <td className="py-2 pr-4 font-medium text-brand-600 dark:text-brand-400">{p.name}</td>
            <td className="py-2 pr-4">{p.score}</td>
            <td className="py-2 pr-4 text-neutral-500">{p.teamId ?? '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PlayersTable;
