import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button.jsx';

// hidden when everything fits on one page
function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;

  return (
    <div className="mt-4 flex items-center justify-between text-sm text-neutral-500">
      <span>
        Page {page} of {pages}
      </span>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" icon={ChevronLeft} disabled={page <= 1} onClick={() => onChange(page - 1)}>
          Prev
        </Button>
        <Button variant="secondary" size="sm" disabled={page >= pages} onClick={() => onChange(page + 1)}>
          Next
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
