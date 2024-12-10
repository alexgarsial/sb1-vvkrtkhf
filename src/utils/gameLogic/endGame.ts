import { Card, GameState, Player } from '../../types/game';
import { calculateFinalPoints } from './scoring';
import { validateCardDistribution } from './cardValidation';
import { getFinalCapturedCards, validateUniqueCards } from './cardManagement';

export const handleEndGame = (
  state: GameState,
  playerIndex: number,
  selectedCard: Card,
  capturedCards: Card[],
  remainingTableCards: Card[],
  lastCapturingPlayer: number | null
): {
  players: Player[];
  isGameOver: boolean;
  matchWinner: number | null;
} => {
  // Determine final capturer
  const finalCapturer = capturedCards.length > 0 
    ? playerIndex 
    : lastCapturingPlayer !== null 
      ? lastCapturingPlayer - 1 
      : playerIndex;

  // Get final cards for each player
  const player1FinalCards = getFinalCapturedCards(
    state.players[0].capturedCards,
    finalCapturer === 0 ? selectedCard : null,
    finalCapturer === 0 ? capturedCards : [],
    remainingTableCards,
    finalCapturer === 0
  );

  const player2FinalCards = getFinalCapturedCards(
    state.players[1].capturedCards,
    finalCapturer === 1 ? selectedCard : null,
    finalCapturer === 1 ? capturedCards : [],
    remainingTableCards,
    finalCapturer === 1
  );

  // Validate no duplicates in each player's cards
  validateUniqueCards(player1FinalCards);
  validateUniqueCards(player2FinalCards);

  // Validate overall card distribution
  validateCardDistribution(player1FinalCards, player2FinalCards, [], []);

  // Calculate final scores
  const { score: player1Score } = calculateFinalPoints(player1FinalCards, player2FinalCards);
  const { score: player2Score } = calculateFinalPoints(player2FinalCards, player1FinalCards);

  const newMatchPoints = [
    state.players[0].matchPoints + player1Score,
    state.players[1].matchPoints + player2Score
  ];

  // Update players
  const updatedPlayers = [
    {
      ...state.players[0],
      cards: [],
      capturedCards: player1FinalCards,
      score: player1Score,
      matchPoints: newMatchPoints[0]
    },
    {
      ...state.players[1],
      cards: [],
      capturedCards: player2FinalCards,
      score: player2Score,
      matchPoints: newMatchPoints[1]
    }
  ];

  return {
    players: updatedPlayers,
    isGameOver: true,
    matchWinner: newMatchPoints[0] >= 11 ? 1 : newMatchPoints[1] >= 11 ? 2 : null
  };
};