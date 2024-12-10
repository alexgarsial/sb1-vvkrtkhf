import { GameState, Card, ComputerMove } from '../types/game';
import { findAllCombinations, isJackMove, getValidJackTargets, canAceCaptureTenOfDiamonds } from './gameLogic';

const evaluateMove = (capturedCards: Card[]): number => {
  let score = capturedCards.length;

  // Bonus pour les cartes spéciales
  if (capturedCards.some(card => card.rank === '10' && card.suit === 'diamonds')) {
    score += 10;
  }
  if (capturedCards.some(card => card.rank === '2' && card.suit === 'clubs')) {
    score += 5;
  }

  // Bonus pour les trèfles
  score += capturedCards.filter(card => card.suit === 'clubs').length * 3;

  return score;
};

export const findBestMove = (gameState: GameState): ComputerMove | null => {
  const computerCards = gameState.players[1].cards;
  
  if (computerCards.length === 0) {
    return null;
  }

  let bestMove: ComputerMove | null = null;
  let bestScore = -1;

  // Priorité au 10 de carreaux avec un As
  const tenOfDiamonds = gameState.tableCards.find(
    card => card.rank === '10' && card.suit === 'diamonds'
  );
  if (tenOfDiamonds) {
    const ace = computerCards.find(card => card.rank === 'A');
    if (ace) {
      return { card: ace, capturedCards: [tenOfDiamonds] };
    }
  }

  for (const card of computerCards) {
    if (isJackMove(card)) {
      const validTargets = getValidJackTargets(gameState.tableCards);
      if (validTargets.length > 0) {
        const score = evaluateMove(validTargets);
        if (score > bestScore) {
          bestScore = score;
          bestMove = { card, capturedCards: validTargets };
        }
      }
      continue;
    }

    const combinations = findAllCombinations(card, gameState.tableCards);
    for (const combination of combinations) {
      const score = evaluateMove(combination);
      if (score > bestScore) {
        bestScore = score;
        bestMove = { card, capturedCards: combination };
      }
    }
  }

  if (!bestMove) {
    const card = findBestCardToPlay(computerCards);
    return { card, capturedCards: [] };
  }

  return bestMove;
};

const findBestCardToPlay = (cards: Card[]): Card => {
  // Éviter de jouer les trèfles si possible
  const nonClubCards = cards.filter(card => card.suit !== 'clubs');
  if (nonClubCards.length > 0) {
    return nonClubCards[0];
  }
  return cards[0];
};