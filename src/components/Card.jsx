// title + icon are optional: when given, they make a small header at the top of the card
function Card({ title, icon: Icon, children, className = '' }) {
  return (
    <div
      className={`rounded-card border border-neutral-200 bg-white p-5 shadow-card dark:border-neutral-800 dark:bg-neutral-900 ${className}`}
    >
      {title && (
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold">
          {Icon && <Icon size={16} className="text-neutral-400" />}
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}

export default Card;
