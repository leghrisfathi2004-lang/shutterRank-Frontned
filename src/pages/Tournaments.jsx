import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../Context/AuthContext.jsx';
import { listTournaments } from '../api/tournaments.js';
import useFetch from '../hooks/useFetch.js';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import TournamentsGrid from '../components/TournamentsGrid.jsx';
import Button from '../components/Button.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Pagination from '../components/Pagination.jsx';
import CreateTournamentModal from '../components/CreateTournamentModal.jsx';

function Tournaments() {
  const { user } = useAuth();
  const [creating, setCreating] = useState(false);
  const [page, setPage] = useState(1);
  const { data, error, loading, refetch } = useFetch(() => listTournaments(page), [page]);

  return (
    <div>
      <PageHeader
        title="Tournaments"
        subtitle="Knockout competitions and their prizes."
        action={
          user?.role === 'admin' && (
            <Button icon={Plus} onClick={() => setCreating(true)}>
              Add tournament
            </Button>
          )
        }
      />

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : (
        <>
          <TournamentsGrid tournaments={data.items} />
          <Pagination page={data.page} pages={data.pages} onChange={setPage} />
        </>
      )}

      {creating && <CreateTournamentModal onClose={() => setCreating(false)} onSuccess={refetch} />}
    </div>
  );
}

export default Tournaments;
