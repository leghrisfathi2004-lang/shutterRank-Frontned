import { Link } from 'react-router-dom';

function TeamMembers({ players }) {
  if (!players || players.length === 0) {
    return <p className="text-neutral-500">No members.</p>;
  }
  return (
    <ul className="space-y-1">
      {players.map((p) => (
        <li key={p._id} className="flex items-center justify-between">
          <Link
            to={`/players/${p._id}`}
            className="text-brand-600 dark:text-brand-400 hover:underline"
          >
            {p.name}
          </Link>
          <span className="text-sm text-neutral-500">score {p.score}</span>
        </li>
      ))}
    </ul>
  );
}

export default TeamMembers;
