import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../Context/AuthContext.jsx';
import { joinTeam } from '../api/players.js';
import Button from './Button.jsx';
import ErrorMessage from './ErrorMessage.jsx';

function JoinTeamButton({ teamId, teamStatus, onSuccess, size = 'md' }) {
  const { user, refreshUser } = useAuth();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // show only when: signed in, no team, and this team is open
  if (!user || user.teamId || teamStatus !== 'open') return null;

  const handle = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await joinTeam(teamId);
      await refreshUser();
      onSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button onClick={handle} loading={submitting} icon={UserPlus} size={size}>
        {submitting ? 'Joining…' : 'Join team'}
      </Button>
      <ErrorMessage message={error} />
    </div>
  );
}

export default JoinTeamButton;
