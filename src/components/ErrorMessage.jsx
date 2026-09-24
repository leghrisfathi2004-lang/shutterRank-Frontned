import { AlertCircle, RotateCw } from 'lucide-react';
import Button from './Button.jsx';

// small red box; when onRetry is given (pages), it also shows a "Try again" button
function ErrorMessage({ message, onRetry }) {
  if (!message) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-400">
      <AlertCircle size={16} />
      <span className="flex-1">{message}</span>
      {onRetry && (
        <Button variant="secondary" size="sm" icon={RotateCw} onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}

export default ErrorMessage;
