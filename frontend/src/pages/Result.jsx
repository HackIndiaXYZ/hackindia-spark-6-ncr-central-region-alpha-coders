import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, xpEarned, opponent } = location.state || { result: 'win', xpEarned: 100, opponent: { username: 'AI_Sniper' } };

  const isWin = result === 'win';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-code-dark`}
    >
      {/* Background FX dependent on win/lose */}
      <div className={`absolute inset-0 opacity-20 ${isWin ? 'bg-code-gold' : 'bg-red-500'}`} style={{ mixBlendMode: 'overlay' }} />
      <div className="absolute top-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10" />

      {/* Confetti / Defeat overlay layer */}
      {isWin && (
        <motion.div 
          animate={{ y: [0, 1000] }} 
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 pointer-events-none"
        >
          {Array.from({ length: 50 }).map((_, i) => (
             <div 
               key={i} 
               className="absolute w-2 h-2 bg-code-gold" 
               style={{ 
                 left: `${Math.random() * 100}%`,
                 top: `${-10 - (Math.random() * 100)}%`,
                 transform: `rotate(${Math.random() * 360}deg)`,
               }}
             />
          ))}
        </motion.div>
      )}

      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="glass-panel p-12 text-center z-10 w-full max-w-xl"
      >
        <h1 className={`text-6xl font-gaming font-black mb-2 tracking-widest ${isWin ? 'text-code-gold glow-text-gold' : 'text-red-500 text-shadow-[0_0_15px_rgba(239,68,68,0.8)]'}`}>
          {isWin ? 'VICTORY' : 'DEFEAT'}
        </h1>
        <p className="text-gray-400 mb-8 uppercase tracking-widest text-sm">
          Against {opponent?.username}
        </p>

        <div className="bg-black/50 border border-white/10 rounded-xl py-6 px-4 mb-8">
          <div className="text-sm text-gray-400 mb-2 uppercase tracking-widest">XP Earned</div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className={`text-4xl font-gaming font-bold ${isWin ? 'text-code-blue glow-text' : 'text-white'}`}
          >
            +{xpEarned} XP
          </motion.div>
          
          {/* Rank progress visual */}
          <div className="mt-8 text-left">
            <div className="flex justify-between text-xs text-gray-400 mb-2 font-bold uppercase tracking-widest">
              <span>Platinum IV</span>
              <span>Platinum III</span>
            </div>
            <div className="h-2 w-full bg-black rounded-full overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 bg-code-purple w-3/4 opacity-50" />
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: isWin ? '15%' : '2%' }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute inset-y-0 left-[75%] bg-code-blue shadow-[0_0_10px_#00f3ff]"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/lobby')}
          className="w-full bg-white/5 border border-white/20 text-white font-gaming font-bold tracking-widest py-4 rounded hover:bg-white/10 transition-colors"
        >
          RETURN TO LOBBY
        </button>
      </motion.div>
    </motion.div>
  );
}
