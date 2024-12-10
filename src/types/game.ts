export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  suit: Suit;
  rank: Rank;
  value: number;
}

export interface Player {
  id: number;
  cards: Card[];
  capturedCards: Card[];
  score: number;
  name: string;
  matchPoints: number;
}

export interface GameState {
  deck: Card[];
  players: Player[];
  tableCards: Card[];
  currentPlayer: number;
  isGameOver: boolean;
  jackOnTable: boolean;
  selectedCards: Card[];
  selectedPlayerCard: Card | null;
  discardPile: Card[];
  matchWinner: number | null;
  gameId?: string;
  playerNumber?: number;
}

export interface ComputerMove {
  card: Card;
  capturedCards: Card[];
}