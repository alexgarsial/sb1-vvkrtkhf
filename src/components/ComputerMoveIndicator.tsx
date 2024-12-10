import React, { useState } from 'react';
import { Card as CardType } from '../types/game';
import { motion } from 'framer-motion';
import Card from './Card';
import { ArrowDown } from 'lucide-react';
import CardAnimation from './CardAnimation';

interface ComputerMoveIndicatorProps {
  selectedCard: CardType;
  capturedCards: CardType[];
}

const ComputerMoveIndicator: React.FC<ComputerMoveIndicatorProps> = ({
  selectedCard,
  capturedCards
}) => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [showCapture, setShowCapture] = useState(false);

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    if (capturedCards.length > 0) {
      setShowCapture(true);
    }
  };

  if (showAnimation) {
    return <CardAnimation card={selectedCard} onComplete={handleAnimationComplete} />;
  }

  if (capturedCards.length === 0) {
    return (
      <motion.div
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600/80 backdrop-blur-sm 
          text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <ArrowDown className="w-5 h-5" />
        <span>L'ordinateur dépose une carte</span>
      </motion.div>
    );
  }

  if (showCapture) {
    return (
      <motion.div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white/10 p-8 rounded-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-white text-2xl font-bold mb-2">Capture!</h3>
            <p className="text-yellow-400">
              L'ordinateur capture {capturedCards.length} carte{capturedCards.length > 1 ? 's' : ''}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <div>
              <p className="text-white text-center mb-2">Avec:</p>
              <Card card={selectedCard} isSelectable={false} />
            </div>

            <div>
              <p className="text-white text-center mb-2">Cartes capturées:</p>
              <div className="flex gap-2">
                {capturedCards.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Card card={card} isSelectable={false} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return null;
};

export default ComputerMoveIndicator;