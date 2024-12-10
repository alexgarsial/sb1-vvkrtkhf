import { useState, useEffect } from 'react';
import { GameState, Card, ComputerMove } from '../types/game';
import { findBestMove } from '../utils/computerPlayer';

export const useComputerPlayer = (
  isComputerOpponent: boolean,
  gameState: GameState,
  onPlayMove: (card: Card, capturedCards: Card[]) => void
) => {
  const [computerMove, setComputerMove] = useState<ComputerMove | null>(null);
  const [isComputerThinking, setIsComputerThinking] = useState(false);

  useEffect(() => {
    if (!isComputerOpponent || gameState.currentPlayer !== 2 || gameState.isGameOver) {
      return;
    }

    let isActive = true;
    setIsComputerThinking(true);

    const timer = setTimeout(() => {
      if (!isActive) return;

      const bestMove = findBestMove(gameState);
      
      if (isActive && bestMove) {
        setComputerMove(bestMove);
        
        const playTimer = setTimeout(() => {
          if (isActive) {
            onPlayMove(bestMove.card, bestMove.capturedCards);
            setComputerMove(null);
            setIsComputerThinking(false);
          }
        }, 1500);

        return () => clearTimeout(playTimer);
      }
    }, 1000);

    return () => {
      isActive = false;
      clearTimeout(timer);
      setIsComputerThinking(false);
    };
  }, [gameState.currentPlayer, isComputerOpponent, gameState.isGameOver, gameState.tableCards, gameState.players]);

  return {
    computerMove,
    isComputerThinking
  };
};