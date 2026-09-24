import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Mail, Plus, Shield } from 'lucide-react';
import { useAuth } from '../Context/AuthContext.jsx';
import { TEAM_MAX_PLAYERS } from '../config.js';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Avatar from '../components/Avatar.jsx';
import StatusPill from '../components/StatusPill.jsx';
import EmptyState from '../components/EmptyState.jsx';
import CreateTeamModal from '../components/CreateTeamModal.jsx';
import QuitTeamConfirm from '../components/QuitTeamConfirm.jsx';

function Me() {
  const { user, refreshUser } = useAuth();
  const [creating, setCreating] = useState(false);
  const [quitting, setQuitting] = useState(false);

  const team = user.teamId; // populated by /players/me, or null

  return (
    <div className="max-w-3xl space-y-6">
      {/* profile */}
      <Card className="flex flex-wrap items-center gap-5">
        <Avatar name={user.name} size="xl" />
        <div className="flex-1">
          <p className="text-sm text-neutral-500">Welcome back,</p>
          <h1 className="text-2xl font-semibold">{user.name}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-neutral-500">
            <Mail size={14} />
            {user.email}
            <span className="ml-2 rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium capitalize dark:bg-neutral-800">
              {user.role}
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-neutral-500">Score</p>
          <p className="text-3xl font-semibold">{user.score}</p>
        </div>
      </Card>

      {/* team */}
      {team ? (
        <Card title="Your team" icon={Shield}>
          <Link to={`/teams/${team._id}`} className="flex items-center gap-3 hover:underline">
            <Avatar name={team.name} size="lg" square />
            <div className="flex-1">
              <p className="font-semibold">{team.name}</p>
              <p className="text-xs text-neutral-500">
                {team.players ?? 0}/{TEAM_MAX_PLAYERS} players
              </p>
            </div>
            <StatusPill status={team.status} />
          </Link>
          <div className="mt-4 flex justify-end border-t border-neutral-100 pt-4 dark:border-neutral-800">
            <Button variant="danger-ghost" size="sm" icon={LogOut} onClick={() => setQuitting(true)}>
              Quit team
            </Button>
          </div>
        </Card>
      ) : (
        <EmptyState
          icon={Shield}
          title="You're not on a team"
          text="Create your own squad or join one that still has room."
          action={
            <div className="flex gap-2">
              <Button icon={Plus} onClick={() => setCreating(true)}>
                Create team
              </Button>
              <Link
                to="/teams"
                className="inline-flex h-9 items-center rounded-lg border border-neutral-200 bg-white px-4 text-sm font-medium hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              >
                Browse teams
              </Link>
            </div>
          }
        />
      )}

      {creating && <CreateTeamModal onClose={() => setCreating(false)} onSuccess={refreshUser} />}
      {quitting && <QuitTeamConfirm onClose={() => setQuitting(false)} onSuccess={refreshUser} />}
    </div>
  );
}

export default Me;
