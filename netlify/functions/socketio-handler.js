const { Server } = require('socket.io');
const { createServer } = require('http');
const gameService = require('./services/gameService');

exports.handler = async (event, context) => {
  const httpServer = createServer();
  const io = new Server(httpServer, {
    cors: {
      origin: "https://onzegame.com",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    const { gameId, playerNumber } = socket.handshake.query;
    
    console.log(`Player ${playerNumber} connected to game ${gameId}`);
    
    socket.join(gameId);
    
    let game = gameService.getGame(gameId);
    if (!game) {
      game = gameService.createGame(gameId, playerNumber);
    } else {
      game = gameService.joinGame(gameId, playerNumber);
      if (game.players.size === 2) {
        io.to(gameId).emit('player_joined', playerNumber);
      }
    }
    
    socket.on('play_card', ({ card, capturedCards }) => {
      const game = gameService.getGame(gameId);
      if (game) {
        io.to(gameId).emit('game_state_update', {
          card,
          capturedCards,
          currentPlayer: playerNumber
        });
      }
    });
    
    socket.on('disconnect', () => {
      if (gameService.removePlayer(gameId, playerNumber)) {
        io.to(gameId).emit('player_left', playerNumber);
      }
    });
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ status: 'WebSocket server running' })
  };
};
