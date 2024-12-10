import React from 'react';
import { Card as CardType } from '../types/game';
import Card from './Card';
import { motion } from 'framer-motion';

interface TableCardsProps {
  cards: CardType[];
  selectedCards: CardType[];
  onCardClick: (card: CardType) => void;
  isSelectable: boolean;
}

const TableCards: React.FC<TableCardsProps> = ({
  cards,
  selectedCards,
  onCardClick,
  isSelectable
}) => {
  return (
    <motion.div 
      className={`
        bg-green-700/50 backdrop-blur-sm p-2 sm:p-4 rounded-xl sm:rounded-2xl mb-4 sm:mb-8 
        min-h-[160px] sm:min-h-[200px]
        border-4 ${isSelectable ? 'border-blue-300/50' : 'border-green-600/30'} 
        shadow-inner transition-all duration-200
        ${isSelectable ? 'hover:border-blue-300' : ''}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={`${card.suit}-${card.rank}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card
              card={card}
              isSelectable={isSelectable}
              onClick={() => onCardClick(card)}
              isSelected={selectedCards.includes(card)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TableCards;