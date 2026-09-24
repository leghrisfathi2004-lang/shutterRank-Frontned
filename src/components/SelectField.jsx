// same look as InputField, but for a <select>; pass the <option>s as children
function SelectField({ label, value, onChange, required = false, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-neutral-700 dark:text-neutral-300">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 dark:border-neutral-800 dark:bg-neutral-900"
      >
        {children}
      </select>
    </label>
  );
}

export default SelectField;
