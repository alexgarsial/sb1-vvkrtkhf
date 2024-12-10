import React from 'react';
import { Card as CardType } from '../types/game';
import { motion } from 'framer-motion';

interface CardProps {
  card: CardType;
  onClick?: () => void;
  isSelectable?: boolean;
  isHidden?: boolean;
  isSelected?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  card, 
  onClick, 
  isSelectable = false, 
  isHidden = false,
  isSelected = false
}) => {
  const getSuitColor = (suit: string) => {
    return suit === 'hearts' || suit === 'diamonds' ? 'text-red-600' : 'text-black';
  };

  const getSuitSymbol = (suit: string) => {
    switch (suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      default: return '';
    }
  };

  if (isHidden) {
    return (
      <motion.div 
        className="w-14 h-20 sm:w-16 sm:h-24 md:w-20 md:h-32 lg:w-24 lg:h-36
          bg-gradient-to-br from-blue-600 to-blue-800
          rounded-xl border-2 border-white/20
          shadow-lg hover:shadow-xl transition-shadow
          flex items-center justify-center p-2 m-1
          transform-gpu cursor-default"
      >
        <div className="w-full h-full rounded-lg border-2 border-white/10 bg-white/5 
          flex items-center justify-center">
          <div className="text-white/20 text-2xl sm:text-3xl md:text-4xl font-bold">♠</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      whileHover={isSelectable ? { scale: 1.05, y: -8 } : {}}
      whileTap={isSelectable ? { scale: 0.95 } : {}}
      onClick={isSelectable ? onClick : undefined}
      className={`
        w-14 h-20 sm:w-16 sm:h-24 md:w-20 md:h-32 lg:w-24 lg:h-36
        bg-white rounded-xl border-4 
        ${isSelected 
          ? 'border-yellow-400 ring-4 ring-yellow-400/50 shadow-yellow-400/30' 
          : isSelectable 
            ? 'border-blue-300 hover:border-blue-500 cursor-pointer' 
            : 'border-gray-300 cursor-default'
        }
        shadow-lg hover:shadow-xl 
        transition-all duration-200
        flex flex-col justify-between p-1 sm:p-2 m-1
        transform-gpu
      `}
    >
      <div className={`text-xs sm:text-sm md:text-base lg:text-lg font-bold ${getSuitColor(card.suit)}`}>
        {card.rank}
        <span className="ml-1">{getSuitSymbol(card.suit)}</span>
      </div>
      <div className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl self-center ${getSuitColor(card.suit)}`}>
        {getSuitSymbol(card.suit)}
      </div>
      <div className={`text-xs sm:text-sm md:text-base lg:text-lg font-bold rotate-180 ${getSuitColor(card.suit)}`}>
        {card.rank}
        <span className="ml-1">{getSuitSymbol(card.suit)}</span>
      </div>
    </motion.div>
  );
};

export default Card;