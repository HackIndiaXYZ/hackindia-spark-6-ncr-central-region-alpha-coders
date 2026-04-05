import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, Terminal, Mail, Cpu } from 'lucide-react';

export default function Auth() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (e, providerName = '') => {
    if (e) e.preventDefault();
    
    let finalUser = username.trim();
    if (providerName) {
      finalUser = `${providerName}_User_${Math.floor(Math.random()*1000)}`;
    }
    
    if (!finalUser) return;

    // Trigger the Cinematic Loading sequence
    setIsLoading(true);
    localStorage.setItem('CA_USERNAME', finalUser);

    // Wait exactly 3.5 seconds to show off the realistic loading animation
    setTimeout(() => {
      navigate('/lobby');
    }, 3500);
  };

  return (
    <AnimatePresence mode="wait">
      {!isLoading ? (
        <motion.div 
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex items-center justify-center bg-code-dark relative overflow-hidden"
        >
          {/* Dynamic Gaming Background */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-code-blue/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-3/4 h-full bg-gradient-to-t from-code-purple/10 to-transparent pointer-events-none" />
          <div className="bg-scanline opacity-50" />
          
          <motion.img 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            src="/images/character_hacker.png" 
            alt="Splash" 
            className="absolute bottom-0 left-[5%] max-h-[90vh] object-contain opacity-40 drop-shadow-[0_0_30px_rgba(176,38,255,0.4)] pointer-events-none hidden lg:block"
          />

          <div className="glass-panel p-10 w-full max-w-md z-10 mx-4 border-t-4 border-t-code-blue rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
            <div className="text-center mb-8 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-b from-black/80 to-black/20 rounded-2xl mx-auto flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_20px_rgba(0,243,255,0.2)] hover:rotate-180 transition-transform duration-700 cursor-crosshair">
                <img src="/logo.png" alt="CodeArena Logo" className="w-12 h-12 object-contain drop-shadow-[0_0_8px_rgba(176,38,255,0.8)] animate-pulse-fast" />
              </div>
              <h1 className="text-4xl font-gaming font-black glow-text mb-2 tracking-widest leading-tight">
                CODE ARENA
              </h1>
              <p className="text-gray-400 text-sm font-bold tracking-widest uppercase">System Initialization</p>
            </div>

            <form onSubmit={(e) => handleAuth(e)} className="space-y-5 relative z-10">
              <div className="space-y-2 group">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 hover:border-white/30 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-code-blue focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all font-sans text-center tracking-widest"
                  placeholder="ENTER GAMER TAG"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full clip-slant-heavy bg-code-blue text-black font-gaming font-black tracking-[0.2em] py-4 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center group shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_30px_rgba(0,243,255,0.8)] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white/0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-[600ms]" />
                VERIFY & DEPLOY
                <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </form>

            <div className="mt-8 relative z-10 flex flex-col items-center">
              <div className="flex items-center w-full mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20"></div>
                <span className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Global Link</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20"></div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <button 
                  onClick={() => handleAuth(null, 'Google')}
                  className="clip-slant bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-white/10 text-white font-bold py-3 px-4 transition-all flex items-center justify-center gap-3 group overflow-hidden relative"
                >
                  <Mail className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors z-10" />
                  <span className="text-xs font-gaming tracking-widest z-10">GOOGLE</span>
                  <div className="absolute inset-0 bg-red-500/10 scale-0 group-hover:scale-100 transition-transform rounded-full" />
                </button>
                <button 
                  onClick={() => handleAuth(null, 'GitHub')}
                  className="clip-slant bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 text-white font-bold py-3 px-4 transition-all flex items-center justify-center gap-3 group overflow-hidden relative"
                >
                  <Terminal className="w-5 h-5 text-gray-500 group-hover:text-purple-500 transition-colors z-10" />
                  <span className="text-xs font-gaming tracking-widest z-10">GITHUB</span>
                  <div className="absolute inset-0 bg-purple-500/10 scale-0 group-hover:scale-100 transition-transform rounded-full" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        // ================= CINEMATIC LOADING CUTSCENE =================
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen bg-black relative flex items-center justify-center overflow-hidden"
        >
          {/* Intense Background Art */}
          <div className="absolute inset-0 z-0">
            <motion.img 
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 4 }}
              src="/images/character_coding.png"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="bg-scanline" />
          </div>

          <div className="z-10 w-full max-w-3xl flex flex-col items-center">
            <motion.div 
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-24 h-24 border-2 border-dashed border-code-blue rounded-full mb-8 flex items-center justify-center"
            >
              <div className="w-16 h-16 border-4 border-t-code-purple border-r-code-purple border-b-transparent border-l-transparent rounded-[100%] animate-spin" style={{ animationDirection: 'reverse' }} />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-gaming font-black text-white tracking-[0.5em] mb-4 glow-text-heavy"
            >
              DECRYPTING ARENA
            </motion.h2>

            <motion.div className="w-full h-2 bg-black/50 border border-white/20 clip-slant overflow-hidden relative">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="absolute top-0 left-0 h-full bg-code-blue shadow-[0_0_20px_#00f3ff]"
              />
            </motion.div>
            
            <div className="mt-4 text-code-blue font-mono text-xs flex justify-between w-full opacity-60">
              <span className="animate-pulse">Loading Main Modules...</span>
              <span>EST. 3s</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
