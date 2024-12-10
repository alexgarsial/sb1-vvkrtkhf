import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Users } from 'lucide-react';
import GameModeButton from './GameModeButton';
import { GameModeSelectorProps } from './types';
import { containerStyles, cardStyles } from './styles';
import { cardAnimation } from './animations';

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onSelectMode }) => {
  return (
    <div className={containerStyles}>
      <motion.div 
        className={cardStyles}
        {...cardAnimation}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Game of 11</h1>
          <p className="text-white/80">Choisissez votre mode de jeu</p>
        </div>

        <div className="space-y-4">
          <GameModeButton
            icon={Bot}
            label="Jouer contre l'ordinateur"
            onClick={() => onSelectMode('computer')}
          />
          <GameModeButton
            icon={Users}
            label="Jouer à deux"
            onClick={() => onSelectMode('multiplayer')}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default GameModeSelector;