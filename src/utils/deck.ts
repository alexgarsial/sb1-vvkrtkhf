import { Card, Suit, Rank, GameState } from '../types/game';

const SUITS: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export const createDeck = (): Card[] => {
  const deck: Card[] = [];
  
  SUITS.forEach(suit => {
    RANKS.forEach(rank => {
      deck.push({
        suit,
        rank,
        value: getValue(rank)
      });
    });
  });
  
  return shuffleDeck(deck);
};

const getValue = (rank: Rank): number => {
  if (rank === 'A') return 1;
  if (rank === 'J' || rank === 'Q' || rank === 'K') return 0;
  return parseInt(rank);
};

export const shuffleDeck = (deck: Card[]): Card[] => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};

export const handleInitialTableCards = (deck: Card[]): { tableCards: Card[], updatedDeck: Card[] } => {
  let tableCards: Card[] = [];
  let updatedDeck = [...deck];
  let jackCards: Card[] = [];
  
  // Distribuer 4 cartes sur la table
  for (let i = 0; i < 4; i++) {
    const card = updatedDeck.shift();
    if (!card) break;
    
    if (card.rank === 'J') {
      jackCards.push(card);
    } else {
      tableCards.push(card);
    }
  }
  
  // Si des Valets ont été trouvés, les remettre dans le paquet
  if (jackCards.length > 0) {
    updatedDeck = [...updatedDeck, ...jackCards];
    
    // Compléter la table avec de nouvelles cartes
    while (tableCards.length < 4 && updatedDeck.length > 0) {
      const card = updatedDeck.shift();
      if (!card) break;
      
      if (card.rank === 'J') {
        updatedDeck.push(card);
      } else {
        tableCards.push(card);
      }
    }
  }
  
  return { tableCards, updatedDeck };
};

// Fonction pour vérifier le nombre total de cartes dans le jeu
export const verifyCardCount = (gameState: GameState): boolean => {
  const deckCount = gameState.deck.length;
  const tableCount = gameState.tableCards.length;
  const player1Cards = gameState.players[0].cards.length + gameState.players[0].capturedCards.length;
  const player2Cards = gameState.players[1].cards.length + gameState.players[1].capturedCards.length;
  
  const totalCards = deckCount + tableCount + player1Cards + player2Cards;
  
  if (totalCards !== 52) {
    console.warn(`Erreur de comptage des cartes: ${totalCards}/52 cartes trouvées`);
    console.warn(`Deck: ${deckCount}, Table: ${tableCount}, Joueur 1: ${player1Cards}, Joueur 2: ${player2Cards}`);
    return false;
  }
  
  return true;
};