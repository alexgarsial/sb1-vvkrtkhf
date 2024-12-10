import { useState, useCallback } from 'react';
import { GameState, Card } from '../types/game';
import { createDeck, handleInitialTableCards } from '../utils/deck';
import { handleEndGame } from '../utils/endGame';
import { 
  removeDuplicateCards, 
  cloneCards, 
  cloneCard, 
  createCardKey,
  validateUniqueCards 
} from '../utils/cardManagement';

export function useGameState(isComputerOpponent: boolean) {
  const [lastStartingPlayer, setLastStartingPlayer] = useState<number | null>(null);
  const [lastCapturingPlayer, setLastCapturingPlayer] = useState<number | null>(null);
  
  const [state, setState] = useState<GameState>({
    deck: [],
    players: [
      { id: 1, cards: [], capturedCards: [], score: 0, name: "Player 1", matchPoints: 0 },
      { 
        id: 2, 
        cards: [], 
        capturedCards: [], 
        score: 0, 
        name: isComputerOpponent ? "Ordinateur" : "Player 2", 
        matchPoints: 0 
      }
    ],
    tableCards: [],
    currentPlayer: 1,
    isGameOver: false,
    jackOnTable: false,
    selectedCards: [],
    selectedPlayerCard: null,
    discardPile: [],
    matchWinner: null
  });

  const initializeGame = useCallback(() => {
    const initialDeck = createDeck();
    const player1Cards = initialDeck.splice(0, 4);
    const player2Cards = initialDeck.splice(0, 4);
    
    const { tableCards, updatedDeck } = handleInitialTableCards(initialDeck);

    const startingPlayer = lastStartingPlayer === null ? 1 : (lastStartingPlayer === 1 ? 2 : 1);
    setLastStartingPlayer(startingPlayer);
    setLastCapturingPlayer(null);

    // Valider qu'il n'y a pas de doublons dans la distribution initiale
    validateUniqueCards([...player1Cards, ...player2Cards, ...tableCards, ...updatedDeck]);

    setState(prev => ({
      ...prev,
      deck: updatedDeck,
      players: [
        { ...prev.players[0], cards: cloneCards(player1Cards), capturedCards: [], score: 0 },
        { ...prev.players[1], cards: cloneCards(player2Cards), capturedCards: [], score: 0 }
      ],
      tableCards: cloneCards(tableCards),
      currentPlayer: startingPlayer,
      isGameOver: false,
      matchWinner: null
    }));
  }, [lastStartingPlayer]);

  const startNewMatch = useCallback(() => {
    setLastStartingPlayer(null);
    setState(prev => ({
      ...prev,
      players: prev.players.map(player => ({
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
    }));
    setTimeout(initializeGame, 0);
  }, [initializeGame]);

  const playMove = useCallback((selectedCard: Card, capturedCards: Card[]) => {
    setState(prev => {
      const playerIndex = prev.currentPlayer - 1;
      const otherPlayerIndex = 1 - playerIndex;

      // Retirer la carte jouée de la main du joueur
      const newPlayerCards = cloneCards(
        prev.players[playerIndex].cards.filter(
          card => createCardKey(card) !== createCardKey(selectedCard)
        )
      );

      // Mettre à jour les cartes capturées
      let newCapturedCards = cloneCards(prev.players[playerIndex].capturedCards);
      if (capturedCards.length > 0) {
        newCapturedCards = removeDuplicateCards([
          ...newCapturedCards,
          cloneCard(selectedCard),
          ...cloneCards(capturedCards)
        ]);
        setLastCapturingPlayer(prev.currentPlayer);
      }

      // Mettre à jour les cartes sur la table
      const newTableCards = capturedCards.length > 0
        ? cloneCards(prev.tableCards.filter(card => 
            !capturedCards.some(captured => 
              createCardKey(captured) === createCardKey(card)
            )
          ))
        : [...cloneCards(prev.tableCards), cloneCard(selectedCard)];

      // Vérifier si c'est la fin de la manche
      const needsNewCards = prev.deck.length < 8;
      const isRoundOver = newPlayerCards.length === 0 && 
                         prev.players[otherPlayerIndex].cards.length === 0;

      if (needsNewCards && isRoundOver) {
        return handleEndGame(
          prev,
          playerIndex,
          selectedCard,
          capturedCards,
          newTableCards,
          lastCapturingPlayer
        );
      }

      // Distribuer de nouvelles cartes si nécessaire
      if (isRoundOver && prev.deck.length >= 8) {
        const newDeck = cloneCards(prev.deck);
        const newPlayer1Cards = cloneCards(newDeck.splice(0, 4));
        const newPlayer2Cards = cloneCards(newDeck.splice(0, 4));

        // Valider qu'il n'y a pas de doublons dans la nouvelle distribution
        validateUniqueCards([...newPlayer1Cards, ...newPlayer2Cards, ...newTableCards, ...newDeck]);

        return {
          ...prev,
          deck: newDeck,
          players: [
            {
              ...prev.players[0],
              cards: playerIndex === 0 ? newPlayer1Cards : newPlayer1Cards,
              capturedCards: playerIndex === 0 ? newCapturedCards : prev.players[0].capturedCards
            },
            {
              ...prev.players[1],
              cards: playerIndex === 1 ? newPlayer2Cards : newPlayer2Cards,
              capturedCards: playerIndex === 1 ? newCapturedCards : prev.players[1].capturedCards
            }
          ],
          tableCards: newTableCards,
          currentPlayer: prev.currentPlayer === 1 ? 2 : 1
        };
      }

      return {
        ...prev,
        tableCards: newTableCards,
        players: [
          {
            ...prev.players[0],
            cards: playerIndex === 0 ? newPlayerCards : prev.players[0].cards,
            capturedCards: playerIndex === 0 ? newCapturedCards : prev.players[0].capturedCards
          },
          {
            ...prev.players[1],
            cards: playerIndex === 1 ? newPlayerCards : prev.players[1].cards,
            capturedCards: playerIndex === 1 ? newCapturedCards : prev.players[1].capturedCards
          }
        ],
        currentPlayer: prev.currentPlayer === 1 ? 2 : 1
      };
    });
  }, [lastCapturingPlayer]);

  return {
    gameState: state,
    playMove,
    initializeGame,
    startNewMatch
  };
}