import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Loader } from 'lucide-react';
import { socketService } from '../services/socketService';

interface WaitingRoomProps {
  gameId: string;
  onCancel: () => void;
  onStart: () => void;
}

const WaitingRoom: React.FC<WaitingRoomProps> = ({ gameId, onCancel, onStart }) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const socket = socketService.connect(gameId, 1);

    socket.on('player_joined', () => {
      onStart();
    });

    return () => {
      socketService.disconnect();
    };
  }, [gameId, onStart]);

  const copyGameId = () => {
    navigator.clipboard.writeText(gameId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-center justify-center mb-6">
          <Loader className="w-6 h-6 text-blue-600 animate-spin mr-3" />
          <h2 className="text-2xl font-bold">En attente d'un autre joueur</h2>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2">Code de la partie :</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-white px-4 py-2 rounded border border-gray-300 font-mono text-lg">
              {gameId}
            </code>
            <button
              onClick={copyGameId}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              title="Copier le code"
            >
              <Copy className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="text-center text-gray-600 mb-6">
          <p>Partagez ce code avec votre adversaire pour qu'il puisse rejoindre la partie.</p>
        </div>

        <button
          onClick={onCancel}
          className="w-full bg-gray-200 text-gray-800 rounded-lg py-2 px-4 hover:bg-gray-300 transition-colors"
        >
          Annuler
        </button>

        {copied && (
          <motion.div
            className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            Code copié !
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default WaitingRoom;