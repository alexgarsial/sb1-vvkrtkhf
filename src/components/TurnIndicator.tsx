import React from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TurnIndicatorProps {
  currentPlayer: number;
  isComputerThinking?: boolean;
  deckCount: number;
  tableCardsCount: number;
}

const TurnIndicator: React.FC<TurnIndicatorProps> = ({ 
  currentPlayer,
  isComputerThinking = false,
  deckCount,
  tableCardsCount
}) => {
  return (
    <div className="flex flex-col items-center gap-2 mb-4 sm:mb-6">
      <motion.div 
        className={`
          px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg flex items-center gap-2
          ${isComputerThinking 
            ? 'bg-gradient-to-r from-blue-600 to-blue-800' 
            : 'bg-gradient-to-r from-blue-600 to-blue-500'
          } text-white
        `}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          animate={isComputerThinking ? { rotate: 360 } : {}}
          transition={{ duration: 2, repeat: isComputerThinking ? Infinity : 0, ease: "linear" }}
        >
          <ArrowDownCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.div>
        <span className="text-sm sm:text-base md:text-lg font-bold">
          {isComputerThinking 
            ? "L'ordinateur réfléchit..." 
            : `Tour du Joueur ${currentPlayer}`
          }
        </span>
      </motion.div>

      <div className="flex gap-4 text-white text-xs sm:text-sm">
        <span>Pioche: {deckCount}</span>
        <span>Table: {tableCardsCount}</span>
      </div>
    </div>
  );
};

export default TurnIndicator;