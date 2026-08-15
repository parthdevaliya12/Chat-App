export default function UnreadBadge({ count = 0 }) {
  if (!count || count <= 0) return null;

  return (
    <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-bold text-white bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full shadow-sm shadow-violet-500/25 animate-pulse-badge flex-shrink-0">
      {count > 99 ? '99+' : count}
    </span>
  );
}
