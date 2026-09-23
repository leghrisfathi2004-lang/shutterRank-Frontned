import { Link } from 'react-router-dom';

function BackLink({ to }) {
  return (
    <Link
      to={to}
      className="text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
    >
      ← back
    </Link>
  );
}

export default BackLink;
