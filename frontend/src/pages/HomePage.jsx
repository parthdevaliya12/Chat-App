import React from 'react';
import { useEffect } from 'react';
import { motion } from 'motion/react';
import Sidebar from '../components/sidebar/Sidebar';
import ChatContainer from '../components/chat/ChatContainer';
import EmptyChat from '../components/chat/EmptyChat';
import { useChatStore } from '../store/useChatStore';

const HomePage = () => {
  const { selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [subscribeToMessages, unsubscribeFromMessages]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full w-full"
    >
      {/* Sidebar Panel (Conversations) */}
      <div className={`w-full md:w-80 lg:w-96 flex-shrink-0 border-r border-pearl-200 dark:border-midnight-800/50 bg-white/30 dark:bg-midnight-900/20 ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
        <Sidebar />
      </div>

      {/* Chat Area Panel */}
      <div className={`flex-1 flex flex-col min-w-0 bg-transparent ${!selectedUser ? 'hidden md:flex' : 'flex'}`}>
        {!selectedUser ? <EmptyChat /> : <ChatContainer />}
      </div>
    </motion.div>
  );
};

export default HomePage;
