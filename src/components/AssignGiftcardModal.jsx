import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { assignGiftcard } from '../api/giftcards.js';
import { listTeams } from '../api/teams.js';
import SelectField from './SelectField.jsx';
import Button from './Button.jsx';
import ErrorMessage from './ErrorMessage.jsx';

function AssignGiftcardModal({ giftcardId, onClose, onSuccess }) {
  const [teams, setTeams] = useState([]);
  const [winnerId, setWinnerId] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    listTeams(1)
      .then((p) => setTeams(p?.items ?? []))
      .catch(() => {});
  }, []);

  const handle = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await assignGiftcard(giftcardId, winnerId);
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
      <form
        onSubmit={handle}
        className="w-full max-w-md animate-scale-in overflow-hidden rounded-pop border border-neutral-200 bg-white shadow-pop dark:border-neutral-800 dark:bg-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-5">
          <div>
            <h2 className="text-lg font-semibold">Assign to winner</h2>
            <p className="mt-0.5 text-sm text-neutral-500">The team will receive this gift card.</p>
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
          <SelectField label="Winning team" value={winnerId} onChange={setWinnerId} required>
            <option value="">Pick a team…</option>
            {teams.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </SelectField>
          <ErrorMessage message={error} />
        </div>

        <div className="flex justify-end gap-2 border-t border-neutral-100 bg-neutral-50/60 px-6 py-4 dark:border-neutral-800 dark:bg-neutral-950/30">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={submitting}>
            {submitting ? 'Assigning…' : 'Assign'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AssignGiftcardModal;
