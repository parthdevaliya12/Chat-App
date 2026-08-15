import { useEffect, useRef } from 'react';
import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/useAuthStore';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';

export default function ChatContainer() {
  const {
    selectedUser, messages, getMessages,
    isMessagesLoading, typingUsers
  } = useChatStore();
  const { authUser } = useAuthStore();
  const endRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id, getMessages]);

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingUsers]);

  const isTyping = selectedUser?._id && typingUsers?.[selectedUser._id];

  return (
    <div className="flex-1 flex flex-col h-full bg-white/40 dark:bg-midnight-950/40 relative">
      <ChatHeader />

      {/* Messages Canvas */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2">
        {isMessagesLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-[3px] border-azure-500/30 border-t-azure-500 rounded-full animate-spin"></div>
              <span className="text-sm font-medium text-midnight-500 dark:text-pearl-500">Syncing messages...</span>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 bg-pearl-200/50 dark:bg-midnight-800/50 rounded-[2rem] flex items-center justify-center mb-4 rotate-6 shadow-inner">
              <span className="text-4xl -rotate-6">👋</span>
            </div>
            <p className="text-xl font-bold text-midnight-900 dark:text-pearl-50 tracking-tight">Start a conversation</p>
            <p className="text-midnight-500 dark:text-pearl-400 mt-1">Say hello to {selectedUser?.fullName}!</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isOwn = msg.senderId === authUser?._id;
            const prevMsg = messages[index - 1];
            const isConsecutive = prevMsg && prevMsg.senderId === msg.senderId;
            
            return (
              <MessageBubble
                key={msg._id}
                message={msg}
                isOwn={isOwn}
                isConsecutive={isConsecutive}
              />
            );
          })
        )}
        {isTyping && <TypingIndicator userName={selectedUser?.fullName} />}
        <div ref={endRef} />
      </div>

      <MessageInput />
    </div>
  );
}
