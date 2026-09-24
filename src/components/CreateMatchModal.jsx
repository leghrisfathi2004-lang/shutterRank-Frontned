import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { createMatch } from '../api/matches.js';
import { listTeams } from '../api/teams.js';
import SelectField from './SelectField.jsx';
import Button from './Button.jsx';
import ErrorMessage from './ErrorMessage.jsx';

function CreateMatchModal({ onClose, onSuccess }) {
  const [teamId1, setTeamId1] = useState('');
  const [teamId2, setTeamId2] = useState('');
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    listTeams(1)
      .then((p) => setTeams(p?.items ?? []))
      .catch(() => {});
  }, []);

  const handle = async (e) => {
    e.preventDefault();
    if (teamId1 === teamId2) {
      setError('Teams must be different.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await createMatch({ teamId1, teamId2 });
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // a team can't be picked on both sides
  const options = (exclude) => (
    <>
      <option value="">Pick a team…</option>
      {teams.map((t) => (
        <option key={t._id} value={t._id} disabled={t._id === exclude}>
          {t.name}
        </option>
      ))}
    </>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-end justify-center bg-neutral-950/40 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <form
        onSubmit={handle}
        className="w-full max-w-md animate-scale-in overflow-hidden rounded-pop border border-neutral-200 bg-white shadow-pop dark:border-neutral-800 dark:bg-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-5">
          <div>
            <h2 className="text-lg font-semibold">Create match</h2>
            <p className="mt-0.5 text-sm text-neutral-500">Pick the two teams that will face off.</p>
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

        <div className="grid gap-3 px-6 py-5">
          <SelectField label="Home team" value={teamId1} onChange={setTeamId1} required>
            {options(teamId2)}
          </SelectField>

          <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
            <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
            vs
            <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
          </div>

          <SelectField label="Away team" value={teamId2} onChange={setTeamId2} required>
            {options(teamId1)}
          </SelectField>

          <ErrorMessage message={error} />
        </div>

        <div className="flex justify-end gap-2 border-t border-neutral-100 bg-neutral-50/60 px-6 py-4 dark:border-neutral-800 dark:bg-neutral-950/30">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={submitting}>
            {submitting ? 'Creating…' : 'Create match'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateMatchModal;
