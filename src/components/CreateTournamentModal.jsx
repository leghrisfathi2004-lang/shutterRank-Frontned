import { useState, useEffect } from 'react';
import { Check, Trophy, X } from 'lucide-react';
import { createTournament } from '../api/tournaments.js';
import { listTeams } from '../api/teams.js';
import { listGiftcards } from '../api/giftcards.js';
import InputField from './InputField.jsx';
import SelectField from './SelectField.jsx';
import Avatar from './Avatar.jsx';
import Button from './Button.jsx';
import ErrorMessage from './ErrorMessage.jsx';

function CreateTournamentModal({ onClose, onSuccess }) {
  const [name, setName] = useState('');
  const [prizeId, setPrizeId] = useState('');
  const [teamIds, setTeamIds] = useState([]);
  const [teams, setTeams] = useState([]);
  const [giftcards, setGiftcards] = useState([]);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    listTeams(1)
      .then((p) => setTeams(p?.items ?? []))
      .catch(() => {});
    listGiftcards(1)
      .then((p) => setGiftcards(p?.items ?? []))
      .catch(() => {});
  }, []);

  const isPowerOf2 =
    teamIds.length >= 2 && (teamIds.length & (teamIds.length - 1)) === 0;

  const toggle = (id) => {
    setTeamIds((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    );
  };

  const handle = async (e) => {
    e.preventDefault();
    if (!isPowerOf2) {
      setError('Number of teams must be a power of 2 (2, 4, 8, 16, ...)');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await createTournament({
        name,
        prizeId: prizeId || undefined,
        teamIds,
      });
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // only unassigned gift cards make sense as a prize
  const prizes = giftcards.filter((g) => !g.winnerId);

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-end justify-center bg-neutral-950/40 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <form
        onSubmit={handle}
        className="flex max-h-[90vh] w-full max-w-lg animate-scale-in flex-col overflow-hidden rounded-pop border border-neutral-200 bg-white shadow-pop dark:border-neutral-800 dark:bg-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-5">
          <div>
            <h2 className="text-lg font-semibold">Create tournament</h2>
            <p className="mt-0.5 text-sm text-neutral-500">
              A knockout bracket is generated from the teams you pick.
            </p>
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

        <div className="grid gap-4 overflow-y-auto px-6 py-5">
          <InputField
            label="Name"
            icon={Trophy}
            value={name}
            onChange={setName}
            placeholder="e.g. Spring Cup"
            autoFocus
            required
          />

          <SelectField label="Prize (optional)" value={prizeId} onChange={setPrizeId}>
            <option value="">No prize</option>
            {prizes.map((g) => (
              <option key={g._id} value={g._id}>
                {g.provider} — {g.value}
              </option>
            ))}
          </SelectField>

          <div className="text-sm">
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <span className="font-medium text-neutral-700 dark:text-neutral-300">Teams</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium tabular-nums ${
                  isPowerOf2
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400'
                    : teamIds.length === 0
                    ? 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800'
                    : 'bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-400'
                }`}
              >
                {teamIds.length} selected
                {teamIds.length > 0 && (isPowerOf2 ? ' · valid bracket' : ' · needs 2, 4, 8, 16…')}
              </span>
            </div>
            <div className="max-h-56 overflow-y-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
              {teams.length === 0 ? (
                <p className="p-3 text-neutral-500">No teams available.</p>
              ) : (
                <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {teams.map((t) => {
                    const selected = teamIds.includes(t._id);
                    return (
                      <li key={t._id}>
                        <label
                          className={`flex cursor-pointer items-center gap-3 px-3 py-2 transition-colors ${
                            selected
                              ? 'bg-brand-50/60 dark:bg-brand-500/5'
                              : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggle(t._id)}
                            className="peer sr-only"
                          />
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500 ${
                              selected
                                ? 'border-brand-600 bg-brand-600 text-white dark:border-brand-500 dark:bg-brand-500'
                                : 'border-neutral-300 dark:border-neutral-600'
                            }`}
                          >
                            {selected && <Check size={12} strokeWidth={3} aria-hidden />}
                          </span>
                          <Avatar name={t.name} size="xs" square />
                          <span className="flex-1 truncate">{t.name}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <ErrorMessage message={error} />
        </div>

        <div className="flex justify-end gap-2 border-t border-neutral-100 bg-neutral-50/60 px-6 py-4 dark:border-neutral-800 dark:bg-neutral-950/30">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={submitting} disabled={!isPowerOf2}>
            {submitting ? 'Creating…' : 'Create tournament'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateTournamentModal;
