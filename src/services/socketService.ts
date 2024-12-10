import { io, Socket } from 'socket.io-client';
import { Card, GameState } from '../types/game';
import { API_URL } from '../config';

class SocketService {
  private socket: Socket | null = null;
  private gameId: string | null = null;

  connect(gameId: string, playerNumber: number) {
    this.socket = io(API_URL, {
      query: {
        gameId,
        playerNumber
      }
    });
    this.gameId = gameId;

    this.socket.on('connect', () => {
      console.log('Connected to game server');
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.gameId = null;
    }
  }

  playCard(card: Card, capturedCards: Card[]) {
    if (this.socket) {
      this.socket.emit('play_card', {
        gameId: this.gameId,
        card,
        capturedCards
      });
    }
  }

  onGameStateUpdate(callback: (gameState: GameState) => void) {
    if (this.socket) {
      this.socket.on('game_state_update', callback);
    }
  }

  onPlayerJoined(callback: (playerNumber: number) => void) {
    if (this.socket) {
      this.socket.on('player_joined', callback);
    }
  }

  onPlayerLeft(callback: () => void) {
    if (this.socket) {
      this.socket.on('player_left', callback);
    }
  }
}

export const socketService = new SocketService();