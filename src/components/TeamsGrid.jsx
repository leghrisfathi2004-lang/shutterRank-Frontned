import { Link } from 'react-router-dom';
import { Shield, Users } from 'lucide-react';
import { TEAM_MAX_PLAYERS } from '../config.js';
import Avatar from './Avatar.jsx';
import StatusPill from './StatusPill.jsx';
import EmptyState from './EmptyState.jsx';

function TeamsGrid({ teams }) {
  if (teams.length === 0) {
    return <EmptyState icon={Shield} title="No teams yet" text="Teams will show up here once someone creates one." />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {teams.map((team) => (
        <Link
          key={team._id}
          to={`/teams/${team._id}`}
          className="flex items-center gap-3 rounded-card border border-neutral-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-pop dark:border-neutral-800 dark:bg-neutral-900"
        >
          <Avatar name={team.name} size="md" square />
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{team.name}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
              <Users size={13} />
              {team.players ?? 0}/{TEAM_MAX_PLAYERS} players
            </p>
          </div>
          <StatusPill status={team.status} />
        </Link>
      ))}
    </div>
  );
}

export default TeamsGrid;
