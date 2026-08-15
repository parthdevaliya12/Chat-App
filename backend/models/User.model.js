import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    profilePic: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: "Hey there! I'm using ChatApp.",
      maxlength: 200,
    },
    settings: {
      autoSaveMedia: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
