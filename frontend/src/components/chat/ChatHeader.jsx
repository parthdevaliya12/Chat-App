import { HiOutlineChevronLeft, HiOutlineInformationCircle, HiOutlineXMark } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/useAuthStore';
import Avatar from '../common/Avatar';

export default function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser?._id);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
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
        <button 
          onClick={() => setShowInfo(true)}
          className="p-2.5 rounded-xl text-midnight-400 dark:text-midnight-500 hover:bg-pearl-200 dark:hover:bg-midnight-800 hover:text-azure-500 transition-all"
          title="User Info"
        >
          <HiOutlineInformationCircle className="w-5 h-5" />
        </button>
      </div>
    </motion.div>

    <AnimatePresence>
      {showInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-midnight-950/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-midnight-900 rounded-3xl p-6 w-full max-w-sm shadow-2xl relative border border-pearl-200 dark:border-midnight-700/50"
          >
            <button 
              onClick={() => setShowInfo(false)}
              className="absolute top-4 right-4 p-2 text-midnight-400 hover:text-rose-500 transition-colors bg-pearl-100 dark:bg-midnight-800 rounded-full"
            >
              <HiOutlineXMark className="w-5 h-5" />
            </button>
            
            <div className="flex flex-col items-center text-center mt-4">
              <div className="relative mb-4">
                <Avatar src={selectedUser?.profilePic} name={selectedUser?.fullName} size="xl" showStatus={false} />
                {isOnline && (
                  <span className="absolute bottom-1 right-2 w-4 h-4 bg-emerald-500 border-4 border-white dark:border-midnight-900 rounded-full"></span>
                )}
              </div>
              <h2 className="text-xl font-bold text-midnight-900 dark:text-pearl-50">{selectedUser?.fullName}</h2>
              <p className="text-sm text-midnight-500 dark:text-midnight-400 mt-1">{selectedUser?.email}</p>
              
              <div className="w-full mt-6 p-4 bg-pearl-50 dark:bg-midnight-950/50 rounded-2xl text-left border border-pearl-200 dark:border-midnight-800">
                <p className="text-[10px] font-bold uppercase tracking-wider text-midnight-400 dark:text-midnight-500 mb-2">About</p>
                <p className="text-sm text-midnight-700 dark:text-pearl-300">
                  {selectedUser?.bio || "Hey there! I'm using LinkUp."}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}
