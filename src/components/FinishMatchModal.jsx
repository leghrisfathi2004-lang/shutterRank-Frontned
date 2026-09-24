import { useState } from 'react';
import { Trophy, X } from 'lucide-react';
import { finishMatch } from '../api/matches.js';
import Avatar from './Avatar.jsx';
import Button from './Button.jsx';
import ErrorMessage from './ErrorMessage.jsx';

function FinishMatchModal({ matchId, teams, onClose, onSuccess }) {
  const [winnerId, setWinnerId] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handle = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await finishMatch(matchId, winnerId);
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
            <h2 className="text-lg font-semibold">Finish match</h2>
            <p className="mt-0.5 text-sm text-neutral-500">Who won? This ends the match.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        <div className="grid gap-4 px-6 py-5">
          <div role="radiogroup" aria-label="Winner" className="grid grid-cols-2 gap-3">
            {teams.map((t) => {
              const selected = winnerId === t._id;
              return (
                <label
                  key={t._id}
                  className={`relative flex cursor-pointer flex-col items-center gap-2 rounded-card border p-4 text-center transition-colors ${
                    selected
                      ? 'border-brand-500 bg-brand-50/60 ring-1 ring-brand-500 dark:bg-brand-500/10'
                      : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/60'
                  }`}
                >
                  <input
                    type="radio"
                    name="winner"
                    value={t._id}
                    checked={selected}
                    onChange={() => setWinnerId(t._id)}
                    className="sr-only"
                  />
                  {selected && (
                    <Trophy
                      size={16}
                      aria-hidden
                      className="absolute right-3 top-3 text-accent-500"
                    />
                  )}
                  <Avatar name={t.name} size="md" square />
                  <span className="w-full truncate text-sm font-medium">{t.name}</span>
                </label>
              );
            })}
          </div>
          <ErrorMessage message={error} />
        </div>

        <div className="flex justify-end gap-2 border-t border-neutral-100 bg-neutral-50/60 px-6 py-4 dark:border-neutral-800 dark:bg-neutral-950/30">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handle} loading={submitting} disabled={!winnerId}>
            {submitting ? 'Finishing…' : 'Finish match'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FinishMatchModal;
