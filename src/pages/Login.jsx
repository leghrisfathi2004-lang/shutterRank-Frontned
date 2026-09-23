import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.jsx';
import LoginForm from '../components/LoginForm.jsx';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handle = async (values) => {
    await login(values);
    navigate('/');
  };

  return (
    <div className="max-w-sm space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <LoginForm onSubmit={handle} />
      <p className="text-sm text-neutral-500">
        No account?{' '}
        <Link to="/register" className="text-brand-600 dark:text-brand-400 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
