import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { GameModeButtonProps } from './types';
import { buttonAnimation } from './animations';
import { buttonBaseStyles } from './styles';

const GameModeButton: React.FC<GameModeButtonProps> = ({ 
  icon: Icon, 
  label, 
  onClick,
  className = ''
}) => {
  return (
    <motion.button
      className={`${buttonBaseStyles} ${className}`}
      {...buttonAnimation}
      onClick={onClick}
    >
      <Icon className="w-6 h-6" />
      <span className="flex-1 text-left">{label}</span>
    </motion.button>
  );
};

export default GameModeButton;