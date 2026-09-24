// icon = optional lucide icon shown inside the input, on the left
// ...rest = any extra <input> attribute (placeholder, autoFocus, min…)
function InputField({ label, type = 'text', value, onChange, required = false, icon: Icon, ...rest }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-neutral-700 dark:text-neutral-300">{label}</span>
      <div className="relative">
        {Icon && <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 dark:border-neutral-800 dark:bg-neutral-900 ${
            Icon ? 'pl-9' : ''
          }`}
          {...rest}
        />
      </div>
    </label>
  );
}

export default InputField;
