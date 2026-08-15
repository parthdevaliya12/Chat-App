import { HiOutlineChevronLeft, HiOutlineVideoCamera, HiOutlinePhone } from 'react-icons/hi2';
import { motion } from 'motion/react';
import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/useAuthStore';
import Avatar from '../common/Avatar';

export default function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser?._id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="px-6 py-4 border-b border-pearl-200 dark:border-midnight-800/50 flex items-center justify-between bg-white/60 dark:bg-midnight-900/60 backdrop-blur-md z-10"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSelectedUser(null)}
          className="md:hidden p-2 -ml-2 rounded-xl hover:bg-pearl-200 dark:hover:bg-midnight-800 transition-colors"
        >
          <HiOutlineChevronLeft className="w-5 h-5 text-midnight-600 dark:text-pearl-300" />
        </button>
        
        <div className="relative">
          <Avatar src={selectedUser?.profilePic} name={selectedUser?.fullName} size="md" showStatus={false} />
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-midnight-900 rounded-full"></span>
          )}
        </div>
        
        <div>
          <h3 className="font-bold text-base text-midnight-900 dark:text-pearl-50 tracking-tight">{selectedUser?.fullName}</h3>
          <p className={`text-xs font-medium ${isOnline ? 'text-emerald-500' : 'text-midnight-400 dark:text-midnight-500'}`}>
            {isOnline ? 'Online now' : 'Offline'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="p-2.5 rounded-xl text-midnight-400 dark:text-midnight-500 hover:bg-pearl-200 dark:hover:bg-midnight-800 hover:text-azure-500 transition-all">
          <HiOutlinePhone className="w-5 h-5" />
        </button>
        <button className="p-2.5 rounded-xl text-midnight-400 dark:text-midnight-500 hover:bg-pearl-200 dark:hover:bg-midnight-800 hover:text-azure-500 transition-all">
          <HiOutlineVideoCamera className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
