import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function BackLink({ to, label = 'Back' }) {
  return (
    <Link to={to} className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
      <ArrowLeft size={16} />
      {label}
    </Link>
  );
}

export default BackLink;
