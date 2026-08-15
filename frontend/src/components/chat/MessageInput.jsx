import { useState, useRef } from 'react';
import { HiOutlineFaceSmile, HiOutlinePhoto, HiOutlinePaperAirplane, HiOutlineXMark, HiOutlineEyeSlash } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'motion/react';
import EmojiPicker from 'emoji-picker-react';
import { toast } from 'sonner';
import { useChatStore } from '../../store/useChatStore';
import { useThemeStore } from '../../store/useThemeStore';

const MOODS = [
  { key: 'happy', emoji: '😊', label: 'Happy' },
  { key: 'love', emoji: '❤️', label: 'Love' },
  { key: 'sad', emoji: '😢', label: 'Sad' },
  { key: 'fire', emoji: '🔥', label: 'Fire' },
  { key: 'chill', emoji: '🌿', label: 'Chill' },
  { key: 'think', emoji: '🤔', label: 'Think' },
];

export default function MessageInput() {
  const [text, setText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isWhisper, setIsWhisper] = useState(false);
  const [selectedMood, setSelectedMood] = useState('');
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const emojiRef = useRef(null);

  const { sendMessage, emitTyping, emitStopTyping, selectedUser } = useChatStore();
  const { theme } = useThemeStore();

  const handleTyping = (e) => {
    setText(e.target.value);
    if (selectedUser?._id) emitTyping(selectedUser._id);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      if (selectedUser?._id) emitStopTyping(selectedUser._id);
    }, 2000);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { toast.error('Image must be less than 5MB'); return; }
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!text.trim() && !imagePreview) || isSending || !selectedUser?._id) return;

    setIsSending(true);
    try {
      await sendMessage(selectedUser._id, {
        text: text.trim(),
        image: imagePreview,
        isWhisper,
        mood: selectedMood,
      });
      setText('');
      setImagePreview(null);
      setShowEmoji(false);
      setIsWhisper(false);
      setSelectedMood('');
      setShowMoodPicker(false);
      emitStopTyping(selectedUser._id);
    } finally {
      setIsSending(false);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setText(prev => prev + emojiData.emoji);
  };

  return (
    <div className="border-t border-pearl-200 dark:border-midnight-800/50 bg-white/60 dark:bg-midnight-900/60 backdrop-blur-md relative p-3">
      {/* Active features banner */}
      <AnimatePresence>
        {(isWhisper || selectedMood) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-3 flex items-center gap-2 flex-wrap px-2">
              {isWhisper && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-azure-600 dark:text-azure-400 bg-azure-500/10 px-3 py-1 rounded-full">
                  <HiOutlineEyeSlash className="w-4 h-4" />
                  Whisper mode
                  <button onClick={() => setIsWhisper(false)} className="ml-1 hover:text-rose-500 transition-colors">
                    <HiOutlineXMark className="w-4 h-4" />
                  </button>
                </span>
              )}
              {selectedMood && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amethyst-600 dark:text-amethyst-400 bg-amethyst-500/10 px-3 py-1 rounded-full">
                  <span className="text-sm">{MOODS.find(m => m.key === selectedMood)?.emoji}</span> {MOODS.find(m => m.key === selectedMood)?.label}
                  <button onClick={() => setSelectedMood('')} className="ml-1 hover:text-rose-500 transition-colors">
                    <HiOutlineXMark className="w-4 h-4" />
                  </button>
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Preview */}
      {imagePreview && (
        <div className="pb-3 px-2">
          <div className="relative inline-block">
            <img src={imagePreview} alt="Preview" className="h-24 w-24 rounded-2xl object-cover border-2 border-azure-500/30" />
            <button
              onClick={() => { setImagePreview(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
              className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 shadow-lg hover:bg-rose-600 transition-colors"
            >
              <HiOutlineXMark className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mood Picker */}
      <AnimatePresence>
        {showMoodPicker && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-3 flex items-center gap-2 px-2">
              <span className="text-xs font-bold text-midnight-400 dark:text-midnight-500 mr-2 uppercase tracking-widest">Select Mood:</span>
              {MOODS.map(mood => (
                <motion.button
                  key={mood.key}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setSelectedMood(selectedMood === mood.key ? '' : mood.key);
                    setShowMoodPicker(false);
                  }}
                  className={`p-2 rounded-xl transition-all text-xl ${
                    selectedMood === mood.key
                      ? 'bg-azure-500/10 dark:bg-azure-500/20 ring-2 ring-azure-500/50'
                      : 'hover:bg-pearl-200 dark:hover:bg-midnight-800'
                  }`}
                  title={mood.label}
                >
                  {mood.emoji}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emoji Picker */}
      {showEmoji && (
        <div ref={emojiRef} className="absolute bottom-full left-4 mb-4 z-50 shadow-2xl rounded-2xl overflow-hidden border border-pearl-200 dark:border-midnight-800">
          <EmojiPicker
            theme={theme === 'dark' ? 'dark' : 'light'}
            onEmojiClick={handleEmojiClick}
            width={320}
            height={400}
            searchPlaceholder="Search..."
            skinTonesDisabled
          />
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-stretch md:items-end gap-3 px-2">
        {/* Tool buttons */}
        <div className="flex w-full md:w-auto items-center justify-between md:justify-start gap-1 bg-pearl-100 dark:bg-midnight-800/50 p-1.5 rounded-2xl border border-pearl-200 dark:border-midnight-700/50">
          <button
            type="button"
            onClick={() => setShowEmoji(!showEmoji)}
            className={`p-2 rounded-xl transition-all duration-200 ${
              showEmoji ? 'bg-azure-500/10 text-azure-600 dark:text-azure-400' : 'text-midnight-500 hover:text-midnight-700 hover:bg-white dark:text-midnight-400 dark:hover:text-pearl-200 dark:hover:bg-midnight-700'
            }`}
          >
            <HiOutlineFaceSmile className="w-5 h-5" />
          </button>
          
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageSelect} />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-midnight-500 hover:text-midnight-700 hover:bg-white dark:text-midnight-400 dark:hover:text-pearl-200 dark:hover:bg-midnight-700 rounded-xl transition-all duration-200"
          >
            <HiOutlinePhoto className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-pearl-200 dark:bg-midnight-700 mx-1"></div>

          <button
            type="button"
            onClick={() => setIsWhisper(!isWhisper)}
            className={`p-2 rounded-xl transition-all duration-200 ${
              isWhisper
                ? 'bg-azure-500 text-white shadow-md shadow-azure-500/20'
                : 'text-midnight-500 hover:text-midnight-700 hover:bg-white dark:text-midnight-400 dark:hover:text-pearl-200 dark:hover:bg-midnight-700'
            }`}
            title="Whisper mode"
          >
            <HiOutlineEyeSlash className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setShowMoodPicker(!showMoodPicker)}
            className={`p-2 rounded-xl transition-all duration-200 text-lg ${
              selectedMood
                ? 'bg-amethyst-500/10'
                : 'hover:bg-white dark:hover:bg-midnight-700'
            }`}
            title="Add mood"
          >
            {selectedMood ? MOODS.find(m => m.key === selectedMood)?.emoji : '🎭'}
          </button>
        </div>

        <div className="flex flex-1 items-end gap-3">
          {/* Text Input */}
          <div className="flex-1 bg-pearl-100 dark:bg-midnight-800/50 rounded-2xl border border-pearl-200 dark:border-midnight-700/50 focus-within:border-azure-500/50 focus-within:bg-white dark:focus-within:bg-midnight-900 transition-all duration-200">
            <textarea
              value={text}
              onChange={handleTyping}
              placeholder={isWhisper ? 'Type a whisper...' : 'Type a message...'}
              className="w-full bg-transparent px-4 py-3 outline-none resize-none text-midnight-900 dark:text-pearl-50 text-[15px] font-medium max-h-32 min-h-[48px] placeholder-midnight-400 dark:placeholder-midnight-500"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e); }
              }}
            />
          </div>

          {/* Send */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: 10 }}
            whileTap={{ scale: 0.95, rotate: -5 }}
            type="submit"
            disabled={(!text.trim() && !imagePreview) || isSending}
            className="w-12 h-12 flex items-center justify-center gradient-bg-azure text-midnight-950 rounded-2xl shadow-lg shadow-azure-500/25 disabled:opacity-50 disabled:shadow-none transition-all duration-200 flex-shrink-0"
          >
            <HiOutlinePaperAirplane className="w-5 h-5 -ml-1 -rotate-45" />
          </motion.button>
        </div>
      </form>
    </div>
  );
}
