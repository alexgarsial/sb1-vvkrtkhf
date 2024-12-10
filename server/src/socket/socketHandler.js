const gameService = require('../services/gameService');

function setupSocketHandlers(io) {
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
}

module.exports = setupSocketHandlers;