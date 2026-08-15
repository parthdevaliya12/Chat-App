import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5001' : 'https://chat-app-rdnr.onrender.com';

let socket = null;

export const connectSocket = (userId) => {
  if (socket?.connected) return;
  
  socket = io(BASE_URL, {
    query: { userId },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
  });
  
  socket.connect();
};

export const disconnectSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
  }
};

export const getSocket = () => socket;
