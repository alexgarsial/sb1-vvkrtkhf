import { useState, useCallback, useReducer, useEffect } from 'react';
import { Card } from '../../types/game';
import { createDeck, handleInitialTableCards, verifyCardCount } from '../../utils/deck';
import { initialState } from './state';
import { gameStateReducer } from './reducer';
import { UseGameStateReturn } from './types';

export function useGameState(isComputerOpponent: boolean): UseGameStateReturn {
  const [lastStartingPlayer, setLastStartingPlayer] = useState<number | null>(null);
  const [lastCapturingPlayer, setLastCapturingPlayer] = useState<number | null>(null);
  
  const [state, dispatch] = useReducer(gameStateReducer, initialState(isComputerOpponent));

  // Vérifier le nombre de cartes après chaque action
  useEffect(() => {
    verifyCardCount(state);
  }, [state]);

  const initializeGame = useCallback(() => {
    const initialDeck = createDeck();
    const player1Cards = initialDeck.splice(0, 4);
    const player2Cards = initialDeck.splice(0, 4);
    
    const { tableCards, updatedDeck } = handleInitialTableCards(initialDeck);

    const startingPlayer = lastStartingPlayer === null ? 1 : (lastStartingPlayer === 1 ? 2 : 1);
    setLastStartingPlayer(startingPlayer);
    setLastCapturingPlayer(null);

    dispatch({
      type: 'INITIALIZE_GAME',
      payload: {
        deck: updatedDeck,
        players: [
          { ...state.players[0], cards: player1Cards, capturedCards: [], score: 0 },
          { ...state.players[1], cards: player2Cards, capturedCards: [], score: 0 }
        ],
        tableCards,
        currentPlayer: startingPlayer
      }
    });
  }, [lastStartingPlayer, state.players]);

  // ... reste du code inchangé ...

  return {
    gameState: state,
    playMove,
    initializeGame,
    startNewMatch
  };
}