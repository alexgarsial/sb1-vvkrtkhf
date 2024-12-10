import React from 'react';
import { motion } from 'framer-motion';
import { Users, Bot, ArrowRight } from 'lucide-react';

interface GameModeScreenProps {
  onSelectMode: (mode: 'computer' | 'multiplayer') => void;
}

const GameModeScreen: React.FC<GameModeScreenProps> = ({ onSelectMode }) => {
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
            className="w-full bg-blue-600 text-white rounded-lg py-4 px-6 flex items-center justify-between font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode('computer')}
          >
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6" />
              <span>Jouer contre l'ordinateur</span>
            </div>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            className="w-full bg-green-600 text-white rounded-lg py-4 px-6 flex items-center justify-between font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectMode('multiplayer')}
          >
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6" />
              <span>Jouer en multijoueur</span>
            </div>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default GameModeScreen;