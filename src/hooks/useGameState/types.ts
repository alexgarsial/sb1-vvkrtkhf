import { Card, GameState } from '../../types/game';

export interface GameStateActions {
  playMove: (selectedCard: Card, capturedCards: Card[]) => void;
  initializeGame: () => void;
  startNewMatch: () => void;
}

export interface UseGameStateReturn {
  gameState: GameState;
  playMove: (selectedCard: Card, capturedCards: Card[]) => void;
  initializeGame: () => void;
  startNewMatch: () => void;
}