// tabs = [{ value, label }], active = current value, onChange(value)
function Tabs({ tabs, active, onChange }) {
  return (
    <div className="inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-900">
      {tabs.map((t) => (
        <button
          key={t.value}
          type="button"
          onClick={() => onChange(t.value)}
          className={`h-8 rounded-md px-3 text-sm font-medium transition-colors ${
            active === t.value
              ? 'bg-white text-neutral-900 shadow-card dark:bg-neutral-800 dark:text-neutral-100'
              : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
