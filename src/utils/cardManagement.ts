import { Card } from '../types/game';

// Crée une clé unique pour chaque carte
export const createCardKey = (card: Card): string => {
  return `${card.suit}-${card.rank}`;
};

// Fonction pour s'assurer qu'il n'y a pas de doublons dans un ensemble de cartes
export const removeDuplicateCards = (cards: Card[]): Card[] => {
  const uniqueCards = new Map<string, Card>();
  
  cards.forEach(card => {
    const key = createCardKey(card);
    if (!uniqueCards.has(key)) {
      uniqueCards.set(key, {...card}); // Clone la carte pour éviter les références partagées
    }
  });
  
  return Array.from(uniqueCards.values());
};

// Fonction pour valider qu'il n'y a pas de doublons
export const validateUniqueCards = (cards: Card[]): void => {
  const cardMap = new Map<string, number>();
  
  cards.forEach(card => {
    const key = createCardKey(card);
    cardMap.set(key, (cardMap.get(key) || 0) + 1);
  });
  
  cardMap.forEach((count, key) => {
    if (count > 1) {
      console.error(`Carte en double détectée: ${key}`);
      throw new Error(`Duplicate card found: ${key}`);
    }
  });
};

// Fonction pour cloner une carte en toute sécurité
export const cloneCard = (card: Card): Card => {
  return {
    suit: card.suit,
    rank: card.rank,
    value: card.value
  };
};

// Fonction pour cloner un tableau de cartes
export const cloneCards = (cards: Card[]): Card[] => {
  return cards.map(cloneCard);
};