import { useState } from 'react';
import { Plus } from 'lucide-react';
import { listGiftcards } from '../api/giftcards.js';
import useFetch from '../hooks/useFetch.js';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import GiftcardsTable from '../components/GiftcardsTable.jsx';
import Button from '../components/Button.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Pagination from '../components/Pagination.jsx';
import CreateGiftcardModal from '../components/CreateGiftcardModal.jsx';
import AssignGiftcardModal from '../components/AssignGiftcardModal.jsx';

// admin-only page (guarded by RequireAdmin in App.jsx)
function Giftcards() {
  const [creating, setCreating] = useState(false);
  const [assigningId, setAssigningId] = useState(null); // id of the gift card being assigned
  const [page, setPage] = useState(1);
  const { data, error, loading, refetch } = useFetch(() => listGiftcards(page), [page]);

  return (
    <div>
      <PageHeader
        title="Gift cards"
        subtitle="Prizes available for tournaments."
        action={
          <Button icon={Plus} onClick={() => setCreating(true)}>
            Add gift card
          </Button>
        }
      />

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : (
        <>
          <GiftcardsTable giftcards={data.items} onAssign={setAssigningId} />
          <Pagination page={data.page} pages={data.pages} onChange={setPage} />
        </>
      )}

      {creating && <CreateGiftcardModal onClose={() => setCreating(false)} onSuccess={refetch} />}
      {assigningId && (
        <AssignGiftcardModal giftcardId={assigningId} onClose={() => setAssigningId(null)} onSuccess={refetch} />
      )}
    </div>
  );
}

export default Giftcards;
