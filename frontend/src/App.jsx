import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { socket } from './socket';

import Auth from './pages/Auth';
import Lobby from './pages/Lobby';
import Matchmaking from './pages/Matchmaking';
import Battle from './pages/Battle';
import Result from './pages/Result';
import Squad from './pages/Squad';
import Training from './pages/Training';

// Animated wrapper to handle page transitions properly
const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Auth />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/matchmaking" element={<Matchmaking />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/result" element={<Result />} />
        <Route path="/squad" element={<Squad />} />
        <Route path="/training" element={<Training />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.connect();

    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.disconnect();
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen max-w-[100vw] text-white flex flex-col font-sans">
        <AppRoutes />
        
        {/* Simple connection status overlay */}
        {!isConnected && (
          <div className="fixed bottom-2 right-2 text-xs text-red-500 bg-black/50 px-2 py-1 rounded">
            Disconnected from Server
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
