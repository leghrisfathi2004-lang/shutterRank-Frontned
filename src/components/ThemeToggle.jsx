import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

function ThemeToggle() {
  const [dark, setDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
    try {
      localStorage.setItem('sr_theme', dark ? 'dark' : 'light');
    } catch {
      // storage unavailable (private mode) — theme still applies for this session
    }
  }, [dark]);

  const Icon = dark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Light theme' : 'Dark theme'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
    >
      <Icon size={18} aria-hidden />
    </button>
  );
}

export default ThemeToggle;
