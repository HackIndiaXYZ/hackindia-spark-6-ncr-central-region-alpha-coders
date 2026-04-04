import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Target, Database, Hash, Repeat, ChevronRight, Crosshair, Zap, Code, Terminal, AlertTriangle } from 'lucide-react';

const TOPICS = [
  { id: 'arrays', title: 'ARRAYS', icon: Database, color: 'border-code-blue text-code-blue', bg: 'bg-code-blue' },
  { id: 'strings', title: 'STRINGS', icon: Hash, color: 'border-code-purple text-code-purple', bg: 'bg-code-purple' },
  { id: 'loops', title: 'LOOPS', icon: Repeat, color: 'border-green-500 text-green-500', bg: 'bg-green-500' },
  { id: 'functions', title: 'FUNCTIONS', icon: Target, color: 'border-code-gold text-code-gold', bg: 'bg-code-gold' },
];

const PROBLEMS = {
  arrays: [
    { id: 'arr-01', title: 'Two Sum Target', difficulty: 'EASY', xp: 50 },
    { id: 'arr-02', title: 'Best Time to Buy Stock', difficulty: 'EASY', xp: 60 },
    { id: 'arr-03', title: 'Contains Duplicate', difficulty: 'EASY', xp: 50 },
    { id: 'arr-04', title: 'Missing Number', difficulty: 'EASY', xp: 60 },
    { id: 'arr-05', title: 'Move Zeroes', difficulty: 'EASY', xp: 55 },
    { id: 'arr-06', title: 'Maximum Subarray', difficulty: 'NORMAL', xp: 120 },
    { id: 'arr-07', title: 'Product of Array Except Self', difficulty: 'NORMAL', xp: 150 },
    { id: 'arr-08', title: 'Merge Sorted Array', difficulty: 'NORMAL', xp: 110 },
    { id: 'arr-09', title: '3Sum', difficulty: 'NORMAL', xp: 180 },
    { id: 'arr-10', title: 'Container With Most Water', difficulty: 'NORMAL', xp: 160 },
    { id: 'arr-11', title: 'Rotate Array', difficulty: 'NORMAL', xp: 130 },
    { id: 'arr-12', title: 'Find the Duplicate Number', difficulty: 'NORMAL', xp: 150 },
    { id: 'arr-13', title: 'Search in Rotated Sorted Array', difficulty: 'HARD', xp: 250 },
    { id: 'arr-14', title: 'First Missing Positive', difficulty: 'HARD', xp: 300 },
    { id: 'arr-15', title: 'Median of Two Sorted Arrays', difficulty: 'HARD', xp: 400 },
  ],
  strings: [
    { id: 'str-01', title: 'Valid Palindrome', difficulty: 'EASY', xp: 50 },
    { id: 'str-02', title: 'Valid Anagram', difficulty: 'EASY', xp: 55 },
    { id: 'str-03', title: 'Reverse String', difficulty: 'EASY', xp: 40 },
    { id: 'str-04', title: 'Longest Common Prefix', difficulty: 'EASY', xp: 60 },
    { id: 'str-05', title: 'Valid Parentheses', difficulty: 'EASY', xp: 80 },
    { id: 'str-06', title: 'Isomorphic Strings', difficulty: 'EASY', xp: 75 },
    { id: 'str-07', title: 'Longest Substring Without Repeat', difficulty: 'NORMAL', xp: 150 },
    { id: 'str-08', title: 'Longest Palindromic Substring', difficulty: 'NORMAL', xp: 180 },
    { id: 'str-09', title: 'Group Anagrams', difficulty: 'NORMAL', xp: 140 },
    { id: 'str-10', title: 'String to Integer (atoi)', difficulty: 'NORMAL', xp: 130 },
    { id: 'str-11', title: 'Find All Anagrams', difficulty: 'NORMAL', xp: 160 },
    { id: 'str-12', title: 'Minimum Window Substring', difficulty: 'HARD', xp: 300 },
    { id: 'str-13', title: 'Wildcard Matching', difficulty: 'HARD', xp: 350 },
    { id: 'str-14', title: 'Regular Expression Matching', difficulty: 'HARD', xp: 450 },
  ],
  loops: [
    { id: 'loop-01', title: 'Fibonacci Sequence', difficulty: 'EASY', xp: 50 },
    { id: 'loop-02', title: 'Factorial Computation', difficulty: 'EASY', xp: 45 },
    { id: 'loop-03', title: 'Reverse Integer', difficulty: 'EASY', xp: 60 },
    { id: 'loop-04', title: 'Palindrome Number', difficulty: 'EASY', xp: 55 },
    { id: 'loop-05', title: 'Prime Number Checker', difficulty: 'EASY', xp: 70 },
    { id: 'loop-06', title: 'Greatest Common Divisor', difficulty: 'NORMAL', xp: 110 },
    { id: 'loop-07', title: 'FizzBuzz Protocol', difficulty: 'NORMAL', xp: 100 },
    { id: 'loop-08', title: 'Perfect Number Verification', difficulty: 'NORMAL', xp: 120 },
    { id: 'loop-09', title: 'Count Primes Extract', difficulty: 'NORMAL', xp: 150 },
    { id: 'loop-10', title: 'Armstrong Number Search', difficulty: 'NORMAL', xp: 140 },
    { id: 'loop-11', title: 'Complex Pattern Generator', difficulty: 'HARD', xp: 250 },
  ],
  functions: [
    { id: 'func-01', title: 'Custom Array Map', difficulty: 'EASY', xp: 80 },
    { id: 'func-02', title: 'Custom Array Filter', difficulty: 'EASY', xp: 80 },
    { id: 'func-03', title: 'Debounce Execution', difficulty: 'NORMAL', xp: 150 },
    { id: 'func-04', title: 'Throttle Execution', difficulty: 'NORMAL', xp: 150 },
    { id: 'func-05', title: 'Memoize Cache', difficulty: 'NORMAL', xp: 180 },
    { id: 'func-06', title: 'Curry Function Wrapper', difficulty: 'NORMAL', xp: 160 },
    { id: 'func-07', title: 'Function Composition Pipe', difficulty: 'NORMAL', xp: 170 },
    { id: 'func-08', title: 'Limit Async Calls', difficulty: 'HARD', xp: 300 },
    { id: 'func-09', title: 'Event Emitter Hub', difficulty: 'HARD', xp: 280 },
    { id: 'func-10', title: 'Promise.all Polyfill', difficulty: 'HARD', xp: 350 },
  ],
};

const getDifficultyColor = (diff) => {
  if (diff === 'EASY') return 'text-green-400 border-green-400/50 bg-green-400/10 shadow-[0_0_10px_rgba(74,222,128,0.2)]';
  if (diff === 'NORMAL') return 'text-code-gold border-code-gold/50 bg-code-gold/10 shadow-[0_0_10px_rgba(251,191,36,0.2)]';
  return 'text-red-500 border-red-500/50 bg-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.2)]';
};

export default function Training() {
  const navigate = useNavigate();
  const [activeTopic, setActiveTopic] = useState('arrays');
  const [selectedProblem, setSelectedProblem] = useState(null);

  const handleTopicSwitch = (topicId) => {
    setActiveTopic(topicId);
    setSelectedProblem(null);
  };

  const handleSelectProblem = (prob) => {
    setSelectedProblem(prob);
  };

  const handleLaunchMission = () => {
    if (!selectedProblem) return;
    navigate('/battle', { 
      state: { 
        roomId: `training-${selectedProblem.id}`, 
        opponent: { username: 'TRAINING_BOT', rank: 'Unranked' },
        problemTitle: selectedProblem.title
      } 
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-code-darker text-white p-6 md:p-8 overflow-hidden relative font-sans"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
      <div className="bg-scanline opacity-30 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto relative z-10 h-[calc(100vh-4rem)] flex flex-col">
        {/* Header HUD */}
        <div className="flex items-center gap-6 mb-6">
          <button 
            onClick={() => navigate('/lobby')}
            className="flex items-center justify-center p-3 border border-white/20 bg-black/50 hover:bg-white/10 hover:border-white/50 transition-all clip-slant text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex-1 border-b border-white/10 pb-2">
            <h1 className="text-4xl md:text-5xl font-gaming font-black tracking-widest uppercase italic drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              TRAINING <span className="text-code-blue drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]">GROUNDS</span>
            </h1>
            <p className="text-gray-400 font-mono text-sm tracking-widest uppercase mt-1">
              Hone your skills before entering the Arena
            </p>
          </div>
        </div>

        {/* 3-Pane Layout */}
        <div className="flex flex-1 gap-6 w-full h-[calc(100%-80px)]">
          
          {/* LEFT: Topics Sidebar */}
          <div className="w-[260px] flex flex-col gap-3">
            <div className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-1 flex items-center gap-2">
              <Database className="w-4 h-4" /> Sector Select
            </div>
            {TOPICS.map(topic => {
              const Icon = topic.icon;
              const isActive = activeTopic === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => handleTopicSwitch(topic.id)}
                  className={`relative p-4 text-left border-l-[4px] transition-all overflow-hidden group clip-slant shadow-lg flex items-center justify-between ${
                    isActive 
                    ? `bg-black/60 border-l-[8px] ${topic.color} shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]` 
                    : `bg-black/40 border-transparent hover:bg-white/5 hover:border-white/20`
                  }`}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <Icon className={`w-5 h-5 ${isActive ? '' : 'text-gray-500 group-hover:text-gray-300 transition-colors'}`} />
                    <span className={`font-gaming font-bold text-lg tracking-widest ${isActive ? 'drop-shadow-[0_0_5px_currentColor]' : 'text-gray-400 group-hover:text-white transition-colors'}`}>
                      {topic.title}
                    </span>
                  </div>
                  {isActive && <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-current to-transparent opacity-10" />}
                </button>
              )
            })}
          </div>

          {/* CENTER: Problem List Window */}
          <div className="flex-[1.5] bg-black/60 border border-white/10 backdrop-blur-md clip-slant flex flex-col overflow-hidden relative shadow-2xl">
            {/* Header */}
            <div className="bg-black/80 px-5 py-3 border-b border-white/10 flex justify-between items-center z-10">
              <div className="flex items-center gap-3 text-gray-300">
                <Terminal className="w-4 h-4" />
                <span className="font-gaming font-bold tracking-widest">SECTOR.DB // {activeTopic.toUpperCase()}</span>
              </div>
              <span className="text-[10px] font-bold bg-white/10 px-3 py-1 clip-slant uppercase text-gray-300">
                {PROBLEMS[activeTopic].length} OP CODES FOUND
              </span>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {PROBLEMS[activeTopic].map((prob, i) => {
                  const isSelected = selectedProblem?.id === prob.id;
                  return (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.03, duration: 0.2 }}
                      key={prob.id}
                      onClick={() => handleSelectProblem(prob)}
                      className={`group border transition-all cursor-crosshair clip-slant flex items-center justify-between p-4 relative overflow-hidden ${
                        isSelected 
                        ? 'border-code-blue bg-code-blue/10' 
                        : 'border-white/10 bg-black/40 hover:bg-white/5 hover:border-gray-400'
                      }`}
                    >
                      {/* Hover / Selected Glow Effect */}
                      <div className={`absolute inset-0 transition-opacity duration-300 ${isSelected ? 'opacity-100 bg-[url("https://www.transparenttextures.com/patterns/cubes.png")] origin-center scale-110 opacity-30 mix-blend-overlay' : 'opacity-0'}`} />
                      
                      <div className="relative z-10">
                        <div className="flex text-[9px] sm:text-[10px] items-center gap-2 sm:gap-3 font-bold tracking-widest uppercase mb-1">
                          <span className={`transition-colors ${isSelected ? 'text-code-blue' : 'text-gray-500'}`}>
                            {prob.id}
                          </span>
                          <span className={`px-2 py-0.5 clip-slant border ${getDifficultyColor(prob.difficulty)}`}>
                            {prob.difficulty}
                          </span>
                        </div>
                        <h3 className={`font-gaming font-bold text-lg sm:text-xl transition-all ${isSelected ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-gray-200 group-hover:text-white'}`}>
                          {prob.title}
                        </h3>
                      </div>

                      <div className="relative z-10 flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <div className="font-gaming font-bold text-code-blue text-sm sm:text-base">+{prob.xp} XP</div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Mission Briefing Panel */}
          <div className="flex-1 flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {selectedProblem ? (
                <motion.div
                  key={selectedProblem.id}
                  initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 bg-code-dark border border-white/20 clip-slant flex flex-col relative overflow-hidden backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                >
                  {/* Holographic background elements */}
                  <div className="absolute -top-32 -right-32 w-64 h-64 bg-code-blue/20 rounded-full blur-[80px] pointer-events-none" />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-[0.03] pointer-events-none" />
                  
                  {/* Briefing Header */}
                  <div className="p-6 border-b border-white/10 relative z-10 bg-black/40">
                    <div className="flex items-center gap-2 text-code-blue mb-3 text-xs uppercase font-bold tracking-widest">
                      <Crosshair className="w-4 h-4 animate-pulse" />
                      Mission Briefing Confirmed
                    </div>
                    <h2 className="text-3xl font-gaming font-bold uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                      {selectedProblem.title}
                    </h2>
                    <div className="flex gap-4 mt-4">
                      <div className="flex items-center gap-2 bg-black/50 px-3 py-1.5 border border-white/10 clip-slant font-mono text-sm">
                        <AlertTriangle className={`w-4 h-4 ${
                          selectedProblem.difficulty === 'HARD' ? 'text-red-500' : selectedProblem.difficulty === 'NORMAL' ? 'text-code-gold' : 'text-green-400'
                        }`} />
                        <span className={getDifficultyColor(selectedProblem.difficulty).split(' ')[0]}>
                          {selectedProblem.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-black/50 px-3 py-1.5 border border-white/10 clip-slant font-mono text-sm text-code-blue">
                        <Zap className="w-4 h-4" />
                        {selectedProblem.xp} XP YIELD
                      </div>
                    </div>
                  </div>

                  {/* Briefing Content */}
                  <div className="p-6 flex-1 text-gray-300 font-mono text-sm leading-relaxed relative z-10">
                    <p className="mb-4 text-gray-400">
                      &gt; INCOMING TRANSMISSION...<br />
                      &gt; DECRYPTING TASK SPECIFICATIONS...<br />
                      &gt; STATUS: <span className="text-green-400">READY</span>
                    </p>
                    <p>
                      Operative, your objective in this scenario is to compute the optimal logic sequence for the <strong className="text-white">"{selectedProblem.title}"</strong> algorithm.
                    </p>
                    <div className="my-6 p-4 border border-white/10 bg-black/50 clip-slant shadow-inner">
                      <div className="flex items-center gap-2 text-gray-500 uppercase text-xs mb-2">
                        <Code className="w-4 h-4" />
                        Parameters
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-gray-400">
                        <li>Time Complexity must be optimal.</li>
                        <li>Space Complexity constraints are active.</li>
                        <li>Edge cases will be tested vigorously by the AI.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-6 pt-0 relative z-10 mt-auto">
                    <button
                      onClick={handleLaunchMission}
                      className="w-full relative group overflow-hidden bg-code-blue text-black font-gaming font-bold text-2xl py-4 clip-slant transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_40px_rgba(0,255,255,0.7)]"
                    >
                      <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-[shimmer_1s_infinite] skew-x-12" />
                      <div className="flex items-center justify-center gap-3">
                        <Crosshair className="w-6 h-6 animate-[spin_3s_linear_infinite]" />
                        LAUNCH MISSION
                      </div>
                    </button>
                    <div className="text-center text-[10px] text-gray-500 uppercase mt-3 font-mono tracking-widest">
                      * Initiating mission simulates live combat scenario *
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 bg-black/40 border border-white/10 clip-slant border-dashed flex flex-col items-center justify-center text-gray-600 gap-4"
                >
                  <Target className="w-16 h-16 opacity-50" />
                  <div className="font-gaming font-bold tracking-widest text-xl">AWAITING SELECTION</div>
                  <div className="text-xs uppercase font-mono w-48 text-center">
                    Select a mission from the central console to view its briefing data.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

