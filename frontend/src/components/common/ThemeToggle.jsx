import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';
import { motion } from 'motion/react';
import { useThemeStore } from '../../store/useThemeStore';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-midnight-500 dark:text-midnight-400 hover:bg-pearl-200 dark:hover:bg-midnight-800 transition-all duration-300 relative group"
      aria-label="Toggle theme"
      type="button"
    >
      <motion.div
        key={isDark ? 'sun' : 'moon'}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {isDark ? (
          <HiOutlineSun className="w-6 h-6 text-amber-400" />
        ) : (
          <HiOutlineMoon className="w-6 h-6 group-hover:text-azure-600 transition-colors" />
        )}
      </motion.div>
      <div className="hidden md:block absolute left-full ml-4 px-2 py-1 bg-midnight-800 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
        Toggle Theme
      </div>
    </motion.button>
  );
}
