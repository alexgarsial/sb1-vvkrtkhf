import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import { Card as CardType } from '../types/game';

interface CardAnimationProps {
  card: CardType;
  onComplete: () => void;
}

const CardAnimation: React.FC<CardAnimationProps> = ({ card, onComplete }) => {
  return (
    <motion.div
      className="fixed top-[15%] right-[15%] z-50"
      initial={{ 
        x: 0,
        y: 0,
        rotate: 15,
        scale: 0.8,
        opacity: 0
      }}
      animate={{ 
        x: -200,
        y: 200,
        rotate: 0,
        scale: 1,
        opacity: 1
      }}
      transition={{ 
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1], // Custom bezier curve pour un effet plus dynamique
        opacity: { duration: 0.2 }
      }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        initial={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
        animate={{ 
          boxShadow: "0 20px 25px rgba(0, 0, 0, 0.15)",
          y: [0, -10, 0]
        }}
        transition={{
          boxShadow: { duration: 0.2 },
          y: { duration: 0.5, ease: "easeOut" }
        }}
      >
        <Card card={card} isSelectable={false} />
      </motion.div>
    </motion.div>
  );
};

export default CardAnimation;