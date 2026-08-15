import { Link, useLocation } from 'react-router-dom';
import { HiOutlineSparkles, HiOutlineChatBubbleOvalLeftEllipsis, HiOutlineUser, HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';
import { motion } from 'motion/react';
import { useAuthStore } from '../../store/useAuthStore';
import ThemeToggle from '../common/ThemeToggle';
import Avatar from '../common/Avatar';

export default function Navbar() {
  const { authUser, logout } = useAuthStore();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: HiOutlineChatBubbleOvalLeftEllipsis, label: 'Chat' },
    { path: '/profile', icon: HiOutlineUser, label: 'Profile' },
  ];

  return (
    <nav className="w-full md:w-20 lg:w-24 h-16 md:h-full flex flex-row md:flex-col items-center justify-between md:justify-start px-6 md:px-0 py-0 md:py-6 border-t md:border-t-0 md:border-r border-pearl-200 dark:border-midnight-800/50 bg-white/60 dark:bg-midnight-900/60 md:bg-white/40 md:dark:bg-midnight-900/40 z-20 order-last md:order-first backdrop-blur-md">
      {/* Logo - Hidden on mobile, visible on desktop */}
      <Link to="/" className="hidden md:block mb-10 group relative">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-azure-500/25 overflow-hidden bg-white/5"
        >
          <img src="/logo.png" alt="LinkUp Logo" className="w-full h-full object-cover" />
        </motion.div>
      </Link>

      {/* Primary Navigation */}
      {authUser && (
        <div className="flex-1 md:flex-none flex flex-row md:flex-col justify-around md:justify-start items-center gap-2 md:gap-4 w-full md:px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path} className="relative group flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-azure-500 text-white shadow-md shadow-azure-500/20'
                      : 'text-midnight-500 dark:text-midnight-400 hover:bg-pearl-200 dark:hover:bg-midnight-800'
                  }`}
                >
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? '' : 'group-hover:text-azure-600 dark:group-hover:text-azure-400'}`} />
                </motion.div>
                {/* Tooltip */}
                <div className="hidden md:block absolute left-full ml-4 px-2 py-1 bg-midnight-800 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Bottom Actions */}
      <div className="flex flex-row md:flex-col items-center gap-2 md:gap-4 md:mt-auto">
        <ThemeToggle />
        
        {authUser && (
          <>
            <div className="hidden md:block w-10 h-px bg-pearl-200 dark:bg-midnight-800/80 my-2"></div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="flex w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl items-center justify-center text-midnight-500 dark:text-midnight-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-500/10 dark:hover:text-rose-400 transition-all duration-300 relative group"
            >
              <HiOutlineArrowRightOnRectangle className="w-5 h-5 md:w-6 md:h-6" />
              <div className="hidden md:block absolute left-full ml-4 px-2 py-1 bg-midnight-800 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                Logout
              </div>
            </motion.button>
            <Link to="/profile" className="hidden md:block mt-2 transition-transform hover:scale-105">
              <Avatar src={authUser.profilePic} name={authUser.fullName} size="sm" />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
