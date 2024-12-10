import { useState, useEffect, useCallback } from 'react';
import { socketService } from '../services/socketService';
import { GameState, Card } from '../types/game';

export const useMultiplayerGame = (gameId: string, playerNumber: number) => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const socket = socketService.connect(gameId, playerNumber);

    socket.on('connect', () => {
      setIsConnected(true);
      setError(null);
    });

    socket.on('connect_error', () => {
      setError('Impossible de se connecter au serveur');
      setIsConnected(false);
    });

    socket.on('game_state_update', (newState: GameState) => {
      setGameState(newState);
    });

    socket.on('error', (message: string) => {
      setError(message);
    });

    return () => {
      socketService.disconnect();
    };
  }, [gameId, playerNumber]);

  const playMove = useCallback((card: Card, capturedCards: Card[]) => {
    socketService.playCard(card, capturedCards);
  }, []);

  return {
    gameState,
    isConnected,
    error,
    playMove
  };
};