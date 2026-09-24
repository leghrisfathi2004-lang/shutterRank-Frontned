import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Gift, Send } from 'lucide-react';
import { getGiftcard } from '../api/giftcards.js';
import useFetch from '../hooks/useFetch.js';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import BackLink from '../components/BackLink.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import StatusPill from '../components/StatusPill.jsx';
import AssignGiftcardModal from '../components/AssignGiftcardModal.jsx';

// admin-only page (guarded by RequireAdmin in App.jsx)
function GiftcardDetail() {
  const { id } = useParams();
  const [assigning, setAssigning] = useState(false);
  const { data: g, error, loading, refetch } = useFetch(() => getGiftcard(id), [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <BackLink to="/giftcards" label="All gift cards" />

      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-400">
          <Gift size={26} />
        </span>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">{g.provider}</h1>
          <StatusPill status={g.status} />
        </div>
      </div>

      <Card className="max-w-md">
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-neutral-500">Value</p>
            <p className="text-2xl font-semibold">{g.value}</p>
          </div>
          <div>
            <p className="text-neutral-500">Code</p>
            <p className="mt-1 rounded-lg bg-neutral-100 px-3 py-2 font-mono dark:bg-neutral-800">{g.code}</p>
          </div>
        </div>

        {!g.winnerId && (
          <Button icon={Send} className="mt-6 w-full" onClick={() => setAssigning(true)}>
            Assign to winner
          </Button>
        )}
      </Card>

      {assigning && (
        <AssignGiftcardModal giftcardId={id} onClose={() => setAssigning(false)} onSuccess={refetch} />
      )}
    </div>
  );
}

export default GiftcardDetail;
