export default function SidebarSkeleton() {
  return (
    <div className="space-y-0.5 p-2">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
          <div className="w-11 h-11 bg-forest-500/[0.06] dark:bg-forest-400/[0.06] rounded-full animate-pulse flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-forest-500/[0.06] dark:bg-forest-400/[0.05] rounded w-3/4 animate-pulse" />
            <div className="h-2.5 bg-forest-500/[0.04] dark:bg-forest-400/[0.03] rounded w-1/2 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
