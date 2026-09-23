import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.jsx';
import RegisterForm from '../components/RegisterForm.jsx';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handle = async (values) => {
    await register(values);
    navigate('/');
  };

  return (
    <div className="max-w-sm space-y-4">
      <h1 className="text-2xl font-bold">Create account</h1>
      <RegisterForm onSubmit={handle} />
      <p className="text-sm text-neutral-500">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-600 dark:text-brand-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
