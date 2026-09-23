function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-800">
      {tabs.map((t) => (
        <button
          key={t.value}
          type="button"
          onClick={() => onChange(t.value)}
          className={`px-4 py-2 text-sm border-b-2 -mb-px transition ${
            active === t.value
              ? 'border-brand-500 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
