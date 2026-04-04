import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Star, Target, Medal } from 'lucide-react';

export default function ProfileModal({ isOpen, onClose, username }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-hidden"
      >
        <motion.div 
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl h-[85vh] bg-code-dark border-2 border-white/5 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-red-500/20 text-gray-400 hover:text-red-500 border border-white/10 hover:border-red-500/50 rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex h-full relative">
            {/* Background Details */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10 pointer-events-none" />
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-code-purple/10 to-transparent pointer-events-none" />
            <div className="absolute left-0 bottom-0 w-1/2 h-full bg-gradient-to-t from-code-blue/10 to-transparent pointer-events-none" />

            {/* left column: 3D Character Preview Zone */}
            <div className="w-1/2 relative flex items-center justify-center p-8">
              {/* Floor highlight */}
              <div className="absolute bottom-10 w-96 h-12 bg-code-blue/30 blur-2xl rounded-full" />
              
              <motion.img 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                src="/images/character_ninja.png" 
                alt="Character Showcase" 
                className="relative z-10 w-full max-w-[450px] object-contain drop-shadow-[0_0_20px_rgba(0,243,255,0.4)]"
              />

              <div className="absolute bottom-8 left-8 z-20">
                <div className="bg-black/60 backdrop-blur-md border border-code-blue/30 px-4 py-2 rounded-xl flex items-center gap-3">
                  <div className="w-3 h-3 bg-code-blue rounded-full animate-pulse" />
                  <span className="font-gaming text-sm text-code-blue tracking-widest uppercase">EQUIPPED: CYBER NINJA</span>
                </div>
              </div>
            </div>

            {/* Right Column: Player Stats HUD */}
            <div className="w-1/2 p-10 flex flex-col justify-center relative z-10 bg-gradient-to-l from-black/80 to-transparent border-l border-white/5">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl font-gaming font-black mb-2 glow-text tracking-widest"
              >
                {username.toUpperCase()}
              </motion.h2>
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-code-gold/20 border border-code-gold/50 text-code-gold px-3 py-1 rounded text-sm font-bold tracking-widest uppercase flex items-center gap-2">
                  <Star className="w-4 h-4" /> LVL 42
                </span>
                <span className="bg-white/10 border border-white/20 text-gray-300 px-3 py-1 rounded text-sm font-bold tracking-widest uppercase">
                  ID: 80941235
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-black/50 border border-white/10 rounded-xl p-5 hover:border-code-blue/30 transition-all hover:bg-code-blue/5">
                  <div className="text-gray-400 text-xs tracking-widest uppercase mb-2 flex items-center gap-2">
                    <Medal className="w-4 h-4 text-code-gold" /> Rank Tier
                  </div>
                  <div className="text-2xl font-gaming font-bold text-white">Platinum IV</div>
                  <div className="w-full h-1 bg-black rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-code-blue to-code-purple w-[80%]" />
                  </div>
                </div>
                
                <div className="bg-black/50 border border-white/10 rounded-xl p-5 hover:border-code-purple/30 transition-all hover:bg-code-purple/5">
                  <div className="text-gray-400 text-xs tracking-widest uppercase mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4 text-code-purple" /> K/D Ratio (Wins)
                  </div>
                  <div className="text-2xl font-gaming font-bold text-white">68.5%</div>
                  <div className="text-sm text-gray-500 mt-1">1,245 Matches</div>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-xl p-5 hover:border-green-500/30 transition-all hover:bg-green-500/5 col-span-2">
                  <div className="text-gray-400 text-xs tracking-widest uppercase mb-2">Signature Ability</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-gaming font-bold text-green-400">RUNTIME ENHANCER</div>
                      <div className="text-sm text-gray-500">Increases coding speed visualization by 15% during Battle.</div>
                    </div>
                    <div className="w-12 h-12 rounded bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                      <Shield className="text-green-400 w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Character Selection Slider (Mock) */}
              <div>
                <h3 className="text-xs text-gray-400 tracking-widest uppercase mb-4">Select Avatar</h3>
                <div className="flex gap-4">
                  <button className="w-20 h-20 bg-code-blue/20 border-2 border-code-blue rounded-xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-code-blue/10 group-hover:bg-code-blue/30 transition-all" />
                    <img src="/images/character_ninja.png" alt="Ninja" className="w-full h-full object-cover origin-top scale-[2.0]" />
                  </button>
                  <button className="w-20 h-20 bg-black/40 border border-white/10 rounded-xl overflow-hidden relative group hover:border-code-purple/50 opacity-50 hover:opacity-100 transition-all">
                    <img src="/images/character_hacker.png" alt="Hacker" className="w-full h-full object-cover origin-top scale-[2.0]" />
                  </button>
                  <button className="w-20 h-20 bg-black/40 border border-white/10 border-dashed rounded-xl flex items-center justify-center text-gray-500 hover:text-white hover:border-white/50 transition-all group">
                    <span className="font-gaming text-2xl group-hover:scale-125 transition-transform">+</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
