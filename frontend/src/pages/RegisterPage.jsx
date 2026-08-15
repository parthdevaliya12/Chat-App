import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeSlash, HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi2';
import { useAuthStore } from '../store/useAuthStore';
import AuthImagePattern from '../components/auth/AuthImagePattern';
import { toast } from 'sonner';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register, isRegistering } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error('Please ensure your password meets all requirements');
      return;
    }
    await register({ fullName, email, password });
  };

  const passwordChecks = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'One uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', valid: /[a-z]/.test(password) },
    { label: 'One number', valid: /\d/.test(password) },
    { label: 'One special character (@$!%*?&)', valid: /[@$!%*?&]/.test(password) },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-pearl-100 dark:bg-midnight-950 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-azure-500/10 dark:bg-azure-500/5 blur-[120px] animate-float-slow"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[35%] h-[35%] rounded-full bg-amethyst-500/10 dark:bg-amethyst-500/5 blur-[100px] animate-float"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1200px] h-full max-h-[800px] glass-panel md:rounded-3xl flex flex-col lg:flex-row-reverse overflow-hidden shadow-2xl shadow-midnight-900/10 dark:shadow-black/50">
        
        {/* Right Side - Form (Scrollable on mobile) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12 h-full overflow-y-auto scrollbar-thin">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-sm mx-auto"
          >
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
                className="w-16 h-16 mx-auto rounded-[1.5rem] shadow-xl shadow-azure-500/30 flex items-center justify-center mb-6 overflow-hidden bg-white/5"
              >
                <img src="/logo.png" alt="LinkUp Logo" className="w-full h-full object-cover" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-3xl font-bold text-midnight-900 dark:text-pearl-50 tracking-tight"
              >
                Create Account
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="text-midnight-500 dark:text-midnight-400 mt-2 font-medium"
              >
                Join LinkUp and connect instantly
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <div className="relative group">
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="peer w-full pl-11 pr-4 pt-5 pb-2 rounded-2xl border border-pearl-200 dark:border-midnight-700/50 bg-pearl-50/50 dark:bg-midnight-900/50 focus:bg-white dark:focus:bg-midnight-800 focus:outline-none focus:border-azure-500 focus:ring-1 focus:ring-azure-500 transition-all text-midnight-900 dark:text-pearl-50 font-medium placeholder-transparent"
                    placeholder="John Doe"
                  />
                  <label 
                    htmlFor="fullName"
                    className="absolute left-11 top-1.5 text-[10px] uppercase font-bold text-midnight-400 dark:text-midnight-500 transition-all peer-placeholder-shown:text-[15px] peer-placeholder-shown:top-3.5 peer-placeholder-shown:normal-case peer-focus:text-[10px] peer-focus:top-1.5 peer-focus:uppercase peer-focus:text-azure-500 cursor-text select-none pointer-events-none"
                  >
                    Full Name
                  </label>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiOutlineUser className="text-midnight-400 peer-focus:text-azure-500 text-lg transition-colors duration-200" />
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer w-full pl-11 pr-4 pt-5 pb-2 rounded-2xl border border-pearl-200 dark:border-midnight-700/50 bg-pearl-50/50 dark:bg-midnight-900/50 focus:bg-white dark:focus:bg-midnight-800 focus:outline-none focus:border-azure-500 focus:ring-1 focus:ring-azure-500 transition-all text-midnight-900 dark:text-pearl-50 font-medium placeholder-transparent"
                    placeholder="you@example.com"
                  />
                  <label 
                    htmlFor="email"
                    className="absolute left-11 top-1.5 text-[10px] uppercase font-bold text-midnight-400 dark:text-midnight-500 transition-all peer-placeholder-shown:text-[15px] peer-placeholder-shown:top-3.5 peer-placeholder-shown:normal-case peer-focus:text-[10px] peer-focus:top-1.5 peer-focus:uppercase peer-focus:text-azure-500 cursor-text select-none pointer-events-none"
                  >
                    Email
                  </label>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiOutlineEnvelope className="text-midnight-400 peer-focus:text-azure-500 text-lg transition-colors duration-200" />
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <div className="relative group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer w-full pl-11 pr-12 pt-5 pb-2 rounded-2xl border border-pearl-200 dark:border-midnight-700/50 bg-pearl-50/50 dark:bg-midnight-900/50 focus:bg-white dark:focus:bg-midnight-800 focus:outline-none focus:border-azure-500 focus:ring-1 focus:ring-azure-500 transition-all text-midnight-900 dark:text-pearl-50 font-medium placeholder-transparent"
                    placeholder="Enter strong password"
                  />
                  <label 
                    htmlFor="password"
                    className="absolute left-11 top-1.5 text-[10px] uppercase font-bold text-midnight-400 dark:text-midnight-500 transition-all peer-placeholder-shown:text-[15px] peer-placeholder-shown:top-3.5 peer-placeholder-shown:normal-case peer-focus:text-[10px] peer-focus:top-1.5 peer-focus:uppercase peer-focus:text-azure-500 cursor-text select-none pointer-events-none"
                  >
                    Password
                  </label>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiOutlineLockClosed className="text-midnight-400 peer-focus:text-azure-500 text-lg transition-colors duration-200" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-midnight-400 hover:text-azure-500 transition-colors"
                  >
                    {showPassword ? <HiOutlineEyeSlash className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    className="mt-3 space-y-1.5 p-3 bg-white/50 dark:bg-midnight-900/50 rounded-xl border border-pearl-200 dark:border-midnight-700/30"
                  >
                    {passwordChecks.map((check, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium">
                        {check.valid ? (
                          <HiOutlineCheckCircle className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <HiOutlineXCircle className="w-4 h-4 text-rose-400" />
                        )}
                        <span className={check.valid ? "text-emerald-600 dark:text-emerald-400" : "text-midnight-500 dark:text-midnight-400"}>
                          {check.label}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isRegistering}
                  className="w-full py-3.5 mt-4 gradient-bg-azure text-midnight-950 rounded-2xl font-bold tracking-wide shadow-lg shadow-azure-500/30 hover:shadow-xl hover:shadow-azure-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isRegistering ? (
                    <>
                      <span className="w-5 h-5 border-2 border-midnight-950/30 border-t-midnight-950 rounded-full animate-spin"></span>
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </motion.button>
              </motion.div>
            </form>

            <p className="text-midnight-500 dark:text-midnight-400 text-sm mt-6 text-center">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-azure-600 dark:text-azure-400 hover:underline">
                Sign in
              </Link>
            </p>
            
            <div className="mt-8 text-center text-xs text-midnight-400 dark:text-midnight-500">
              &copy; {new Date().getFullYear()} LinkUp. By Parth Devaliya.
            </div>
          </motion.div>
        </div>

        {/* Left Side - Pattern */}
        <div className="hidden lg:block lg:w-1/2 p-4">
          <AuthImagePattern
            title="Join the future"
            subtitle="Experience a faster, more secure, and beautifully designed way to communicate."
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
