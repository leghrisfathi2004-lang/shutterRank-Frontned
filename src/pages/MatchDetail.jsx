import { useParams, Link } from 'react-router-dom';
import { getMatchProfile } from '../api/matches.js';
import useFetch from '../hooks/useFetch.js';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import BackLink from '../components/BackLink.jsx';
import StatusPill from '../components/StatusPill.jsx';

function MatchDetail() {
  const { id } = useParams();
  const { data: match, error, loading } = useFetch(() => getMatchProfile(id), [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const [t1, t2] = match.teams ?? [];
  const team = (t) => t?.teamId;
  const goals = (t) => t?.goals ?? 0;

  const teamBlock = (t, fallback) => {
    const info = team(t);
    return (
      <div className="text-center">
        {info ? (
          <Link
            to={`/teams/${info._id}`}
            className="text-lg font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            {info.name}
          </Link>
        ) : (
          <span className="text-neutral-500">{fallback}</span>
        )}
        <div className="text-4xl font-bold mt-1">{goals(t)}</div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <BackLink to="/matches" />

      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Match</h1>
        <StatusPill status={match.status} />
      </div>

      <div className="grid grid-cols-3 items-center gap-4 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
        {teamBlock(t1, 'Team 1')}
        <div className="text-center text-neutral-500 font-medium">vs</div>
        {teamBlock(t2, 'Team 2')}
      </div>

      {match.winner && (
        <p>
          Winner:{' '}
          <Link
            to={`/teams/${match.winner._id}`}
            className="font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            {match.winner.name}
          </Link>
        </p>
      )}

      {match.tournoi && (
        <p>
          Part of tournament:{' '}
          <Link
            to={`/tournaments/${match.tournoi._id}`}
            className="text-brand-600 dark:text-brand-400 hover:underline"
          >
            {match.tournoi.name}
          </Link>
        </p>
      )}

      {match.nextMatch && (
        <p>
          Next match:{' '}
          <Link
            to={`/matches/${match.nextMatch._id}`}
            className="text-brand-600 dark:text-brand-400 hover:underline"
          >
            View →
          </Link>
        </p>
      )}
    </div>
  );
}

export default MatchDetail;
