import { useEffect, useState } from 'react';
import { HiOutlineChatBubbleLeftRight, HiOutlineUsers } from 'react-icons/hi2';
import { motion } from 'motion/react';
import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/useAuthStore';
import { axiosInstance } from '../../lib/axios';
import SearchBar from './SearchBar';
import SidebarUser from './SidebarUser';
import SidebarSkeleton from './SidebarSkeleton';
import Avatar from '../common/Avatar';

export default function Sidebar() {
  const { conversations, getConversations, selectedUser, setSelectedUser, isConversationsLoading } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getConversations();
    fetchAllUsers();
  }, [getConversations]);

  const fetchAllUsers = async () => {
    try {
      setIsLoadingUsers(true);
      const res = await axiosInstance.get('/users');
      setAllUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const conversationUserIds = new Set(
    conversations.flatMap(c => c.participants?.map(p => p._id) || [])
  );

  const newUsers = allUsers.filter(u => {
    if (u._id === authUser?._id) return false;
    return !conversationUserIds.has(u._id);
  });

  const filteredConversations = conversations.filter(conv => {
    const otherUser = conv.participants?.find(p => p._id !== authUser?._id);
    if (!otherUser) return false;
    return otherUser.fullName?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredNewUsers = newUsers.filter(u =>
    u.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFilteredList = (list, isConversation = false) => {
    if (!showOnlineOnly) return list;
    if (isConversation) {
      return list.filter(conv => {
        const otherUser = conv.participants?.find(p => p._id !== authUser?._id);
        return onlineUsers.includes(otherUser?._id);
      });
    }
    return list.filter(u => onlineUsers.includes(u._id));
  };

  const displayConversations = getFilteredList(filteredConversations, true);
  const displayNewUsers = getFilteredList(filteredNewUsers);
  const onlineCount = onlineUsers.filter(id => id !== authUser?._id).length;

  return (
    <div className="w-full h-full flex flex-col bg-transparent">
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-xl text-midnight-900 dark:text-pearl-50 tracking-tight">Messages</h2>
          </div>
          <div className="flex items-center gap-1.5 bg-pearl-200/50 dark:bg-midnight-800/50 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-midnight-600 dark:text-pearl-400">{onlineCount}</span>
          </div>
        </div>
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
        />
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowOnlineOnly(!showOnlineOnly)}
          className={`mt-3 w-full flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 ${
            showOnlineOnly
              ? 'bg-azure-500/10 text-azure-600 dark:text-azure-400 border border-azure-500/20'
              : 'bg-pearl-200/50 dark:bg-midnight-800/50 text-midnight-500 dark:text-midnight-400 hover:bg-pearl-200 dark:hover:bg-midnight-800 border border-transparent'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${showOnlineOnly ? 'bg-azure-500' : 'bg-emerald-500'}`}></span>
          {showOnlineOnly ? 'Showing Online Only' : 'Show Online Only'}
        </motion.button>
      </div>

      {/* User Lists */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {(isConversationsLoading || isLoadingUsers) ? (
          <SidebarSkeleton />
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05, delayChildren: 0.1 }
              }
            }}
            className="space-y-1"
          >
            {displayConversations.length > 0 && (
              <div className="mb-4">
                {displayConversations.map(conv => {
                  const otherUser = conv.participants?.find(p => p._id !== authUser?._id);
                  if (!otherUser) return null;
                  return (
                    <SidebarUser
                      key={conv._id}
                      conversation={conv}
                      isSelected={selectedUser?._id === otherUser?._id}
                      onSelect={setSelectedUser}
                      currentUserId={authUser?._id}
                    />
                  );
                })}
              </div>
            )}

            {displayNewUsers.length > 0 && (
              <div>
                <div className="px-3 py-2 flex items-center gap-2 mt-2 mb-1">
                  <span className="text-[10px] font-bold text-midnight-400 dark:text-midnight-500 uppercase tracking-widest">Discover</span>
                </div>
                {displayNewUsers.map(user => (
                  <motion.button
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-pearl-200/50 dark:hover:bg-midnight-800/50 ${
                      selectedUser?._id === user._id ? 'bg-pearl-200 dark:bg-midnight-800' : ''
                    }`}
                  >
                    <Avatar src={user.profilePic} name={user.fullName} size="md" showStatus isOnline={onlineUsers.includes(user._id)} />
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-semibold text-sm text-midnight-900 dark:text-pearl-50 truncate">{user.fullName}</p>
                      <p className="text-xs text-midnight-500 dark:text-pearl-500 truncate mt-0.5">{user.bio || "Hey there! I'm using LinkUp."}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {displayConversations.length === 0 && displayNewUsers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="w-14 h-14 bg-pearl-200/50 dark:bg-midnight-800/50 rounded-2xl flex items-center justify-center mb-3">
                  <HiOutlineUsers className="w-6 h-6 text-midnight-400 dark:text-midnight-500" />
                </div>
                <p className="text-sm text-midnight-600 dark:text-pearl-400 font-semibold">No users found</p>
                <p className="text-xs text-midnight-400 dark:text-midnight-500 mt-1">Try a different search</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
