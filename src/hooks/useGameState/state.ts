import { GameState } from '../../types/game';

export const initialState = (isComputerOpponent: boolean): GameState => ({
  deck: [],
  players: [
    { 
      id: 1, 
      cards: [], 
      capturedCards: [], 
      score: 0, 
      name: "Player 1", 
      matchPoints: 0 
    },
    { 
      id: 2, 
      cards: [], 
      capturedCards: [], 
      score: 0, 
      name: isComputerOpponent ? "Ordinateur" : "Player 2", 
      matchPoints: 0 
    }
  ],
  tableCards: [],
  currentPlayer: 1,
  isGameOver: false,
  jackOnTable: false,
  selectedCards: [],
  selectedPlayerCard: null,
  discardPile: [],
  matchWinner: null
});