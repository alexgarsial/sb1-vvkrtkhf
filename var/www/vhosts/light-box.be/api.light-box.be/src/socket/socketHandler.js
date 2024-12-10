const gameService = require('../services/gameService');
const logger = require('../utils/logger');

function setupSocketHandlers(io) {
  io.on('connection', (socket) => {
    const { gameId, playerNumber } = socket.handshake.query;
    
    logger.info(`Player ${playerNumber} connected to game ${gameId}`);
    
    socket.join(gameId);
    
    let game = gameService.getGame(gameId);
    if (!game) {
      game = gameService.createGame(gameId, playerNumber);
      logger.debug(`New game created: ${gameId}`);
    } else {
      game = gameService.joinGame(gameId, playerNumber);
      if (game.players.size === 2) {
        io.to(gameId).emit('player_joined', playerNumber);
        logger.info(`Game ${gameId} is now full`);
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
        logger.debug(`Move played in game ${gameId} by player ${playerNumber}`);
      }
    });
    
    socket.on('disconnect', () => {
      if (gameService.removePlayer(gameId, playerNumber)) {
        io.to(gameId).emit('player_left', playerNumber);
        logger.info(`Player ${playerNumber} left game ${gameId}`);
      }
    });
  });
}

module.exports = setupSocketHandlers;