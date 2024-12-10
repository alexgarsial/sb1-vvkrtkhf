import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Sword } from 'lucide-react';

interface MoveOptionsProps {
  onPlaceCard: () => void;
  hasCombinations: boolean;
  isJackMove: boolean;
}

const MoveOptions: React.FC<MoveOptionsProps> = ({ 
  onPlaceCard, 
  hasCombinations,
  isJackMove 
}) => {
  return (
    <motion.div 
      className="fixed bottom-4 right-4 flex gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {!isJackMove && (
        <motion.button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPlaceCard}
        >
          <Plus className="w-5 h-5" />
          <span>Déposer sur le tapis</span>
        </motion.button>
      )}

      {(hasCombinations || isJackMove) && (
        <motion.div
          className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Sword className="w-5 h-5" />
          <span>
            {isJackMove 
              ? "Sélectionnez les cartes à prendre avec le Valet"
              : "Sélectionnez les cartes à capturer"}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MoveOptions;