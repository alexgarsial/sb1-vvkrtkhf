import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Users } from 'lucide-react';

interface GameModeSelectorProps {
  onSelectMode: (mode: 'computer' | 'multiplayer') => void;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onSelectMode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <motion.div 
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Game of 11</h1>
          <p className="text-gray-600">Choisissez votre mode de jeu</p>
        </div>

        <div className="space-y-4">
          <motion.button
            className="w-full bg-blue-600 text-white rounded-lg py-4 px-6 flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode('computer')}
          >
            <Bot className="w-6 h-6" />
            <span className="flex-1 text-left">Jouer contre l'ordinateur</span>
          </motion.button>

          <motion.button
            className="w-full bg-green-600 text-white rounded-lg py-4 px-6 flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode('multiplayer')}
          >
            <Users className="w-6 h-6" />
            <span className="flex-1 text-left">Jouer à deux</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default GameModeSelector;