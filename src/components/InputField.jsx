function InputField({ label, type = 'text', value, onChange, required = false }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40"
      />
    </label>
  );
}

export default InputField;
