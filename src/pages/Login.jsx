import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Trophy } from 'lucide-react';
import { useAuth } from '../Context/AuthContext.jsx';
import { login } from '../api/auth.js';
import InputField from '../components/InputField.jsx';
import Button from '../components/Button.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

function Login() {
  const { refreshUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login({ email, password }); // saves the token
      await refreshUser(); // loads the user into the context
      navigate('/me');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm py-10">
      <div className="mb-6 flex flex-col items-center text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white dark:bg-brand-500">
          <Trophy size={20} />
        </span>
        <h1 className="mt-4 text-2xl font-semibold">Welcome back</h1>
        <p className="mt-1 text-sm text-neutral-500">Sign in to continue to ShutterRank.</p>
      </div>

      <form
        onSubmit={handle}
        className="grid gap-4 rounded-card border border-neutral-200 bg-white p-6 shadow-card dark:border-neutral-800 dark:bg-neutral-900"
      >
        <InputField label="Email" type="email" icon={Mail} value={email} onChange={setEmail} placeholder="you@example.com" required />
        <InputField label="Password" type="password" icon={Lock} value={password} onChange={setPassword} required />
        <ErrorMessage message={error} />
        <Button type="submit" size="lg" loading={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-500">
        New to ShutterRank?{' '}
        <Link to="/register" className="font-medium text-neutral-900 hover:underline dark:text-neutral-100">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default Login;
