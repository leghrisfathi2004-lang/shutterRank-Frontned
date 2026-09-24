import { Loader2 } from 'lucide-react';

const VARIANTS = {
  solid: 'bg-brand-600 text-white shadow-card hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600',
  secondary:
    'border border-neutral-200 bg-white shadow-card hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800',
  danger: 'bg-red-600 text-white shadow-card hover:bg-red-700',
  'danger-ghost': 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10',
};

const SIZES = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 text-sm',
  lg: 'h-10 px-5 text-sm',
};

// icon = a lucide icon component, shown before the text (replaced by a spinner while loading)
function Button({ variant = 'solid', size = 'md', icon: Icon, loading = false, disabled, children, className = '', ...props }) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

export default Button;
