function Button({
  variant = 'solid',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    solid: 'bg-brand-500 text-white hover:bg-brand-600',
    ghost:
      'bg-transparent text-brand-600 hover:bg-brand-500/10 dark:text-brand-400 dark:hover:bg-brand-500/20',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  return (
    <button
      disabled={disabled || loading}
      className={`${base} ${variants[variant] || variants.solid} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
