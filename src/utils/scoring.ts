import { Card } from '../types/game';

export const calculateFinalPoints = (
  playerCards: Card[],
  otherPlayerCards: Card[]
): { score: number } => {
  let points = 0;

  // Points pour le 10 de carreaux (1 point)
  if (playerCards.some(card => card.rank === '10' && card.suit === 'diamonds')) {
    points += 1;
  }

  // Points pour le 2 de trèfles (1 point)
  if (playerCards.some(card => card.rank === '2' && card.suit === 'clubs')) {
    points += 1;
  }

  // Points pour le plus de trèfles (1 point)
  const playerClubs = playerCards.filter(card => card.suit === 'clubs').length;
  const otherPlayerClubs = otherPlayerCards.filter(card => card.suit === 'clubs').length;

  if (playerClubs > otherPlayerClubs) {
    points += 1;
  } else if (playerClubs === otherPlayerClubs) {
    points += 0.5;
  }

  // Points pour le plus de cartes (2 points)
  if (playerCards.length > otherPlayerCards.length) {
    points += 2;
  } else if (playerCards.length === otherPlayerCards.length) {
    points += 1;
  }

  return { score: points };
};