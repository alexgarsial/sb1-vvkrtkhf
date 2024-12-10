import { Card } from '../../types/game';
import { GameStateAction } from './reducer';

export const createPlayMoveAction = (
  selectedCard: Card,
  capturedCards: Card[],
  playerIndex: number
): GameStateAction => ({
  type: 'PLAY_MOVE',
  payload: { selectedCard, capturedCards, playerIndex }
});

export const createEndGameAction = (
  lastCapturingPlayer: number | null
): GameStateAction => ({
  type: 'END_GAME',
  payload: { lastCapturingPlayer }
});

// ... autres actions inchangées ...