export default function LoadingSpinner({ size = 'lg' }) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizeClasses[size]} border-violet-500 border-t-transparent rounded-full animate-spin`} />
      {size === 'lg' && (
        <span className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">Loading...</span>
      )}
    </div>
  );
}
