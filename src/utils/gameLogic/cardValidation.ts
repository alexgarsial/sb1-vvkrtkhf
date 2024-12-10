import { Card } from '../../types/game';

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

export const checkForDuplicateCards = (cards: Card[]): void => {
  const cardMap = new Map<string, number>();
  
  cards.forEach(card => {
    const key = `${card.suit}-${card.rank}`;
    cardMap.set(key, (cardMap.get(key) || 0) + 1);
  });
  
  cardMap.forEach((count, card) => {
    if (count > 1) {
      console.error(`Carte en double: ${card} (${count} fois)`);
      throw new Error(`Duplicate card found: ${card}`);
    }
  });
};

export const validateCardDistribution = (
  player1Cards: Card[],
  player2Cards: Card[],
  tableCards: Card[],
  deck: Card[]
): void => {
  const allCards = [...player1Cards, ...player2Cards, ...tableCards, ...deck];
  checkForDuplicateCards(allCards);
  verifyTotalCards(player1Cards, player2Cards, tableCards, deck);
};