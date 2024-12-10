import React from 'react';
import { Player } from '../types/game';
import { motion } from 'framer-motion';
import { Trophy, Club, Diamond, Library } from 'lucide-react';

interface GameOverModalProps {
  players: Player[];
  matchWinner: number | null;
  onNewGame: () => void;
  onNewMatch: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  players,
  matchWinner,
  onNewGame,
  onNewMatch
}) => {
  const getPlayerStats = (player: Player, otherPlayer: Player) => {
    const tenOfDiamonds = player.capturedCards.some(
      card => card.rank === '10' && card.suit === 'diamonds'
    );
    const twoOfClubs = player.capturedCards.some(
      card => card.rank === '2' && card.suit === 'clubs'
    );
    const clubsCount = player.capturedCards.filter(card => card.suit === 'clubs').length;
    const otherClubsCount = otherPlayer.capturedCards.filter(card => card.suit === 'clubs').length;
    const cardsCount = player.capturedCards.length;
    const otherCardsCount = otherPlayer.capturedCards.length;

    return {
      tenOfDiamonds,
      twoOfClubs,
      clubsCount,
      mostClubs: clubsCount > otherClubsCount,
      equalClubs: clubsCount === otherClubsCount,
      mostCards: cardsCount > otherCardsCount,
      equalCards: cardsCount === otherCardsCount,
      totalCards: cardsCount
    };
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div 
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-4 sm:p-6 md:p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
          {matchWinner ? (
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              <span>{players[matchWinner - 1].name} gagne le match!</span>
            </div>
          ) : (
            "Fin de la partie"
          )}
        </h2>

        <div className="space-y-4 sm:space-y-6 mb-4 sm:mb-6">
          {players.map((player, index) => {
            const stats = getPlayerStats(player, players[1-index]);
            return (
              <div key={player.id} className="bg-gray-100 rounded-lg p-3 sm:p-4">
                <h3 className="font-bold text-base sm:text-lg mb-2">{player.name}</h3>
                <div className="space-y-2 text-sm sm:text-base">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Diamond className="w-4 h-4" />
                      <span>10♦</span>
                    </div>
                    <span className={stats.tenOfDiamonds ? "text-green-600" : "text-gray-500"}>
                      {stats.tenOfDiamonds ? "+1 point" : "0 point"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Club className="w-4 h-4" />
                      <span>2♣</span>
                    </div>
                    <span className={stats.twoOfClubs ? "text-green-600" : "text-gray-500"}>
                      {stats.twoOfClubs ? "+1 point" : "0 point"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Club className="w-4 h-4" />
                      <span>Trèfles ({stats.clubsCount})</span>
                    </div>
                    <span className={stats.mostClubs || stats.equalClubs ? "text-green-600" : "text-gray-500"}>
                      {stats.mostClubs ? "+1 point" : stats.equalClubs ? "+0.5 point" : "0 point"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Library className="w-4 h-4" />
                      <span>Cartes ({stats.totalCards})</span>
                    </div>
                    <span className={stats.mostCards || stats.equalCards ? "text-green-600" : "text-gray-500"}>
                      {stats.mostCards ? "+2 points" : stats.equalCards ? "+1 point" : "0 point"}
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between font-bold">
                      <span>Total cette partie:</span>
                      <span className="text-blue-600">+{player.score} points</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Score total:</span>
                      <span className="text-blue-600">{player.matchPoints} points</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={matchWinner ? onNewMatch : onNewGame}
          className="w-full bg-blue-600 text-white px-4 py-2 sm:py-3 rounded-lg hover:bg-blue-700 
            transition-colors font-semibold flex items-center justify-center gap-2"
        >
          <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
          {matchWinner ? "Nouveau Match" : "Nouvelle Partie"}
        </button>
      </motion.div>
    </div>
  );
};

export default GameOverModal;