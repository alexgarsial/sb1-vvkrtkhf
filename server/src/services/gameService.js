class GameService {
  constructor() {
    this.games = new Map();
  }

  createGame(gameId, playerNumber) {
    this.games.set(gameId, {
      players: new Set([playerNumber]),
      gameState: null
    });
    return this.games.get(gameId);
  }

  joinGame(gameId, playerNumber) {
    const game = this.games.get(gameId);
    if (game) {
      game.players.add(playerNumber);
      return game;
    }
    return null;
  }

  removePlayer(gameId, playerNumber) {
    const game = this.games.get(gameId);
    if (game) {
      game.players.delete(playerNumber);
      if (game.players.size === 0) {
        this.games.delete(gameId);
      }
      return true;
    }
    return false;
  }

  getGame(gameId) {
    return this.games.get(gameId);
  }
}

module.exports = new GameService();