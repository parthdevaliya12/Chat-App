import { motion } from 'motion/react';
import Avatar from '../common/Avatar';
import UnreadBadge from '../common/UnreadBadge';
import { formatMessageTime, truncateText } from '../../lib/utils';
import { useAuthStore } from '../../store/useAuthStore';

export default function SidebarUser({ conversation, isSelected, onSelect, currentUserId }) {
  const { onlineUsers } = useAuthStore();
  const otherUser = conversation.participants?.find(p => p._id !== currentUserId);
  const isOnline = onlineUsers.includes(otherUser?._id);
  const unread = conversation.unreadCount?.get?.(currentUserId) || conversation.unreadCount?.[currentUserId] || 0;

  if (!otherUser) return null;

  return (
    <motion.button
      variants={{
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
      }}
      onClick={() => onSelect(otherUser)}
      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-left relative overflow-hidden group ${
        isSelected
          ? 'bg-azure-500/10 dark:bg-azure-500/5'
          : 'hover:bg-pearl-200/50 dark:hover:bg-midnight-800/50'
      }`}
    >
      {isSelected && (
        <motion.div layoutId="sidebar-active" className="absolute left-0 top-2 bottom-2 w-1 bg-azure-500 rounded-r-full" />
      )}
      
      <Avatar src={otherUser.profilePic} name={otherUser.fullName} size="md" showStatus isOnline={isOnline} />
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className={`font-semibold text-sm truncate ${isSelected ? 'text-azure-700 dark:text-azure-400' : 'text-midnight-900 dark:text-pearl-50'}`}>
            {otherUser.fullName}
          </span>
          <span className="text-[10px] font-medium text-midnight-400 dark:text-midnight-500 flex-shrink-0 ml-2 tabular-nums">
            {conversation.lastMessage?.createdAt ? formatMessageTime(conversation.lastMessage.createdAt) : ''}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className={`text-xs truncate pr-2 ${unread > 0 ? 'text-midnight-800 dark:text-pearl-200 font-medium' : 'text-midnight-500 dark:text-pearl-500'}`}>
            {truncateText(conversation.lastMessage?.text, 35) || 'Start a conversation'}
          </span>
          <UnreadBadge count={unread} />
        </div>
      </div>
    </motion.button>
  );
}
