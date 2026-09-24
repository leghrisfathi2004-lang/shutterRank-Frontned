import { Loader2 } from 'lucide-react';

function Loader() {
  return (
    <p className="flex items-center justify-center gap-2 py-16 text-sm text-neutral-500">
      <Loader2 size={16} className="animate-spin" />
      Loading…
    </p>
  );
}

export default Loader;
