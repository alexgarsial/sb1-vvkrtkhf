import { useState, useCallback } from 'react';
import { Card } from '../types/game';
import { 
  findAllCombinations, 
  isJackMove, 
  getValidJackTargets,
  canAddCardToSelection,
  calculateSum
} from '../utils/gameLogic';

export const useCardSelection = (
  onPlayMove: (card: Card, capturedCards: Card[]) => void,
  tableCards: Card[]
) => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [selectedTableCards, setSelectedTableCards] = useState<Card[]>([]);

  const clearSelection = useCallback(() => {
    setSelectedCard(null);
    setSelectedTableCards([]);
  }, []);

  const handleCardSelect = useCallback((card: Card) => {
    if (selectedCard === card) {
      clearSelection();
      return;
    }
    setSelectedCard(card);
    setSelectedTableCards([]);
  }, [selectedCard, clearSelection]);

  const handleTableCardSelect = useCallback((tableCard: Card) => {
    if (!selectedCard) return;

    // Si la carte est déjà sélectionnée, on la retire
    if (selectedTableCards.includes(tableCard)) {
      setSelectedTableCards(prev => prev.filter(card => card !== tableCard));
      return;
    }

    // Vérifier si la carte peut être ajoutée à la sélection
    if (canAddCardToSelection(selectedCard, selectedTableCards, tableCard)) {
      setSelectedTableCards(prev => [...prev, tableCard]);
    }
  }, [selectedCard, selectedTableCards]);

  const handlePlaceCard = useCallback(() => {
    if (!selectedCard) return;

    // Vérifier si la sélection est valide
    if (selectedTableCards.length > 0) {
      // Pour les Rois et les Dames - une seule capture à la fois
      if (selectedCard.rank === 'K' || selectedCard.rank === 'Q') {
        if (selectedTableCards.length !== 1 || selectedCard.rank !== selectedTableCards[0].rank) {
          return;
        }
      }
      // Pour le Valet
      else if (isJackMove(selectedCard)) {
        const validTargets = getValidJackTargets(tableCards);
        if (!selectedTableCards.every(card => validTargets.includes(card))) {
          return;
        }
      }
      // Pour l'As et les cartes numériques - vérifier la somme de 11
      else {
        const sum = calculateSum([selectedCard, ...selectedTableCards]);
        if (sum !== 11) {
          return;
        }
      }
    }

    onPlayMove(selectedCard, selectedTableCards);
    clearSelection();
  }, [selectedCard, selectedTableCards, tableCards, onPlayMove, clearSelection]);

  return {
    selectedCard,
    selectedTableCards,
    handleCardSelect,
    handleTableCardSelect,
    handlePlaceCard,
    clearSelection
  };
};