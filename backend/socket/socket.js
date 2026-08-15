import { Server } from 'socket.io';

let io;
const userSocketMap = new Map();

export const getReceiverSocketId = (userId) => {
  return userSocketMap.get(userId);
};

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    const userId = socket.handshake.query.userId;
    if (userId && userId !== 'undefined') {
      userSocketMap.set(userId, socket.id);
    }

    io.emit('getOnlineUsers', Array.from(userSocketMap.keys()));

    socket.on('typing', ({ receiverId }) => {
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        socket.to(receiverSocketId).emit('typing', { senderId: userId });
      }
    });

    socket.on('stopTyping', ({ receiverId }) => {
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        socket.to(receiverSocketId).emit('stopTyping', { senderId: userId });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);
      if (userId) {
        userSocketMap.delete(userId);
      }
      io.emit('getOnlineUsers', Array.from(userSocketMap.keys()));
    });
  });

  return io;
};

export { io };
