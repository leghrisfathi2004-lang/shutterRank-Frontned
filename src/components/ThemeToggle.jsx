import { useEffect, useState } from 'react';

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
    } catch {}
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle theme"
      className="rounded-md border border-neutral-200 dark:border-neutral-800 px-3 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
    >
      {dark ? 'Light' : 'Dark'}
    </button>
  );
}

export default ThemeToggle;
