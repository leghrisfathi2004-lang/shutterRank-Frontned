import { useState } from 'react';
import InputField from './InputField.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import Button from './Button.jsx';

function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({ email, password });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handle} className="grid gap-3">
      <InputField label="Email" type="email" value={email} onChange={setEmail} required />
      <InputField label="Password" type="password" value={password} onChange={setPassword} required />
      <ErrorMessage message={error} />
      <Button type="submit" loading={submitting}>
        {submitting ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  );
}

export default LoginForm;
