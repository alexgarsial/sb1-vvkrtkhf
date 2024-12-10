import { Card, GameState, Player } from '../types/game';
import { calculateFinalPoints } from './scoring';
import { removeDuplicateCards } from './cardManagement';

export const handleEndGame = (
  state: GameState,
  playerIndex: number,
  selectedCard: Card,
  capturedCards: Card[],
  remainingTableCards: Card[],
  lastCapturingPlayer: number | null
): GameState => {
  // Le dernier joueur qui capture prend les cartes restantes
  const finalCapturer = capturedCards.length > 0 
    ? playerIndex 
    : lastCapturingPlayer !== null 
      ? lastCapturingPlayer - 1 
      : playerIndex;

  // Préparer les cartes finales pour chaque joueur
  let player1FinalCards = [...state.players[0].capturedCards];
  let player2FinalCards = [...state.players[1].capturedCards];

  // Ajouter la dernière carte jouée et les cartes capturées au bon joueur
  if (finalCapturer === 0) {
    player1FinalCards = removeDuplicateCards([
      ...player1FinalCards,
      selectedCard,
      ...capturedCards,
      ...remainingTableCards
    ]);
  } else {
    player2FinalCards = removeDuplicateCards([
      ...player2FinalCards,
      selectedCard,
      ...capturedCards,
      ...remainingTableCards
    ]);
  }

  // Calculer les scores finaux
  const { score: player1Score } = calculateFinalPoints(player1FinalCards, player2FinalCards);
  const { score: player2Score } = calculateFinalPoints(player2FinalCards, player1FinalCards);

  const newMatchPoints = [
    state.players[0].matchPoints + player1Score,
    state.players[1].matchPoints + player2Score
  ];

  return {
    ...state,
    tableCards: [],
    players: [
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
    ],
    isGameOver: true,
    matchWinner: newMatchPoints[0] >= 11 ? 1 : newMatchPoints[1] >= 11 ? 2 : null
  };
};