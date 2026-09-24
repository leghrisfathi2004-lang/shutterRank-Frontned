import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.jsx';
import Loader from './Loader.jsx';

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default RequireAuth;
