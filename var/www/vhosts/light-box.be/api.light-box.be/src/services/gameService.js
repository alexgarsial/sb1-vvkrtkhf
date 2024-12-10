const logger = require('../utils/logger');

class GameService {
  constructor() {
    this.games = new Map();
  }

  createGame(gameId, playerNumber) {
    const game = {
      players: new Set([playerNumber]),
      gameState: null,
      createdAt: new Date()
    };
    
    this.games.set(gameId, game);
    logger.info(`Game created: ${gameId} by player ${playerNumber}`);
    
    return game;
  }

  joinGame(gameId, playerNumber) {
    const game = this.games.get(gameId);
    if (game) {
      game.players.add(playerNumber);
      logger.info(`Player ${playerNumber} joined game ${gameId}`);
      return game;
    }
    return null;
  }

  removePlayer(gameId, playerNumber) {
    const game = this.games.get(gameId);
    if (game) {
      game.players.delete(playerNumber);
      logger.info(`Player ${playerNumber} left game ${gameId}`);
      
      if (game.players.size === 0) {
        this.games.delete(gameId);
        logger.info(`Game ${gameId} deleted - no players remaining`);
      }
      return true;
    }
    return false;
  }

  getGame(gameId) {
    return this.games.get(gameId);
  }

  cleanupOldGames() {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    for (const [gameId, game] of this.games.entries()) {
      if (game.createdAt < oneHourAgo) {
        this.games.delete(gameId);
        logger.info(`Cleaned up inactive game ${gameId}`);
      }
    }
  }
}

module.exports = new GameService();