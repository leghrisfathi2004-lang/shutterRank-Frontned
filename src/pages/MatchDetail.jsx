import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Flag, Info, Play, Plus } from 'lucide-react';
import { getMatchProfile, startMatch, addGoal } from '../api/matches.js';
import useFetch from '../hooks/useFetch.js';
import { useAuth } from '../Context/AuthContext.jsx';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import BackLink from '../components/BackLink.jsx';
import StatusPill from '../components/StatusPill.jsx';
import Card from '../components/Card.jsx';
import Avatar from '../components/Avatar.jsx';
import Button from '../components/Button.jsx';
import FinishMatchModal from '../components/FinishMatchModal.jsx';

function MatchDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { data: match, error, loading, refetch } = useFetch(() => getMatchProfile(id), [id]);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [finishing, setFinishing] = useState(false);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  const isAdmin = user?.role === 'admin';
  const [t1, t2] = match.teams ?? [];

  // runs an admin action (start / goal), then reloads the match
  const doAction = async (fn) => {
    setActionError(null);
    setBusy(true);
    try {
      await fn();
      refetch();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setBusy(false);
    }
  };

  // one side of the scoreboard; team is null while a tournament slot is still empty
  const teamBlock = (side) => {
    const team = side?.teamId;
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <Avatar name={team?.name ?? '?'} size="lg" square />
        {team ? (
          <Link to={`/teams/${team._id}`} className="font-semibold hover:underline">
            {team.name}
          </Link>
        ) : (
          <span className="italic text-neutral-400">TBD</span>
        )}
        {isAdmin && match.status === 'live' && team && (
          <Button size="sm" variant="secondary" icon={Plus} disabled={busy} onClick={() => doAction(() => addGoal(id, team._id))}>
            Goal
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <BackLink to="/matches" label="All matches" />

      {/* scoreboard */}
      <div className="rounded-card border border-neutral-200 bg-white px-4 py-8 shadow-card dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mb-6 flex justify-center">
          <StatusPill status={match.status} />
        </div>
        <div className="grid grid-cols-3 items-start">
          {teamBlock(t1)}
          <div className="flex items-center justify-center gap-3 pt-2 text-4xl font-bold sm:text-6xl">
            <span>{t1?.goals ?? 0}</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-xs font-semibold uppercase text-neutral-400 dark:border-neutral-700">
              vs
            </span>
            <span>{t2?.goals ?? 0}</span>
          </div>
          {teamBlock(t2)}
        </div>
      </div>

      {/* admin actions */}
      {isAdmin && match.status !== 'completed' && (
        <div className="flex flex-wrap items-center gap-3">
          {match.status === 'scheduled' && (
            <Button icon={Play} loading={busy} onClick={() => doAction(() => startMatch(id))}>
              Start match
            </Button>
          )}
          {match.status === 'live' && (
            <Button icon={Flag} variant="danger" onClick={() => setFinishing(true)}>
              Finish match
            </Button>
          )}
          <ErrorMessage message={actionError} />
        </div>
      )}

      {/* extra info — the backend populates winnerId, tournoiId and nextMatchId */}
      {(match.winnerId || match.tournoiId || match.nextMatchId) && (
        <Card title="Details" icon={Info} className="max-w-xl">
          <div className="space-y-2 text-sm">
            {match.winnerId && (
              <p>
                <span className="text-neutral-500">Winner: </span>
                <Link to={`/teams/${match.winnerId._id}`} className="font-medium hover:underline">
                  {match.winnerId.name}
                </Link>
              </p>
            )}
            {match.tournoiId && (
              <p>
                <span className="text-neutral-500">Tournament: </span>
                <Link to={`/tournaments/${match.tournoiId._id}`} className="font-medium hover:underline">
                  {match.tournoiId.name}
                </Link>
              </p>
            )}
            {match.nextMatchId && (
              <p>
                <span className="text-neutral-500">Next match: </span>
                <Link to={`/matches/${match.nextMatchId._id}`} className="font-medium hover:underline">
                  Round {match.nextMatchId.round} →
                </Link>
              </p>
            )}
          </div>
        </Card>
      )}

      {finishing && (
        <FinishMatchModal
          matchId={id}
          teams={[t1?.teamId, t2?.teamId].filter(Boolean)}
          onClose={() => setFinishing(false)}
          onSuccess={refetch}
        />
      )}
    </div>
  );
}

export default MatchDetail;
