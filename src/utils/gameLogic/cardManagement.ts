import { Card } from '../../types/game';

export const createCardKey = (card: Card): string => {
  return `${card.suit}-${card.rank}`;
};

export const removeDuplicateCards = (cards: Card[]): Card[] => {
  const uniqueCards = new Map<string, Card>();
  
  cards.forEach(card => {
    const key = createCardKey(card);
    if (!uniqueCards.has(key)) {
      uniqueCards.set(key, card);
    }
  });
  
  return Array.from(uniqueCards.values());
};

export const validateUniqueCards = (cards: Card[]): void => {
  const cardMap = new Map<string, number>();
  
  cards.forEach(card => {
    const key = createCardKey(card);
    cardMap.set(key, (cardMap.get(key) || 0) + 1);
  });
  
  cardMap.forEach((count, key) => {
    if (count > 1) {
      throw new Error(`Duplicate card found: ${key}`);
    }
  });
};