import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Send, Mic, MicOff, Home, Crown } from 'lucide-react';
import { socket } from '../socket';

export default function Squad() {
  const navigate = useNavigate();
  const username = localStorage.getItem('CA_USERNAME') || 'Guest';
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isMuted, setIsMuted] = useState(true);

  const teamMembers = [
    { name: username, isLeader: true, ready: true, pfp: 'bg-code-blue' },
    { name: 'NinjaCoder', isLeader: false, ready: true, pfp: 'bg-purple-500' },
    { name: 'Waiting...', isLeader: false, ready: false, pfp: 'bg-gray-800 border-dashed border-2 border-gray-600' },
    { name: 'Waiting...', isLeader: false, ready: false, pfp: 'bg-gray-800 border-dashed border-2 border-gray-600' }
  ];

  useEffect(() => {
    socket.on('receive_squad_message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('receive_squad_message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      socket.emit('send_squad_message', { sender: username, text: input });
      setInput('');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col bg-code-dark pt-6 px-4"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8 px-4">
        <button onClick={() => navigate('/lobby')} className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
          <Home className="w-5 h-5" /> Back to Lobby
        </button>
        <h1 className="text-3xl font-gaming font-bold tracking-widest text-code-purple glow-text-purple flex items-center gap-3">
          <Users className="w-8 h-8" />
          SQUAD ZONE
        </h1>
        <div className="w-24"></div> {/* Spacer for centering */}
      </div>

      <div className="flex-1 flex gap-6 max-w-6xl mx-auto w-full pb-6">
        
        {/* Team List */}
        <div className="w-2/3 flex flex-col gap-4">
          <div className="glass-panel p-6 flex-1 bg-code-panel/80">
            <h2 className="font-gaming font-bold text-xl mb-6 flex items-center gap-2 tracking-widest uppercase text-white/80">
              Your Team (2/4)
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              {teamMembers.map((member, i) => (
                <div key={i} className={`p-4 rounded-xl border ${member.ready ? 'border-code-blue/30 bg-black/40' : 'border-gray-800 bg-black/20'} flex items-center gap-4`}>
                  <div className={`w-16 h-16 rounded-lg ${member.pfp} flex items-center justify-center shrink-0`}>
                    {!member.ready && <span className="text-2xl text-gray-600">?</span>}
                    {member.ready && <span className="text-2xl font-bold">{member.name[0]}</span>}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-bold font-gaming overflow-hidden text-ellipsis ${member.ready ? 'text-white' : 'text-gray-600'}`}>{member.name}</h3>
                      {member.isLeader && <Crown className="w-4 h-4 text-code-gold" />}
                    </div>
                    <div className={`text-xs uppercase tracking-widest font-bold ${member.ready ? 'text-code-blue' : 'text-gray-600'}`}>
                      {member.ready ? 'Ready' : 'Open Slot'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded font-gaming font-bold tracking-widest transition-all ${isMuted ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30'}`}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              {isMuted ? 'VOICE MUTED' : 'VOICE ACTIVE'}
            </button>
            <button className="flex-[2] bg-code-purple text-white font-gaming font-bold tracking-widest py-4 rounded hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(176,38,255,0.4)]">
              START SQUAD MATCH
            </button>
          </div>
        </div>

        {/* Chat */}
        <div className="w-1/3 flex flex-col">
          <div className="glass-panel flex-1 flex flex-col overflow-hidden bg-code-panel/90 text-sm">
            <div className="bg-black/40 p-4 border-b border-white/5 font-gaming font-bold text-center tracking-widest text-gray-300">
              TEAM CHAT
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center italic mt-10 text-xs">No messages yet. Say hello!</p>
              ) : (
                messages.map((m, i) => (
                  <div key={m.id || i} className={`flex flex-col ${m.sender === username ? 'items-end' : 'items-start'}`}>
                    <span className={`text-[10px] mb-1 font-bold tracking-wider uppercase ${m.sender === username ? 'text-code-blue' : 'text-code-purple'}`}>
                      {m.sender} <span className="text-gray-600 font-normal ml-1">{m.time}</span>
                    </span>
                    <div className={`px-3 py-2 rounded-lg max-w-[85%] ${m.sender === username ? 'bg-code-blue/20 text-blue-50 rounded-tr-none' : 'bg-white/10 text-gray-200 rounded-tl-none'}`}>
                      {m.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={sendMessage} className="p-3 bg-black/60 border-t border-white/5 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-transparent border-none focus:outline-none text-white px-2 placeholder-gray-600"
              />
              <button type="submit" className="text-code-blue hover:text-white p-2 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
