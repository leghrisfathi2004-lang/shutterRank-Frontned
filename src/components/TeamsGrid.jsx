import TeamCard from './TeamCard.jsx';

function TeamsGrid({ teams }) {
  if (teams.length === 0) {
    return <p className="text-neutral-500">No teams.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {teams.map((t) => (
        <TeamCard key={t._id} team={t} />
      ))}
    </div>
  );
}

export default TeamsGrid;
