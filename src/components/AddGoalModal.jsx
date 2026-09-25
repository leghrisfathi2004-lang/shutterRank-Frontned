import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { addGoal } from '../api/matches.js';
import { getTeamProfile } from '../api/teams.js';
import Avatar from './Avatar.jsx';
import Button from './Button.jsx';
import ErrorMessage from './ErrorMessage.jsx';

// team = { _id, name } of the side that scored → pick which of its players scored
function AddGoalModal({ matchId, team, onClose, onSuccess }) {
  const [players, setPlayers] = useState([]);
  const [scorerId, setScorerId] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // the team profile gives the leader + the other members
  useEffect(() => {
    getTeamProfile(team._id)
      .then((t) => setPlayers([t.leader, ...(t.members ?? [])].filter(Boolean)))
      .catch((err) => setError(err.message));
  }, [team._id]);

  const handle = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await addGoal(matchId, team._id, scorerId);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-end justify-center bg-neutral-950/40 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md animate-scale-in overflow-hidden rounded-pop border border-neutral-200 bg-white shadow-pop dark:border-neutral-800 dark:bg-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-5">
          <div>
            <h2 className="text-lg font-semibold">Goal for {team.name}</h2>
            <p className="mt-0.5 text-sm text-neutral-500">Who scored? They get +1 score.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-4 px-6 py-5">
          <div className="max-h-64 space-y-1 overflow-y-auto">
            {players.map((p) => (
              <label
                key={p._id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm ${
                  scorerId === p._id
                    ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-500/10'
                    : 'border-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
                }`}
              >
                <input
                  type="radio"
                  name="scorer"
                  checked={scorerId === p._id}
                  onChange={() => setScorerId(p._id)}
                  className="sr-only"
                />
                <Avatar name={p.name} size="sm" />
                <span className="flex-1 font-medium">{p.name}</span>
                <span className="text-xs text-neutral-500">{p.score} pts</span>
              </label>
            ))}
          </div>
          <ErrorMessage message={error} />
        </div>

        <div className="flex justify-end gap-2 border-t border-neutral-100 bg-neutral-50/60 px-6 py-4 dark:border-neutral-800 dark:bg-neutral-950/30">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handle} loading={submitting} disabled={!scorerId}>
            {submitting ? 'Saving…' : 'Add goal'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddGoalModal;
