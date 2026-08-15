import { motion } from 'motion/react';

export default function TypingIndicator({ userName }) {
  return (
    <div className="flex items-start gap-2 animate-slide-up">
      <div className="flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-forest-800/50 border border-forest-500/[0.06] dark:border-forest-400/[0.06] rounded-2xl rounded-bl-sm shadow-sm">
        {userName && <span className="text-[11px] text-forest-500/50 dark:text-forest-300/40 font-medium">{userName}</span>}
        <div className="flex gap-1">
          {[0, 0.15, 0.3].map((delay, i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 bg-forest-500/40 dark:bg-forest-400/30 rounded-full"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
