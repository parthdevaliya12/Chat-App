import { motion } from 'motion/react';

export default function LoadingSpinner({ size = 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        className={`${sizeClasses[size]} bg-amber-500`}
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
          borderRadius: ["20%", "50%", "20%"]
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      {size === 'lg' && (
        <span className="text-sm font-bold text-amber-500 tracking-widest uppercase animate-pulse">
          LinkUp
        </span>
      )}
    </div>
  );
}
