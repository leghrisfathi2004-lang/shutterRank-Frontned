import { listMatches } from '../api/matches.js';
import useFetch from '../hooks/useFetch.js';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import MatchesTable from '../components/MatchesTable.jsx';

function Matches() {
  const { data: page, error, loading } = useFetch(() => listMatches(1), []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Matches</h1>
      <p className="text-sm text-neutral-500">
        Page {page.page} / {page.pages} — {page.total} total
      </p>
      <MatchesTable matches={page.items} />
    </div>
  );
}

export default Matches;
