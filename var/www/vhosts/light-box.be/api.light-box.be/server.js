const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Stockage des parties en cours
const games = new Map();

io.on('connection', (socket) => {
  const { gameId, playerNumber } = socket.handshake.query;
  
  console.log(`Player ${playerNumber} connected to game ${gameId}`);
  
  // Rejoindre une partie
  socket.join(gameId);
  
  // Initialiser ou récupérer l'état de la partie
  if (!games.has(gameId)) {
    games.set(gameId, {
      players: new Set([playerNumber]),
      gameState: null
    });
  } else {
    const game = games.get(gameId);
    game.players.add(playerNumber);
    
    // Si le deuxième joueur rejoint
    if (game.players.size === 2) {
      io.to(gameId).emit('player_joined', playerNumber);
    }
  }
  
  // Gérer les coups joués
  socket.on('play_card', ({ card, capturedCards }) => {
    const game = games.get(gameId);
    if (game) {
      // Mettre à jour l'état du jeu
      io.to(gameId).emit('game_state_update', {
        card,
        capturedCards,
        currentPlayer: playerNumber
      });
    }
  });
  
  // Gérer la déconnexion
  socket.on('disconnect', () => {
    const game = games.get(gameId);
    if (game) {
      game.players.delete(playerNumber);
      if (game.players.size === 0) {
        games.delete(gameId);
      }
      io.to(gameId).emit('player_left', playerNumber);
    }
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});