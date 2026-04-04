const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // For development MVP
    methods: ["GET", "POST"]
  }
});

// Basic Express routes
app.get('/', (req, res) => {
  res.send('CodeArena AI Backend is running.');
});

app.get('/api/daily-missions', (req, res) => {
  res.json([
    { id: 1, text: "Win 3 Matches", xp: 150, completed: false },
    { id: 2, text: "Play Squad Mode", xp: 100, completed: true },
    { id: 3, text: "Write 100 lines of code", xp: 50, completed: false },
  ]);
});

app.get('/api/leaderboard', (req, res) => {
  res.json([
    { id: 1, name: "KillerCoder99", rank: "Grandmaster", xp: 45000 },
    { id: 2, name: "NeonHacker", rank: "Diamond", xp: 32000 },
    { id: 3, name: "ReactNinja", rank: "Platinum", xp: 28500 },
    { id: 4, name: "You", rank: "Gold", xp: 15400 },
  ]);
});

// Socket.io Connection & Logic for MVP
let waitingPlayer = null;

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Find Match Logic
  socket.on('find_match', (data) => {
    console.log(`Player ${data.username} is finding a match...`);
    
    if (waitingPlayer) {
      // Room matching
      const roomId = `room-${Date.now()}`;
      
      // Join both to the same room
      socket.join(roomId);
      waitingPlayer.socket.join(roomId);

      // Tell both players the match is started (after a simulated 2 seconds delay)
      setTimeout(() => {
        io.to(roomId).emit('match_found', {
          roomId,
          opponent: { username: waitingPlayer.username, rank: 'Platinum' }
        });
        waitingPlayer = null;
      }, 2000);
    } else {
      waitingPlayer = { socket, username: data.username };
      
      // If no opponent connects within 3 seconds, simulate an AI/bot opponent joining
      setTimeout(() => {
        if (waitingPlayer && waitingPlayer.socket.id === socket.id) {
          const roomId = `room-bot-${Date.now()}`;
          socket.join(roomId);
          
          socket.emit('match_found', {
            roomId,
            opponent: { username: 'AI_Sniper_Bot', rank: 'Diamond' }
          });
          waitingPlayer = null;
        }
      }, 3000);
    }
  });

  // Battle Logic (Typing/Progress updates)
  socket.on('update_progress', (data) => {
    // data = { roomId, progress: percent }
    socket.to(data.roomId).emit('opponent_progress', { progress: data.progress });
  });

  // Code Submit Logic
  socket.on('submit_code', (data) => {
    // data = { roomId, code }
    // Instantly declare win to the submitter and loss to the other
    socket.emit('match_result', { result: 'win', xpEarned: 100 });
    socket.to(data.roomId).emit('match_result', { result: 'lose', xpEarned: 10 });
  });

  // Squad Chat Logic
  socket.on('send_squad_message', (data) => {
    io.emit('receive_squad_message', {
      id: Date.now(),
      sender: data.sender,
      text: data.text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    if (waitingPlayer && waitingPlayer.socket.id === socket.id) {
      waitingPlayer = null;
    }
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
