import { useParams, Link } from 'react-router-dom';
import { Shield, Star } from 'lucide-react';
import { getPlayer } from '../api/players.js';
import useFetch from '../hooks/useFetch.js';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import BackLink from '../components/BackLink.jsx';
import Card from '../components/Card.jsx';
import Avatar from '../components/Avatar.jsx';

function PlayerDetail() {
  const { id } = useParams();
  const { data: player, error, loading, refetch } = useFetch(() => getPlayer(id), [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  const team = player.teamId; // populated: { _id, name, ... } or null

  return (
    <div className="space-y-6">
      <BackLink to="/players" label="All players" />

      <div className="flex items-center gap-4">
        <Avatar name={player.name} size="xl" />
        <div>
          <h1 className="text-2xl font-semibold">{player.name}</h1>
          <p className="mt-1 text-sm text-neutral-500">{team ? `Plays for ${team.name}` : 'Free agent'}</p>
        </div>
      </div>

      <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
        <Card title="Score" icon={Star}>
          <p className="text-3xl font-semibold">{player.score}</p>
        </Card>

        <Card title="Team" icon={Shield}>
          {team ? (
            <Link to={`/teams/${team._id}`} className="flex items-center gap-3 hover:underline">
              <Avatar name={team.name} size="md" square />
              <span className="font-medium">{team.name}</span>
            </Link>
          ) : (
            <p className="text-sm text-neutral-500">Not on a team yet.</p>
          )}
        </Card>
      </div>
    </div>
  );
}

export default PlayerDetail;
