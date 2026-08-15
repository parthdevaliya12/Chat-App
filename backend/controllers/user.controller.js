import User from '../models/User.model.js';
import cloudinary from '../config/cloudinary.js';

export const getUsersForSidebar = async (req, res, next) => {
  try {
    const currentUserId = req.user._id;

    const users = await User.find({ _id: { $ne: currentUserId } })
      .select('fullName email profilePic bio')
      .sort({ fullName: 1 });

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const searchUsers = async (req, res, next) => {
  try {
    const { q } = req.query;
    const currentUserId = req.user._id;

    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const regex = new RegExp(q, 'i');

    const users = await User.find({
      _id: { $ne: currentUserId },
      $or: [{ fullName: regex }, { email: regex }],
    })
      .select('fullName email profilePic bio')
      .limit(20);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { fullName, bio, profilePic } = req.body;
    const userId = req.user._id;

    let updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (bio) updateData.bio = bio;

    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      updateData.profilePic = uploadResponse.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select('-password');

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
