import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Copy, ArrowRight } from 'lucide-react';
import { nanoid } from 'nanoid';
import WaitingRoom from './WaitingRoom';

interface LobbyScreenProps {
  onJoinGame: (gameId: string, playerNumber: number) => void;
}

const LobbyScreen: React.FC<LobbyScreenProps> = ({ onJoinGame }) => {
  const [gameCode, setGameCode] = useState('');
  const [waitingRoomId, setWaitingRoomId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createNewGame = () => {
    const newGameCode = nanoid(6).toUpperCase();
    setWaitingRoomId(newGameCode);
  };

  const joinExistingGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameCode.length === 6) {
      onJoinGame(gameCode.toUpperCase(), 2);
    }
  };

  const handleCancel = () => {
    setWaitingRoomId(null);
  };

  if (waitingRoomId) {
    return (
      <WaitingRoom 
        gameId={waitingRoomId} 
        onCancel={handleCancel}
        onStart={() => onJoinGame(waitingRoomId, 1)}
      />
    );
  }

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
          <p className="text-gray-600">Jouez avec un ami en ligne</p>
        </div>

        <div className="space-y-6">
          <motion.button
            className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={createNewGame}
          >
            <Users className="w-5 h-5" />
            Créer une nouvelle partie
          </motion.button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>

          <form onSubmit={joinExistingGame} className="space-y-4">
            <div>
              <label htmlFor="gameCode" className="block text-sm font-medium text-gray-700 mb-1">
                Rejoindre avec un code
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="gameCode"
                  maxLength={6}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-center uppercase tracking-widest text-lg font-mono"
                  placeholder="ABC123"
                  value={gameCode}
                  onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                />
              </div>
            </div>
            <motion.button
              type="submit"
              className="w-full bg-green-600 text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 font-semibold disabled:opacity-50"
              disabled={gameCode.length !== 6}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowRight className="w-5 h-5" />
              Rejoindre la partie
            </motion.button>
          </form>
        </div>

        {error && (
          <motion.div
            className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LobbyScreen;