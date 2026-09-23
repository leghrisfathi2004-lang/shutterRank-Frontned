import { Link } from 'react-router-dom';
import StatusPill from './StatusPill.jsx';

function TeamCard({ team }) {
  return (
    <Link
      to={`/teams/${team._id}`}
      className="block rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 hover:border-brand-500/50 transition"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{team.name}</h3>
        <StatusPill status={team.status} />
      </div>
    </Link>
  );
}

export default TeamCard;
