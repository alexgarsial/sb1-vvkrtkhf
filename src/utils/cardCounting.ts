import { Card } from '../types/game';

export const TOTAL_CARDS = 52;

export const verifyTotalCards = (
  player1Cards: Card[], 
  player2Cards: Card[], 
  tableCards: Card[],
  deckCards: Card[]
): void => {
  const total = player1Cards.length + player2Cards.length + tableCards.length + deckCards.length;
  
  if (total !== TOTAL_CARDS) {
    console.error(`Erreur dans le total des cartes: ${total}/${TOTAL_CARDS}`);
    console.error(`Joueur 1: ${player1Cards.length}`);
    console.error(`Joueur 2: ${player2Cards.length}`);
    console.error(`Table: ${tableCards.length}`);
    console.error(`Deck: ${deckCards.length}`);
    throw new Error(`Invalid card count: ${total}`);
  }
};

export const getFinalCapturedCards = (
  existingCapturedCards: Card[],
  selectedCard: Card | null,
  capturedCards: Card[],
  remainingTableCards: Card[]
): Card[] => {
  const finalCards = [...existingCapturedCards];
  
  // Ajouter la carte jouée si elle existe
  if (selectedCard) {
    finalCards.push(selectedCard);
  }
  
  // Ajouter les cartes capturées
  if (capturedCards && capturedCards.length > 0) {
    finalCards.push(...capturedCards);
  }
  
  // Ajouter les cartes restantes sur la table
  if (remainingTableCards && remainingTableCards.length > 0) {
    finalCards.push(...remainingTableCards);
  }
  
  return finalCards;
};

export const validateCardDistribution = (
  player1Cards: Card[],
  player2Cards: Card[],
  tableCards: Card[],
  deck: Card[]
): void => {
  // Vérifier que chaque carte n'apparaît qu'une seule fois
  const allCards = [...player1Cards, ...player2Cards, ...tableCards, ...deck];
  const cardMap = new Map<string, number>();
  
  allCards.forEach(card => {
    const key = `${card.suit}-${card.rank}`;
    cardMap.set(key, (cardMap.get(key) || 0) + 1);
  });
  
  // Vérifier les doublons
  cardMap.forEach((count, card) => {
    if (count > 1) {
      console.error(`Carte en double: ${card} (${count} fois)`);
      throw new Error(`Duplicate card found: ${card}`);
    }
  });
  
  // Vérifier le total
  verifyTotalCards(player1Cards, player2Cards, tableCards, deck);
};