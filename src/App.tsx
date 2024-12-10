import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import GameModeSelector from './components/GameModeSelector';
import LobbyScreen from './components/LobbyScreen';

interface GameState {
  mode: 'computer' | 'multiplayer' | null;
  inGame: boolean;
  gameId?: string;
  playerNumber?: number;
}

function App() {
  const [gameState, setGameState] = useState<GameState>({
    mode: null,
    inGame: false
  });

  const handleSelectMode = (mode: 'computer' | 'multiplayer') => {
    setGameState({
      mode,
      inGame: mode === 'computer'
    });
  };

  const handleJoinGame = (gameId: string, playerNumber: number) => {
    setGameState({
      mode: 'multiplayer',
      inGame: true,
      gameId,
      playerNumber
    });
  };

  const handleBack = () => {
    setGameState({
      mode: null,
      inGame: false
    });
  };

  // Si on est en mode ordinateur ou si la partie est déjà commencée
  if (gameState.inGame) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-3xl font-bold">Game of 11</h1>
          <p className="text-sm mt-2">
            {gameState.mode === 'computer' ? 'Mode Ordinateur' : 'Mode Multijoueur'}
          </p>
          {gameState.gameId && (
            <p className="text-sm mt-1 bg-blue-700 inline-block px-3 py-1 rounded-full">
              Code partie: {gameState.gameId}
            </p>
          )}
        </header>
        <GameBoard 
          isComputerOpponent={gameState.mode === 'computer'}
          gameId={gameState.gameId}
          playerNumber={gameState.playerNumber}
        />
      </div>
    );
  }

  // Si on est en mode multijoueur mais pas encore en partie
  if (gameState.mode === 'multiplayer') {
    return <LobbyScreen onJoinGame={handleJoinGame} onBack={handleBack} />;
  }

  // Écran de sélection du mode de jeu
  return <GameModeSelector onSelectMode={handleSelectMode} />;
}

export default App;