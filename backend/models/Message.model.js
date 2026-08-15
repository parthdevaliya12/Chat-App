import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    seen: {
      type: Boolean,
      default: false,
    },
    // Unique Feature: Whisper messages — blurred until hovered
    isWhisper: {
      type: Boolean,
      default: false,
    },
    // Unique Feature: Message mood — adds ambient glow to bubbles
    mood: {
      type: String,
      enum: ['', 'happy', 'love', 'sad', 'fire', 'chill', 'think'],
      default: '',
    },
    // Unique Feature: Edit message
    isEdited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;
