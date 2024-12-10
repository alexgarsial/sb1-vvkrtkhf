import { Card } from '../../types/game';

export const calculateSum = (cards: Card[]): number => {
  return cards.reduce((sum, card) => {
    if (card.rank === 'A') return sum + 1;
    if (card.rank === 'J' || card.rank === 'Q' || card.rank === 'K') return sum;
    return sum + parseInt(card.rank);
  }, 0);
};

export const canCaptureSameRank = (playerCard: Card, tableCard: Card): boolean => {
  if (playerCard.rank === 'Q' && tableCard.rank === 'Q') return true;
  if (playerCard.rank === 'K' && tableCard.rank === 'K') return true;
  return false;
};

export const findAllCombinations = (playerCard: Card, tableCards: Card[]): Card[][] => {
  const combinations: Card[][] = [];

  // Cas spécial pour les Dames et Rois - uniquement capture de même rang
  if (playerCard.rank === 'Q' || playerCard.rank === 'K') {
    const sameRankCards = tableCards.filter(card => card.rank === playerCard.rank);
    if (sameRankCards.length > 0) {
      combinations.push([sameRankCards[0]]);
    }
    return combinations;
  }

  // Le Valet ne capture pas directement
  if (playerCard.rank === 'J') {
    return combinations;
  }

  // Pour les cartes numériques et l'As
  const validCards = tableCards.filter(card => 
    !['K', 'Q', 'J'].includes(card.rank)
  );

  const findCombinationsSum11 = (cards: Card[], start: number, current: Card[]) => {
    const sum = calculateSum([playerCard, ...current]);
    
    if (sum === 11) {
      combinations.push([...current]);
      return;
    }
    
    if (sum > 11) return;
    
    for (let i = start; i < cards.length; i++) {
      current.push(cards[i]);
      findCombinationsSum11(cards, i + 1, current);
      current.pop();
    }
  };

  findCombinationsSum11(validCards, 0, []);
  return combinations;
};

export const isJackMove = (card: Card): boolean => {
  return card.rank === 'J';
};

export const getValidJackTargets = (tableCards: Card[]): Card[] => {
  return tableCards.filter(card => card.rank !== 'K' && card.rank !== 'Q');
};

export const canAddCardToSelection = (
  selectedCard: Card,
  selectedTableCards: Card[],
  newCard: Card
): boolean => {
  // Pour les Dames et Rois - une seule capture possible
  if (selectedCard.rank === 'Q' || selectedCard.rank === 'K') {
    if (selectedTableCards.length > 0) return false;
    return selectedCard.rank === newCard.rank;
  }

  // Pour le Valet
  if (isJackMove(selectedCard)) {
    return newCard.rank !== 'K' && newCard.rank !== 'Q';
  }

  // Pour les cartes numériques et l'As
  if (newCard.rank === 'K' || newCard.rank === 'Q' || newCard.rank === 'J') {
    return false;
  }

  const currentSum = calculateSum([selectedCard, ...selectedTableCards]);
  const newSum = currentSum + calculateSum([newCard]);
  return newSum <= 11;
};