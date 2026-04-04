import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { socket } from '../socket';
import { Clock, Play, Zap } from 'lucide-react';

const DUMMY_PROBLEM = {
  title: "Two Sum Target",
  difficulty: "EASY",
  description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
  examples: [
    "Input: nums = [2,7,11,15], target = 9 \nOutput: [0,1]",
    "Input: nums = [3,2,4], target = 6 \nOutput: [1,2]"
  ]
};

const DEFAULT_CODE = `function twoSum(nums, target) {
  // Write your optimization code here...
  
}`;

export default function Battle() {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId, opponent } = location.state || { roomId: 'mock-1', opponent: { username: 'AI_Sniper' } };
  
  const [code, setCode] = useState(DEFAULT_CODE);
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins
  const [opponentProgress, setOppProgress] = useState(0);

  useEffect(() => {
    // Timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitCode();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Socket listeners
    socket.on('opponent_progress', (data) => {
      setOppProgress(data.progress);
    });

    socket.on('match_result', (data) => {
      navigate('/result', { state: { ...data, opponent } });
    });

    // Simulate opponent progress if we didn't receive actual updates (bot simulation)
    const botProgressTimer = setInterval(() => {
      setOppProgress(prev => {
        const next = prev + Math.random() * 5;
        if (next >= 95) return 95;
        return next;
        });
    }, 2500);

    return () => {
      clearInterval(timer);
      clearInterval(botProgressTimer);
      socket.off('opponent_progress');
      socket.off('match_result');
    };
  }, [navigate]);

  const handleEditorChange = (value) => {
    setCode(value);
    
    // Calculate simple progress based on length (mock)
    const diff = Math.min((value.length / 200) * 100, 100);
    socket.emit('update_progress', { roomId, progress: diff });
  };

  const submitCode = () => {
    socket.emit('submit_code', { roomId, code });
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-code-dark flex flex-col"
    >
      {/* Top HUD */}
      <div className="h-16 bg-black/60 border-b border-white/5 flex items-center justify-between px-6 z-10 shrink-0">
        <div className="flex items-center gap-4 w-1/3">
          <span className="font-gaming font-bold text-code-blue text-xl">YOU</span>
          {/* Your progress bar */}
          <div className="flex-1 h-3 bg-black/50 border border-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-code-blue shadow-[0_0_10px_#00f3ff] transition-all" 
              style={{ width: `${Math.min(code.length/2, 100)}%` }} 
            />
          </div>
        </div>

        {/* Timer Center */}
        <div className="flex items-center justify-center gap-2 px-6 py-2 bg-black/80 border border-code-gold/30 rounded-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-code-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Clock className={`w-5 h-5 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-code-gold'}`} />
          <span className={`font-gaming text-2xl font-bold tracking-widest ${timeLeft < 60 ? 'text-red-500' : 'text-code-gold glow-text-gold'}`}>
            {formatTime(timeLeft)}
          </span>
        </div>

        <div className="flex items-center gap-4 w-1/3 justify-end">
          {/* Opponent progress bar */}
          <div className="flex-1 h-3 bg-black/50 border border-white/10 rounded-full overflow-hidden flex justify-end">
            <div 
              className="h-full bg-red-500 shadow-[0_0_10px_#ef4444] transition-all" 
              style={{ width: `${opponentProgress}%` }} 
            />
          </div>
          <span className="font-gaming font-bold text-red-500 text-xl">{opponent?.username?.toUpperCase() || 'ENEMY'}</span>
        </div>
      </div>

      {/* Main Arena */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left pane: Problem */}
        <div className="w-1/3 border-r border-white/5 bg-black/30 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-gaming font-bold glow-text">{DUMMY_PROBLEM.title}</h1>
            <span className="text-xs font-bold px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded">
              {DUMMY_PROBLEM.difficulty}
            </span>
          </div>
          <div className="prose prose-invert max-w-none font-sans text-sm text-gray-300">
            <p className="whitespace-pre-wrap leading-relaxed">{DUMMY_PROBLEM.description}</p>
            <div className="mt-8 space-y-4">
              {DUMMY_PROBLEM.examples.map((ex, idx) => (
                <div key={idx} className="bg-black/60 p-4 rounded border border-white/5 font-mono text-xs whitespace-pre-wrap">
                  {ex}
                </div>
              ))}
            </div>
            
            {/* Simulated AI Rec */}
            <div className="mt-12 p-4 border border-code-purple/30 bg-code-purple/5 rounded-xl flex items-start gap-3">
              <Zap className="text-code-purple w-5 h-5 shrink-0 mt-1" />
              <div>
                <p className="text-xs text-code-purple font-bold mb-1 uppercase tracking-widest">AI Hint Module</p>
                <p className="text-xs text-gray-400">Remember to consider using a Map for optimal lookup performance (O(1)).</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right pane: Editor */}
        <div className="flex-1 flex flex-col pt-4 bg-[#1e1e1e]">
          <div className="flex-1 z-0 relative">
             <Editor
                height="100%"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={handleEditorChange}
                options={{
                  fontFamily: 'Inter',
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  lineNumbersMinChars: 3,
                  padding: { top: 16 }
                }}
              />
          </div>
          
          <div className="h-16 shrink-0 bg-black/80 border-t border-white/5 flex items-center justify-end px-6">
            <button 
              onClick={submitCode}
              className="flex items-center gap-2 px-8 py-3 bg-code-blue text-black font-gaming font-bold tracking-widest rounded hover:bg-white transition-all shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:shadow-[0_0_25px_rgba(0,243,255,0.8)]"
            >
              <Play className="w-4 h-4 fill-current" />
              DEPLOY CODE
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
