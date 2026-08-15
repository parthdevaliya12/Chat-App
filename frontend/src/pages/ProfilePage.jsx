import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { HiOutlineCamera, HiOutlineEnvelope, HiOutlineCalendarDays, HiOutlineUser, HiOutlineCog6Tooth, HiOutlineTrash, HiOutlineInformationCircle } from 'react-icons/hi2';
import { toast } from 'sonner';
import { useAuthStore } from '../store/useAuthStore';

const ProfilePage = () => {
  const { authUser, updateProfile, deleteAccount, isUpdatingProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const [fullName, setFullName] = useState(authUser?.fullName || '');
  const [bio, setBio] = useState(authUser?.bio || '');
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
    };
  };

  const handleSave = async () => {
    const data = { fullName, bio };
    if (selectedImage) data.profilePic = selectedImage;
    if (hasProfileChanges) await updateProfile(data);
  };

  const handleDeleteAccount = () => {
    toast.error('Are you absolutely sure? This action cannot be undone.', {
      duration: 10000,
      action: {
        label: 'Delete Account',
        onClick: () => deleteAccount()
      },
      cancel: {
        label: 'Cancel'
      }
    });
  };

  const hasProfileChanges = fullName !== authUser?.fullName || bio !== authUser?.bio || selectedImage;
  const hasChanges = hasProfileChanges;

  return (
    <div className="h-full flex flex-col bg-white/40 dark:bg-midnight-950/40 relative overflow-y-auto">
      {/* Header Bar */}
      <div className="px-8 py-6 border-b border-pearl-200 dark:border-midnight-800/50 bg-white/60 dark:bg-midnight-900/60 backdrop-blur-md sticky top-0 z-20">
        <h2 className="text-2xl font-bold text-midnight-900 dark:text-pearl-50 tracking-tight">Profile Settings</h2>
        <p className="text-midnight-500 dark:text-midnight-400 text-sm font-medium mt-1">Manage your account details and preferences</p>
      </div>

      <div className="flex-1 px-8 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          
          {/* Avatar Section */}
          <div className="bg-white/60 dark:bg-midnight-900/40 border border-pearl-200 dark:border-midnight-800 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-8 shadow-sm">
            <div className="relative group">
              {selectedImage || authUser?.profilePic ? (
                <img
                  src={selectedImage || authUser.profilePic}
                  alt="Profile"
                  className="w-32 h-32 rounded-3xl object-cover border-4 border-white dark:border-midnight-800 shadow-xl shadow-azure-500/10"
                />
              ) : (
                <div className="w-32 h-32 rounded-3xl gradient-bg-azure flex items-center justify-center text-midnight-950 text-4xl font-bold border-4 border-white dark:border-midnight-800 shadow-xl shadow-azure-500/20">
                  {authUser?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'}
                </div>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUpdatingProfile}
                className="absolute inset-0 bg-midnight-900/40 backdrop-blur-sm flex items-center justify-center rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer border-4 border-transparent group-hover:border-white/20"
              >
                <HiOutlineCamera className="text-white w-8 h-8" />
              </button>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            </div>
            
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-xl font-bold text-midnight-900 dark:text-pearl-50">{authUser?.fullName}</h3>
              <p className="text-midnight-500 dark:text-midnight-400 mt-1 mb-4 font-medium">{authUser?.email}</p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-pearl-200/50 dark:bg-midnight-800/50 hover:bg-pearl-200 dark:hover:bg-midnight-700 text-midnight-700 dark:text-pearl-300 rounded-xl text-sm font-bold transition-colors"
              >
                Change Photo
              </button>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white/60 dark:bg-midnight-900/40 border border-pearl-200 dark:border-midnight-800 rounded-3xl p-8 shadow-sm space-y-6">
            <div>
              <label className="block text-xs font-bold text-midnight-600 dark:text-midnight-400 mb-2 uppercase tracking-wide">Display Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiOutlineUser className="text-midnight-400 group-focus-within:text-azure-500 text-lg transition-colors duration-200" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-pearl-200 dark:border-midnight-700/50 bg-pearl-50/50 dark:bg-midnight-950/50 focus:bg-white dark:focus:bg-midnight-800 focus:outline-none focus:border-azure-500 focus:ring-1 focus:ring-azure-500 transition-all text-midnight-900 dark:text-pearl-50 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-midnight-600 dark:text-midnight-400 mb-2 uppercase tracking-wide">About Me</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value.slice(0, 200))}
                rows="3"
                className="w-full px-4 py-3.5 rounded-2xl border border-pearl-200 dark:border-midnight-700/50 bg-pearl-50/50 dark:bg-midnight-950/50 focus:bg-white dark:focus:bg-midnight-800 focus:outline-none focus:border-azure-500 focus:ring-1 focus:ring-azure-500 transition-all text-midnight-900 dark:text-pearl-50 resize-none font-medium"
                placeholder="Tell us about yourself..."
              />
              <div className="text-right text-xs font-medium text-midnight-400 mt-2">{bio.length}/200 characters</div>
            </div>
          </div>

          {/* Account Info Section */}
          <div className="bg-white/60 dark:bg-midnight-900/40 border border-pearl-200 dark:border-midnight-800 rounded-3xl p-8 shadow-sm">
            <h3 className="text-sm font-bold text-midnight-900 dark:text-pearl-50 mb-6 uppercase tracking-wide">Account Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-azure-500/10 rounded-2xl flex items-center justify-center">
                  <HiOutlineEnvelope className="w-6 h-6 text-azure-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-midnight-500 dark:text-midnight-400 uppercase tracking-wider">Email Address</p>
                  <p className="font-semibold text-midnight-900 dark:text-pearl-100 mt-0.5">{authUser?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amethyst-500/10 rounded-2xl flex items-center justify-center">
                  <HiOutlineCalendarDays className="w-6 h-6 text-amethyst-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-midnight-500 dark:text-midnight-400 uppercase tracking-wider">Member Since</p>
                  <p className="font-semibold text-midnight-900 dark:text-pearl-100 mt-0.5">
                    {authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone Section */}
          <div className="bg-rose-50/50 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/20 rounded-3xl p-8 shadow-sm">
            <h3 className="text-sm font-bold text-rose-600 dark:text-rose-400 mb-6 uppercase tracking-wide flex items-center gap-2">
              <HiOutlineInformationCircle className="w-5 h-5" /> Danger Zone
            </h3>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-midnight-900 dark:text-pearl-50 text-sm">Delete Account</h4>
                <p className="text-xs font-medium text-midnight-500 dark:text-midnight-400 mt-1 max-w-md">
                  Permanently delete your account and remove all associated data. This action is irreversible.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDeleteAccount}
                className="px-6 py-2.5 bg-rose-500 text-white rounded-xl font-bold tracking-wide shadow-lg shadow-rose-500/20 hover:bg-rose-600 transition-colors flex items-center gap-2 flex-shrink-0"
              >
                <HiOutlineTrash className="w-5 h-5" />
                Delete Account
              </motion.button>
            </div>
          </div>

          {/* Save Action */}
          <div className="flex justify-end pt-4 pb-12">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={isUpdatingProfile || !hasChanges}
              className="px-8 py-3.5 gradient-bg-azure text-midnight-950 rounded-2xl font-bold tracking-wide shadow-lg shadow-azure-500/30 hover:shadow-xl hover:shadow-azure-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUpdatingProfile ? (
                <>
                  <span className="w-5 h-5 border-2 border-midnight-950/30 border-t-midnight-950 rounded-full animate-spin"></span>
                  Saving Changes...
                </>
              ) : (
                'Save Changes'
              )}
            </motion.button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
