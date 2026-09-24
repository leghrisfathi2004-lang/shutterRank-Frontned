import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { quitTeam } from '../api/players.js';
import Button from './Button.jsx';
import ErrorMessage from './ErrorMessage.jsx';

function QuitTeamConfirm({ onClose, onSuccess }) {
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handle = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await quitTeam();
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
        className="w-full max-w-sm animate-scale-in overflow-hidden rounded-pop border border-neutral-200 bg-white shadow-pop dark:border-neutral-800 dark:bg-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-4 px-6 py-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
            <AlertTriangle size={18} aria-hidden />
          </span>
          <div className="space-y-1">
            <h2 className="text-base font-semibold">Quit team?</h2>
            <p className="text-sm text-neutral-500">
              You'll leave your current team. This action can't be undone.
            </p>
          </div>
        </div>
        {error && (
          <div className="px-6 pb-4">
            <ErrorMessage message={error} />
          </div>
        )}
        <div className="flex justify-end gap-2 border-t border-neutral-100 bg-neutral-50/60 px-6 py-4 dark:border-neutral-800 dark:bg-neutral-950/30">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handle} loading={submitting}>
            {submitting ? 'Quitting…' : 'Quit team'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QuitTeamConfirm;
