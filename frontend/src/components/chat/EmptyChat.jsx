import { HiOutlineSparkles, HiOutlineBolt, HiOutlineEyeSlash, HiOutlineFaceSmile } from 'react-icons/hi2';
import { motion } from 'motion/react';

const features = [
  {
    icon: HiOutlineBolt,
    title: 'Lightning Fast',
    description: 'Instant WebSocket delivery',
    color: '#3B82F6' // Azure
  },
  {
    icon: HiOutlineEyeSlash,
    title: 'Whisper Mode',
    description: 'Send hidden messages',
    color: '#8B5CF6', // Amethyst
    isUnique: true,
  },
  {
    icon: HiOutlineFaceSmile,
    title: 'Mood Tags',
    description: 'Express your vibe',
    color: '#10B981', // Emerald
    isUnique: true,
  }
];

export default function EmptyChat() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white/20 dark:bg-midnight-950/20 relative overflow-hidden h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center z-10 max-w-xl w-full"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-10"
        >
          <div className="w-24 h-24 mx-auto rounded-[2rem] overflow-hidden shadow-2xl shadow-azure-500/20 bg-white/5">
            <img src="/logo.png" alt="LinkUp Logo" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <h2 className="text-4xl font-bold mb-4 text-midnight-900 dark:text-pearl-50 tracking-tight">
          Welcome to <span className="gradient-text-azure">LinkUp</span>
        </h2>
        <p className="text-midnight-500 dark:text-midnight-400 mb-12 text-lg font-medium">
          Select a conversation from the sidebar to start messaging.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group p-6 rounded-3xl border transition-all duration-300 ${
                feature.isUnique
                  ? 'bg-azure-500/5 dark:bg-azure-500/5 border-azure-500/10 hover:border-azure-500/30 shadow-lg shadow-azure-500/5'
                  : 'bg-white/60 dark:bg-midnight-900/40 border-pearl-200 dark:border-midnight-800 hover:border-pearl-300 dark:hover:border-midnight-700'
              }`}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-inner"
                style={{ backgroundColor: feature.color + '15' }}
              >
                <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
              </div>
              <h3 className="font-bold text-midnight-900 dark:text-pearl-100 text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-midnight-500 dark:text-midnight-400 font-medium">{feature.description}</p>
              {feature.isUnique && (
                <span className="inline-block mt-3 text-[10px] font-bold text-azure-600 dark:text-azure-400 bg-azure-500/10 px-2 py-1 rounded-full tracking-widest uppercase">NEW</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
