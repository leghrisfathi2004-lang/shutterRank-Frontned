import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Gift, Lock, Trophy } from 'lucide-react';
import { getTournamentProfile, closeTournament } from '../api/tournaments.js';
import useFetch from '../hooks/useFetch.js';
import { useAuth } from '../Context/AuthContext.jsx';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import BackLink from '../components/BackLink.jsx';
import StatusPill from '../components/StatusPill.jsx';
import TeamsGrid from '../components/TeamsGrid.jsx';
import MatchesTable from '../components/MatchesTable.jsx';
import Button from '../components/Button.jsx';

function TournamentDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { data, error, loading, refetch } = useFetch(() => getTournamentProfile(id), [id]);
  const [closing, setClosing] = useState(false);
  const [closeError, setCloseError] = useState(null);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  // the profile endpoint returns { tournoi, matches }
  const t = data.tournoi;
  const matches = data.matches ?? [];
  const teams = t.teams ?? [];

  const handleClose = async () => {
    setCloseError(null);
    setClosing(true);
    try {
      await closeTournament(id);
      refetch();
    } catch (err) {
      setCloseError(err.message);
    } finally {
      setClosing(false);
    }
  };

  return (
    <div className="space-y-8">
      <BackLink to="/tournaments" label="All tournaments" />

      {/* header */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-400">
          <Trophy size={26} />
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">{t.name}</h1>
            <StatusPill status={t.status} />
          </div>
          <p className="mt-1 text-sm text-neutral-500">
            {teams.length} teams · {matches.length} matches
          </p>
        </div>
        {user?.role === 'admin' && t.status === 'progress' && (
          <Button variant="secondary" icon={Lock} loading={closing} onClick={handleClose}>
            Close tournament
          </Button>
        )}
      </div>
      <ErrorMessage message={closeError} />

      {t.prize && (
        <div className="flex items-center gap-4 rounded-card border border-accent-500/25 bg-accent-50/60 px-5 py-4 dark:bg-accent-500/5">
          <Gift size={20} className="text-accent-600 dark:text-accent-400" />
          <p>
            <span className="text-sm text-neutral-500">Prize: </span>
            <span className="font-semibold">
              {t.prize.provider} · {t.prize.value}
            </span>
          </p>
        </div>
      )}

      <section>
        <h2 className="mb-3 font-semibold">Matches</h2>
        <MatchesTable matches={matches} showRound />
      </section>

      <section>
        <h2 className="mb-3 font-semibold">Teams</h2>
        <TeamsGrid teams={teams} />
      </section>
    </div>
  );
}

export default TournamentDetail;
