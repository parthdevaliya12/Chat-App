import Conversation from '../models/Conversation.model.js';
import Message from '../models/Message.model.js';
import cloudinary from '../config/cloudinary.js';
import { io, getReceiverSocketId } from '../socket/socket.js';

export const getConversations = async (req, res, next) => {
  try {
    const currentUserId = req.user._id;

    const conversations = await Conversation.find({
      participants: currentUserId,
    })
      .populate('participants', 'fullName email profilePic bio')
      .populate('lastMessage.sender', 'fullName')
      .sort({ updatedAt: -1 });

    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { id: otherUserId } = req.params;
    const currentUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: currentUserId },
      ],
    }).sort({ createdAt: 1 });

    const conversation = await Conversation.findOne({
      participants: { $all: [currentUserId, otherUserId] },
    });

    if (conversation) {
      conversation.unreadCount.set(currentUserId.toString(), 0);
      await conversation.save();
    }

    await Message.updateMany(
      { senderId: otherUserId, receiverId: currentUserId, seen: false },
      { $set: { seen: true } }
    );

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const { text, image, isWhisper, mood } = req.body;

    let imageUrl = '';
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text: text || '',
      image: imageUrl,
      isWhisper: isWhisper || false,
      mood: mood || '',
    });

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
        unreadCount: new Map([
          [senderId.toString(), 0],
          [receiverId.toString(), 0],
        ]),
      });
    }

    conversation.lastMessage = {
      text: text || 'Sent an image',
      sender: senderId,
      createdAt: new Date(),
    };

    const currentUnread = conversation.unreadCount.get(receiverId.toString()) || 0;
    conversation.unreadCount.set(receiverId.toString(), currentUnread + 1);

    await Promise.all([newMessage.save(), conversation.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

export const editMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const senderId = req.user._id;

    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.senderId.toString() !== senderId.toString()) {
      return res.status(403).json({ message: 'Unauthorized to edit this message' });
    }

    message.text = text;
    message.isEdited = true;
    await message.save();

    const receiverSocketId = getReceiverSocketId(message.receiverId.toString());
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('messageEdited', message);
    }
    
    const senderSocketId = getReceiverSocketId(senderId.toString());
    if (senderSocketId) {
       io.to(senderSocketId).emit('messageEdited', message);
    }

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const senderId = req.user._id;

    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.senderId.toString() !== senderId.toString()) {
      return res.status(403).json({ message: 'Unauthorized to delete this message' });
    }

    const receiverId = message.receiverId;
    await Message.findByIdAndDelete(id);

    const receiverSocketId = getReceiverSocketId(receiverId.toString());
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('messageDeleted', id);
    }
    
    const senderSocketId = getReceiverSocketId(senderId.toString());
    if (senderSocketId) {
       io.to(senderSocketId).emit('messageDeleted', id);
    }

    res.status(200).json({ message: 'Message deleted successfully', id });
  } catch (error) {
    next(error);
  }
};
