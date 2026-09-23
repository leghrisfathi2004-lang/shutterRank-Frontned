import { useParams, Link } from 'react-router-dom';
import { getTeamProfile } from '../api/teams.js';
import useFetch from '../hooks/useFetch.js';
import Loader from '../components/Loader.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import BackLink from '../components/BackLink.jsx';
import StatusPill from '../components/StatusPill.jsx';
import TeamMembers from '../components/TeamMembers.jsx';

function TeamDetail() {
  const { id } = useParams();
  const { data: team, error, loading } = useFetch(() => getTeamProfile(id), [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6">
      <BackLink to="/teams" />

      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">{team.name}</h1>
        <StatusPill status={team.status} />
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-2">Leader</h2>
        {team.leader ? (
          <Link
            to={`/players/${team.leader._id}`}
            className="text-brand-600 dark:text-brand-400 hover:underline"
          >
            {team.leader.name}
          </Link>
        ) : (
          <p className="text-neutral-500">No leader.</p>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">
          Members ({team.members?.length ?? 0})
        </h2>
        <TeamMembers players={team.members} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">
          Trophies ({team.trophies?.length ?? 0})
        </h2>
        {team.trophies?.length ? (
          <ul className="space-y-1 list-disc pl-6">
            {team.trophies.map((t, i) => (
              <li key={t._id ?? i}>{t.name ?? '—'}</li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-500">No trophies yet.</p>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">
          Gift cards ({team.giftcards?.length ?? 0})
        </h2>
        {team.giftcards?.length ? (
          <ul className="space-y-1">
            {team.giftcards.map((g) => (
              <li key={g._id} className="flex items-center justify-between">
                <span>{g.provider}</span>
                <span className="text-sm text-neutral-500">{g.value}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-500">No gift cards.</p>
        )}
      </section>
    </div>
  );
}

export default TeamDetail;
