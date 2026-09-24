import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.jsx';
import Loader from './Loader.jsx';

function RequireAdmin({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (!user || user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}

export default RequireAdmin;
