import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Users, Swords, Trophy, Target, Sparkles, AlertTriangle, Hexagon } from 'lucide-react';
import ProfileModal from '../components/ProfileModal';

export default function Lobby() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('Guest');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  useEffect(() => {
    const stored = localStorage.getItem('CA_USERNAME');
    if (stored) setUsername(stored);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };
  
  const itemRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="relative w-[100vw] h-[100vh] bg-code-darker overflow-hidden">
      
      {/* Dynamic Environment Layers */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-20 pointer-events-none" />
      <div className="bg-scanline" />
      <div className="ambient-glow" />
      
      {/* CENTER STAGE AVATAR */}
      <div className="absolute inset-x-0 bottom-0 top-[10%] flex justify-center pointer-events-none z-0">
        <div className="relative w-full max-w-2xl h-full flex items-end justify-center">
          {/* Floor Ring Graphic */}
          <div className="absolute bottom-[5%] w-[80%] h-32 rounded-[100%] border-4 border-code-blue/30 shadow-[0_0_50px_rgba(0,243,255,0.4)]" style={{ transform: "rotateX(75deg)" }} />
          <motion.img 
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            src="/images/character_hacker.png" 
            alt="Current Character" 
            className="h-[120%] object-contain object-bottom animate-float drop-shadow-[0_0_20px_rgba(176,38,255,0.6)]"
          />
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 flex justify-between px-8 py-6 z-10"
      >
        
        {/* ================= LEFT HUD (Profile & Missions) ================= */}
        <div className="w-[380px] h-full flex flex-col gap-6 pointer-events-auto hud-left group/hud text-white">
          
          {/* Profile Card (Interactive) */}
          <motion.div variants={itemLeft} onClick={() => setIsProfileOpen(true)} className="clip-slant-heavy bg-black/60 backdrop-blur-md border-[2px] border-l-[6px] border-white/10 border-l-code-purple p-4 cursor-pointer hover:bg-white/10 hover:border-l-[10px] transition-all relative overflow-hidden group">
            <div className="absolute inset-0 bg-code-purple/0 group-hover:bg-code-purple/10 transition-colors" />
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 clip-slant bg-code-darker border border-code-purple flex items-center justify-center shadow-[0_0_15px_rgba(176,38,255,0.5)]">
                <Hexagon className="w-8 h-8 text-code-purple" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-gaming font-black uppercase tracking-widest text-white group-hover:text-code-purple transition-colors drop-shadow-[0_0_5px_black]">{username}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] bg-code-gold text-black px-2 py-[2px] font-bold tracking-widest uppercase clip-slant">LVL 42</span>
                  <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest bg-black/50 px-2 py-[2px] border border-white/20 clip-slant">PLATINUM IV</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemLeft} className="flex-1 max-h-[500px]" />

          {/* Daily Ops / Missions */}
          <motion.div variants={itemLeft} className="clip-slant-heavy bg-black/60 backdrop-blur border border-white/10 p-5 relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-code-gold/10 blur-xl" />
            <h3 className="flex items-center gap-2 font-gaming text-xl font-black text-code-gold glow-text-gold-heavy mb-6 uppercase tracking-widest border-b border-white/10 pb-2">
              <AlertTriangle className="w-5 h-5 text-code-gold animate-pulse" /> DAILY OPS
            </h3>
            <div className="space-y-4">
              {[
                { txt: 'ANNIHILATE 3 OPPONENTS', xp: 150, p: 66, c: 'text-code-gold', bg: 'bg-code-gold' },
                { txt: 'SQUAD ZONE TACTICS', xp: 100, p: 0, c: 'text-code-blue', bg: 'bg-code-blue' },
              ].map((m, i) => (
                <div key={i} className="group/op cursor-pointer">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-xs font-bold text-gray-300 group-hover/op:text-white transition-colors">{m.txt}</span>
                    <span className={`text-[10px] font-black ${m.c}`}>+{m.xp} XP</span>
                  </div>
                  <div className="w-full h-2 bg-black/80 clip-slant border border-white/5 overflow-hidden">
                    <div className={`h-full ${m.bg} shadow-[0_0_10px_currentColor]`} style={{width: `${m.p}%`}} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>


        {/* ================= RIGHT HUD (Play & Leaderboard) ================= */}
        <div className="w-[420px] h-full flex flex-col gap-6 justify-end pointer-events-auto hud-right pb-10">
          
          {/* Start Match Button (Massive Focus) */}
          <motion.div variants={itemRight} className="flex flex-col gap-3">
            <h1 className="font-gaming text-6xl font-black text-white italic tracking-tighter text-right drop-shadow-[2px_4px_0px_#000]">
              RANKED
            <br/><span className="text-code-blue glow-text-heavy">BATTLE</span>
            </h1>

            <button 
              onClick={() => navigate('/matchmaking')} 
              className="mt-6 clip-slant-heavy w-full h-24 bg-code-blue relative overflow-hidden group hover:scale-[1.02] transition-transform duration-200"
            >
              {/* Animated Button FX */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-[800ms]" />
              <div className="absolute pointer-events-none inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-multiply" />
              
              <div className="relative h-full flex items-center justify-between px-8">
                <span className="text-4xl font-gaming font-black text-black tracking-widest italic group-hover:tracking-[0.4em] transition-all duration-300 btn-glitch">
                  START
                </span>
                <Swords className="w-12 h-12 text-black fill-transparent stroke-2 group-hover:rotate-12 transition-transform drop-shadow-[0_0_5px_white]" />
              </div>
            </button>
          </motion.div>

          {/* Mode Quick Select */}
          <motion.div variants={itemRight} className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => navigate('/squad')}
              className="clip-slant h-16 bg-black/80 border-[1px] border-white/10 border-r-[4px] border-r-code-purple hover:bg-white/10 hover:border-r-[8px] transition-all flex items-center justify-between px-4 group"
            >
              <span className="font-gaming font-bold text-gray-400 group-hover:text-code-purple uppercase tracking-wider">SQUAD</span>
              <Users className="w-5 h-5 text-gray-500 group-hover:text-code-purple" />
            </button>
            <button 
              onClick={() => navigate('/training')}
              className="clip-slant h-16 bg-black/80 border-[1px] border-white/10 border-r-[4px] border-r-green-500 hover:bg-white/10 hover:border-r-[8px] transition-all flex items-center justify-between px-4 group"
            >
              <span className="font-gaming font-bold text-gray-400 group-hover:text-green-500 uppercase tracking-wider">TRAINING</span>
              <Target className="w-5 h-5 text-gray-500 group-hover:text-green-500" />
            </button>
          </motion.div>

          {/* Leaderboards List */}
          <motion.div variants={itemRight} className="clip-slant-heavy bg-black/60 backdrop-blur border border-white/10 p-5 mt-4">
            <h3 className="flex justify-between items-center font-gaming text-sm font-black text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2">
              <span className="text-gray-400">GLOBAL LEADERBOARD</span>
              <Trophy className="w-4 h-4 text-code-gold" />
            </h3>
            <div className="space-y-1">
              {['KillerCoder99', 'NeonHacker', 'ReactNinja', 'You'].map((p, i) => (
                <div key={i} className="flex flex-col group/player cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`font-gaming font-black ${i === 0 ? 'text-code-gold glow-text-gold' : i === 1 ? 'text-gray-300' : i === 3 ? 'text-code-blue' : 'text-orange-400'}`}>
                        {i === 3 ? '42' : `0${i+1}`}
                      </span>
                      <span className={`text-sm font-bold tracking-widest uppercase ${i===3?'text-code-blue':'text-gray-200'}`}>{p}</span>
                    </div>
                    <span className="text-[10px] px-2 py-1 bg-black/50 border border-white/10 text-gray-400 font-bold tracking-widest uppercase clip-slant">
                      {i===3?'PLATINUM':'GRNDMSTR'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
      
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        username={username} 
      />
    </div>
  );
}
