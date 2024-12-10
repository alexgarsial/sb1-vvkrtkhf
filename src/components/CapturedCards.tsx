import React from 'react';
import { Card as CardType } from '../types/game';
import { LayersIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface CapturedCardsProps {
  cards: CardType[];
  playerName: string;
}

const CapturedCards: React.FC<CapturedCardsProps> = ({ cards, playerName }) => {
  if (cards.length === 0) return null;

  const clubsCount = cards.filter(card => card.suit === 'clubs').length;
  const hasTenOfDiamonds = cards.some(card => card.rank === '10' && card.suit === 'diamonds');
  const hasTwoOfClubs = cards.some(card => card.rank === '2' && card.suit === 'clubs');

  return (
    <motion.div 
      className="mb-4 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 
          flex items-center gap-3 shadow-lg border border-white/20"
        whileHover={{ scale: 1.05 }}
      >
        <LayersIcon className="w-5 h-5 text-white" />
        <div className="flex items-center gap-4">
          <span className="text-white text-sm sm:text-base">
            Cartes: {cards.length}
          </span>

          <span className="text-white text-sm sm:text-base flex items-center gap-2">
            <span className="text-2xl">♣</span>
            {clubsCount}
          </span>

          <div className="flex gap-2">
            {hasTenOfDiamonds && (
              <span className="bg-red-600 text-white px-2 py-1 rounded-full text-sm">
                10♦
              </span>
            )}
            {hasTwoOfClubs && (
              <span className="bg-green-600 text-white px-2 py-1 rounded-full text-sm">
                2♣
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CapturedCards;