import { useParams } from 'react-router-dom';
import { getPlayer } from '../api/players.js';
import useFetch from '../hooks/useFetch.js';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import BackLink from '../components/BackLink.jsx';

function PlayerDetail() {
  const { id } = useParams();
  const { data: player, error, loading } = useFetch(() => getPlayer(id), [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-3">
      <BackLink to="/players" />
      <h1 className="text-3xl font-bold">{player.name}</h1>
      <p>Score: <span className="font-semibold text-brand-500">{player.score}</span></p>
      <p>Team: {player.teamId ?? 'none'}</p>
    </div>
  );
}

export default PlayerDetail;
