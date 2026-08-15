import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { getSocket } from '../lib/socket';
import { toast } from 'sonner';
import { useAuthStore } from './useAuthStore';

export const useChatStore = create((set, get) => ({
  messages: [],
  conversations: [],
  selectedUser: null,
  isMessagesLoading: false,
  isConversationsLoading: false,
  typingUsers: {},

  getConversations: async () => {
    try {
      set({ isConversationsLoading: true });
      const res = await axiosInstance.get('/messages/conversations');
      set({ conversations: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching conversations');
    } finally {
      set({ isConversationsLoading: false });
    }
  },

  getMessages: async (userId) => {
    try {
      set({ isMessagesLoading: true });
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching messages');
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (userId, messageData) => {
    try {
      const res = await axiosInstance.post(`/messages/send/${userId}`, messageData);
      set((state) => ({ messages: [...state.messages, res.data] }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending message');
    }
  },

  editMessage: async (messageId, text) => {
    try {
      const res = await axiosInstance.put(`/messages/edit/${messageId}`, { text });
      set((state) => ({
        messages: state.messages.map(msg => 
          msg._id === messageId ? { ...msg, text: res.data.text, isEdited: true } : msg
        )
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error editing message');
    }
  },

  deleteMessage: async (messageId) => {
    try {
      await axiosInstance.delete(`/messages/delete/${messageId}`);
      set((state) => ({
        messages: state.messages.filter(msg => msg._id !== messageId)
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting message');
    }
  },

  setSelectedUser: (user) => set({ selectedUser: user }),

  subscribeToMessages: () => {
    const socket = getSocket();
    if (!socket) return;
    
    socket.on('newMessage', (newMessage) => {
      const { selectedUser } = get();
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        set((state) => ({ messages: [...state.messages, newMessage] }));
      }
    });

    socket.on('typing', ({ senderId }) => {
      set((state) => ({ typingUsers: { ...state.typingUsers, [senderId]: true } }));
    });

    socket.on('stopTyping', ({ senderId }) => {
      set((state) => {
        const newTypingUsers = { ...state.typingUsers };
        delete newTypingUsers[senderId];
        return { typingUsers: newTypingUsers };
      });
    });

    socket.on('messageEdited', (editedMessage) => {
      set((state) => ({
        messages: state.messages.map(msg => 
          msg._id === editedMessage._id ? editedMessage : msg
        )
      }));
    });

    socket.on('messageDeleted', (deletedMessageId) => {
      set((state) => ({
        messages: state.messages.filter(msg => msg._id !== deletedMessageId)
      }));
    });
  },

  unsubscribeFromMessages: () => {
    const socket = getSocket();
    if (!socket) return;
    socket.off('newMessage');
    socket.off('typing');
    socket.off('stopTyping');
    socket.off('messageEdited');
    socket.off('messageDeleted');
  },

  emitTyping: (receiverId) => {
    const socket = getSocket();
    if (socket) {
      socket.emit('typing', { receiverId });
    }
  },

  emitStopTyping: (receiverId) => {
    const socket = getSocket();
    if (socket) {
      socket.emit('stopTyping', { receiverId });
    }
  }
}));
