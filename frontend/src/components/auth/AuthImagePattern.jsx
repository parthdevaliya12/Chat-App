import { motion } from 'motion/react';
import { HiOutlineChatBubbleLeftRight, HiOutlineShieldCheck, HiOutlineEyeSlash, HiOutlineGlobeAlt } from 'react-icons/hi2';

const features = [
  { icon: '🚀', text: 'Real-time WebSocket' },
  { icon: '🔒', text: 'End-to-End Secure' },
  { icon: '👻', text: 'Whisper Mode' },
  { icon: '🎭', text: 'Mood Expressions' },
  { icon: '🌙', text: 'Midnight Theme' },
  { icon: '📸', text: 'High-Res Media' },
];

export default function AuthImagePattern({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-midnight-800 via-midnight-900 to-black p-10 sm:p-14 shadow-2xl shadow-azure-500/10 border border-midnight-700/50 h-full flex flex-col justify-center"
    >
      {/* Background ambient shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-azure-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amethyst-500/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Feature pills */}
      <div className="relative z-10 flex flex-wrap gap-3 justify-center mb-12">
        {features.map((f, i) => (
          <motion.div
            key={f.text}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.08 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl"
          >
            <span className="text-lg">{f.icon}</span>
            <span className="text-pearl-100 text-sm font-semibold tracking-wide">{f.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-center relative z-10"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">{title}</h2>
        <p className="text-pearl-300/70 text-base max-w-sm mx-auto leading-relaxed">{subtitle}</p>
      </motion.div>

      {/* Decorative tech grid */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.1)_0%,transparent_70%)]"></div>
    </motion.div>
  );
}
