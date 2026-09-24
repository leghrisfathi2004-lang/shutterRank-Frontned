import { useState } from 'react';
import { Coins, Gift, KeyRound, X } from 'lucide-react';
import { createGiftcard } from '../api/giftcards.js';
import InputField from './InputField.jsx';
import Button from './Button.jsx';
import ErrorMessage from './ErrorMessage.jsx';

function CreateGiftcardModal({ onClose, onSuccess }) {
  const [code, setCode] = useState('');
  const [provider, setProvider] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await createGiftcard({ code, provider, value: Number(value) });
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
            <h2 className="text-lg font-semibold">Add gift card</h2>
            <p className="mt-0.5 text-sm text-neutral-500">It can then be used as a tournament prize.</p>
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
          <InputField
            label="Provider"
            icon={Gift}
            value={provider}
            onChange={setProvider}
            placeholder="e.g. Steam, Amazon"
            autoFocus
            required
          />
          <InputField
            label="Value"
            type="number"
            icon={Coins}
            value={value}
            onChange={setValue}
            placeholder="50"
            min="0"
            required
          />
          <InputField
            label="Code"
            icon={KeyRound}
            value={code}
            onChange={setCode}
            placeholder="XXXX-XXXX-XXXX"
            required
          />
          <ErrorMessage message={error} />
        </div>

        <div className="flex justify-end gap-2 border-t border-neutral-100 bg-neutral-50/60 px-6 py-4 dark:border-neutral-800 dark:bg-neutral-950/30">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={submitting}>
            {submitting ? 'Adding…' : 'Add gift card'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateGiftcardModal;
