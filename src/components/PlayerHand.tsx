import React from 'react';
import { Card as CardType } from '../types/game';
import Card from './Card';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface PlayerHandProps {
  cards: CardType[];
  isOpponent?: boolean;
  selectedCard?: CardType | null;
  onCardClick?: (card: CardType) => void;
  isCurrentPlayer?: boolean;
  playerName: string;
  score: number;
}

const PlayerHand: React.FC<PlayerHandProps> = ({
  cards,
  isOpponent = false,
  selectedCard,
  onCardClick,
  isCurrentPlayer = false,
  playerName,
  score
}) => {
  return (
    <motion.div 
      className={`mb-4 sm:mb-8 ${isCurrentPlayer ? 'opacity-100' : 'opacity-70'}`}
      initial={{ opacity: 0, y: isOpponent ? -20 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-2 sm:mb-4">
        <motion.div 
          className="inline-flex items-center gap-2 bg-blue-600/80 backdrop-blur-sm 
            px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          <div className="text-white text-sm sm:text-base md:text-lg font-bold">
            {playerName}
          </div>
        </motion.div>
      </div>
      <div className="flex justify-center flex-wrap gap-1 sm:gap-2">
        {cards.map((card, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={selectedCard === card ? 'transform -translate-y-4' : ''}
          >
            <Card
              card={card}
              isSelectable={isCurrentPlayer && !isOpponent}
              onClick={() => onCardClick?.(card)}
              isHidden={isOpponent}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PlayerHand;