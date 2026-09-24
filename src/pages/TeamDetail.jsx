import { useParams, Link } from 'react-router-dom';
import { Crown, Gift, Trophy, Users } from 'lucide-react';
import { getTeamProfile } from '../api/teams.js';
import { TEAM_MAX_PLAYERS } from '../config.js';
import useFetch from '../hooks/useFetch.js';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import BackLink from '../components/BackLink.jsx';
import StatusPill from '../components/StatusPill.jsx';
import Card from '../components/Card.jsx';
import Avatar from '../components/Avatar.jsx';
import JoinTeamButton from '../components/JoinTeamButton.jsx';

function TeamDetail() {
  const { id } = useParams();
  const { data: team, error, loading, refetch } = useFetch(() => getTeamProfile(id), [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  const members = team.members ?? [];
  const trophies = team.trophies ?? []; // tournament names (strings)
  const giftcards = team.giftcards ?? [];

  return (
    <div className="space-y-6">
      <BackLink to="/teams" label="All teams" />

      {/* header */}
      <div className="flex flex-wrap items-center gap-4">
        <Avatar name={team.name} size="lg" square />
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">{team.name}</h1>
            <StatusPill status={team.status} />
          </div>
          <p className="mt-1 text-sm text-neutral-500">
            {team.players ?? 0} / {TEAM_MAX_PLAYERS} players
          </p>
        </div>
        <JoinTeamButton teamId={id} teamStatus={team.status} onSuccess={refetch} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Leader" icon={Crown}>
          {team.leader ? (
            <Link to={`/players/${team.leader._id}`} className="flex items-center gap-3 hover:underline">
              <Avatar name={team.leader.name} size="md" />
              <span className="font-medium">{team.leader.name}</span>
            </Link>
          ) : (
            <p className="text-sm text-neutral-500">No leader.</p>
          )}
        </Card>

        <Card title={`Members (${members.length})`} icon={Users}>
          {members.length === 0 ? (
            <p className="text-sm text-neutral-500">No other members yet.</p>
          ) : (
            <ul className="space-y-2">
              {members.map((p) => (
                <li key={p._id}>
                  <Link to={`/players/${p._id}`} className="flex items-center gap-3 text-sm hover:underline">
                    <Avatar name={p.name} size="sm" />
                    <span className="flex-1 font-medium">{p.name}</span>
                    <span className="text-xs text-neutral-500">{p.score} pts</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title={`Trophies (${trophies.length})`} icon={Trophy}>
          {trophies.length === 0 ? (
            <p className="text-sm text-neutral-500">No trophies yet — win a tournament to earn one.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {trophies.map((name, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 rounded-full bg-accent-50 px-3 py-1 text-sm font-medium text-accent-600 dark:bg-accent-500/10 dark:text-accent-400"
                >
                  <Trophy size={13} />
                  {name}
                </span>
              ))}
            </div>
          )}
        </Card>

        <Card title={`Gift cards (${giftcards.length})`} icon={Gift}>
          {giftcards.length === 0 ? (
            <p className="text-sm text-neutral-500">No gift cards won yet.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {giftcards.map((g) => (
                <li key={g._id} className="flex justify-between">
                  <span className="font-medium">{g.provider}</span>
                  <span className="font-semibold">{g.value}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}

export default TeamDetail;
