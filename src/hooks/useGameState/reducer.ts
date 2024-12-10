import { GameState, Card } from '../../types/game';
import { calculateImmediatePoints, calculateFinalPoints } from '../../utils/scoring';

type GameStateAction =
  | { type: 'INITIALIZE_GAME'; payload: Partial<GameState> }
  | { type: 'PLAY_MOVE'; payload: { selectedCard: Card; capturedCards: Card[]; playerIndex: number } }
  | { type: 'DEAL_NEW_CARDS'; payload: { player1Cards: Card[]; player2Cards: Card[]; newDeck: Card[] } }
  | { type: 'END_GAME'; payload: { lastCapturingPlayer: number | null } }
  | { type: 'START_NEW_MATCH' };

export function gameStateReducer(state: GameState, action: GameStateAction): GameState {
  switch (action.type) {
    case 'INITIALIZE_GAME':
      return {
        ...state,
        ...action.payload,
        isGameOver: false,
        matchWinner: null
      };

    case 'PLAY_MOVE': {
      const { selectedCard, capturedCards, playerIndex } = action.payload;
      const otherPlayerIndex = 1 - playerIndex;

      // Mise à jour des cartes sur la table
      const newTableCards = capturedCards.length > 0
        ? state.tableCards.filter(card => !capturedCards.includes(card))
        : [...state.tableCards, selectedCard];

      // Mise à jour des cartes du joueur
      const newPlayerCards = state.players[playerIndex].cards
        .filter(card => card !== selectedCard);

      // Mise à jour des cartes capturées
      const newCapturedCards = capturedCards.length > 0
        ? [...state.players[playerIndex].capturedCards, selectedCard, ...capturedCards]
        : state.players[playerIndex].capturedCards;

      // Vérifier si c'est la fin de la manche
      const isRoundOver = newPlayerCards.length === 0 && 
                         state.players[otherPlayerIndex].cards.length === 0;

      // Si c'est la fin de la partie
      if (isRoundOver && state.deck.length < 8) {
        // Le dernier joueur qui capture prend les cartes restantes sur la table
        const finalTableCards = capturedCards.length > 0 ? [] : newTableCards;
        const finalCapturedCards = [
          ...newCapturedCards,
          ...(capturedCards.length > 0 ? [] : finalTableCards)
        ];

        const { score: player1Score } = calculateFinalPoints(
          playerIndex === 0 ? finalCapturedCards : state.players[0].capturedCards,
          playerIndex === 1 ? finalCapturedCards : state.players[1].capturedCards
        );

        const { score: player2Score } = calculateFinalPoints(
          playerIndex === 1 ? finalCapturedCards : state.players[1].capturedCards,
          playerIndex === 0 ? finalCapturedCards : state.players[0].capturedCards
        );

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
              cards: newPlayerCards,
              capturedCards: playerIndex === 0 ? finalCapturedCards : state.players[0].capturedCards,
              matchPoints: newMatchPoints[0]
            },
            {
              ...state.players[1],
              cards: state.players[1].cards,
              capturedCards: playerIndex === 1 ? finalCapturedCards : state.players[1].capturedCards,
              matchPoints: newMatchPoints[1]
            }
          ],
          isGameOver: true,
          matchWinner: newMatchPoints[0] >= 11 ? 1 : newMatchPoints[1] >= 11 ? 2 : null
        };
      }

      // Si on doit distribuer de nouvelles cartes
      if (isRoundOver && state.deck.length >= 8) {
        const newDeck = [...state.deck];
        const newPlayer1Cards = newDeck.splice(0, 4);
        const newPlayer2Cards = newDeck.splice(0, 4);

        return {
          ...state,
          deck: newDeck,
          tableCards: newTableCards,
          players: [
            {
              ...state.players[0],
              cards: playerIndex === 0 ? newPlayer1Cards : newPlayer1Cards,
              capturedCards: playerIndex === 0 ? newCapturedCards : state.players[0].capturedCards
            },
            {
              ...state.players[1],
              cards: playerIndex === 1 ? newPlayer2Cards : newPlayer2Cards,
              capturedCards: playerIndex === 1 ? newCapturedCards : state.players[1].capturedCards
            }
          ],
          currentPlayer: state.currentPlayer === 1 ? 2 : 1
        };
      }

      // Mise à jour normale
      return {
        ...state,
        tableCards: newTableCards,
        players: [
          {
            ...state.players[0],
            cards: playerIndex === 0 ? newPlayerCards : state.players[0].cards,
            capturedCards: playerIndex === 0 ? newCapturedCards : state.players[0].capturedCards
          },
          {
            ...state.players[1],
            cards: playerIndex === 1 ? newPlayerCards : state.players[1].cards,
            capturedCards: playerIndex === 1 ? newCapturedCards : state.players[1].capturedCards
          }
        ],
        currentPlayer: state.currentPlayer === 1 ? 2 : 1
      };
    }

    case 'START_NEW_MATCH':
      return {
        ...state,
        players: state.players.map(player => ({
          ...player,
          cards: [],
          capturedCards: [],
          score: 0,
          matchPoints: 0
        })),
        deck: [],
        tableCards: [],
        isGameOver: false,
        matchWinner: null
      };

    default:
      return state;
  }
}