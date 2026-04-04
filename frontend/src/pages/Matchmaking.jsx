import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { socket } from '../socket';

export default function Matchmaking() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('FINDING OPPONENT...');
  const [matchFound, setMatchFound] = useState(false);
  const [opponent, setOpponent] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('CA_USERNAME') || 'Guest';

    // Start matchmaking process
    socket.emit('find_match', { username });

    socket.on('match_found', (data) => {
      setMatchFound(true);
      setStatus('MATCH FOUND!');
      setOpponent(data.opponent);
      
      // Navigate to battle after brief pause
      setTimeout(() => {
        navigate('/battle', { state: { roomId: data.roomId, opponent: data.opponent } });
      }, 2000);
    });

    return () => {
      socket.off('match_found');
    };
  }, [navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center relative bg-code-dark"
    >
      {/* Background Pulse */}
      {!matchFound && (
        <>
          <motion.div 
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
            className="absolute rounded-full w-48 h-48 border border-code-blue"
          />
          <motion.div 
            animate={{ scale: [1, 3], opacity: [0.3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="absolute rounded-full w-48 h-48 border border-code-blue"
          />
        </>
      )}

      {/* VS Screen / Opponent Animation */}
      <div className="z-10 text-center flex flex-col items-center">
        {!matchFound ? (
          <>
            <div className="w-24 h-24 border-4 border-t-code-blue border-r-code-blue border-b-transparent border-l-transparent rounded-full animate-spin mb-8" />
            <h2 className="text-3xl font-gaming font-bold tracking-widest text-code-blue glow-text animate-pulse">
              {status}
            </h2>
            <p className="text-gray-400 mt-4 max-w-sm">
              Estimated Time: 0:02<br/>
              Searching in your skill bracket (Platinum)...
            </p>
          </>
        ) : (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-5xl font-gaming font-bold tracking-widest text-code-gold glow-text-gold mb-12">
              {status}
            </h2>
            
            <div className="flex items-center gap-12 font-gaming">
              {/* You */}
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-code-panel border-2 border-code-blue flex items-center justify-center rounded-xl rotate-45 mb-8">
                  <div className="-rotate-45 text-2xl font-bold">YOU</div>
                </div>
                <div className="text-xl text-code-blue glow-text">
                  {localStorage.getItem('CA_USERNAME') || 'Guest'}
                </div>
              </div>
              
              <div className="text-4xl text-gray-500 font-bold italic">VS</div>
              
              {/* Opponent */}
              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="w-32 h-32 bg-code-panel border-2 border-red-500 flex items-center justify-center rounded-xl rotate-45 mb-8 shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                  <div className="-rotate-45 text-2xl font-bold">LVL ??</div>
                </div>
                <div className="text-xl text-red-500 text-shadow-[0_0_10px_rgba(239,68,68,0.7)] font-bold">
                  {opponent?.username || 'Opponent'}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
