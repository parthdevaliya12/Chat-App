import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { connectSocket, disconnectSocket, getSocket } from '../lib/socket';
import { toast } from 'sonner';

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isRegistering: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data });
      connectSocket(res.data._id);
      get().subscribeToOnlineUsers();
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  register: async (data) => {
    try {
      set({ isRegistering: true });
      const res = await axiosInstance.post('/auth/register', data);
      set({ authUser: res.data });
      connectSocket(res.data._id);
      get().subscribeToOnlineUsers();
      toast.success('Registration successful');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error occurred');
    } finally {
      set({ isRegistering: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLoggingIn: true });
      const res = await axiosInstance.post('/auth/login', data);
      set({ authUser: res.data });
      connectSocket(res.data._id);
      get().subscribeToOnlineUsers();
      toast.success('Logged in successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error occurred');
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null, onlineUsers: [] });
      disconnectSocket();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error occurred');
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put('/users/profile', data);
      set({ authUser: res.data });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error occurred');
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  updateSettings: async (settings) => {
    try {
      const res = await axiosInstance.put('/auth/settings', settings);
      set({ authUser: res.data });
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating settings');
    }
  },

  deleteAccount: async () => {
    try {
      await axiosInstance.delete('/auth/account');
      set({ authUser: null, onlineUsers: [] });
      disconnectSocket();
      toast.success('Account deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting account');
    }
  },

  subscribeToOnlineUsers: () => {
    const socket = getSocket();
    if (!socket) return;
    socket.on('getOnlineUsers', (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
}));
