// a circle (or square for teams) with the name's initials.
// the color is picked from the name, so the same name always gets the same color.
const COLORS = [
  'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
  'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
  'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
  'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300',
];

const SIZES = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-20 w-20 text-2xl',
};

function Avatar({ name = '', size = 'sm', square = false }) {
  // "Night Owls" → "NO", "Sam" → "SA"
  const words = name.trim().split(' ').filter(Boolean);
  const initials =
    words.length > 1 ? words[0][0] + words[words.length - 1][0] : name.slice(0, 2);

  // sum of the letter codes → always the same color for the same name
  let sum = 0;
  for (const char of name) sum += char.charCodeAt(0);
  const color = COLORS[sum % COLORS.length];

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center font-semibold uppercase ${color} ${SIZES[size]} ${
        square ? 'rounded-lg' : 'rounded-full'
      }`}
    >
      {initials || '?'}
    </span>
  );
}

export default Avatar;
