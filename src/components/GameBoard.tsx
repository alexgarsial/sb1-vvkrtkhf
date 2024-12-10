import React, { useEffect } from 'react';
import { Card as CardType } from '../types/game';
import PlayerHand from './PlayerHand';
import TableCards from './TableCards';
import TurnIndicator from './TurnIndicator';
import CapturedCards from './CapturedCards';
import ComputerMoveIndicator from './ComputerMoveIndicator';
import GameOverModal from './GameOverModal';
import { useGameState } from '../hooks/useGameState';
import { useCardSelection } from '../hooks/useCardSelection';
import { useComputerPlayer } from '../hooks/useComputerPlayer';

interface GameBoardProps {
  isComputerOpponent?: boolean;
  gameId?: string;
  playerNumber?: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ 
  isComputerOpponent = false,
  gameId,
  playerNumber 
}) => {
  const {
    gameState,
    playMove,
    initializeGame,
    startNewMatch
  } = useGameState(isComputerOpponent);

  const {
    selectedCard,
    selectedTableCards,
    handleCardSelect,
    handleTableCardSelect,
    handlePlaceCard,
    clearSelection
  } = useCardSelection(playMove, gameState.tableCards);

  const {
    computerMove,
    isComputerThinking
  } = useComputerPlayer(isComputerOpponent, gameState, playMove);

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card: CardType, playerNum: number) => {
    if (gameState.currentPlayer !== playerNum || isComputerThinking) return;
    if (isComputerOpponent && playerNum === 2) return;
    handleCardSelect(card);
  };

  return (
    <div className="min-h-screen bg-green-800 p-4">
      <div className="max-w-7xl mx-auto">
        <TurnIndicator 
          currentPlayer={gameState.currentPlayer}
          isComputerThinking={isComputerThinking}
          deckCount={gameState.deck.length}
          tableCardsCount={gameState.tableCards.length}
        />

        <PlayerHand
          cards={gameState.players[1].cards}
          isOpponent={isComputerOpponent}
          selectedCard={gameState.currentPlayer === 2 ? selectedCard : null}
          onCardClick={(card) => handleCardClick(card, 2)}
          isCurrentPlayer={gameState.currentPlayer === 2}
          playerName={`${gameState.players[1].name} (${gameState.players[1].matchPoints} pts)`}
          score={gameState.players[1].score}
        />

        <CapturedCards
          cards={gameState.players[1].capturedCards}
          playerName={gameState.players[1].name}
        />

        <TableCards
          cards={gameState.tableCards}
          selectedCards={selectedTableCards}
          onCardClick={handleTableCardSelect}
          isSelectable={!!selectedCard && !isComputerThinking}
        />

        <CapturedCards
          cards={gameState.players[0].capturedCards}
          playerName={gameState.players[0].name}
        />

        <PlayerHand
          cards={gameState.players[0].cards}
          isOpponent={false}
          selectedCard={gameState.currentPlayer === 1 ? selectedCard : null}
          onCardClick={(card) => handleCardClick(card, 1)}
          isCurrentPlayer={gameState.currentPlayer === 1}
          playerName={`${gameState.players[0].name} (${gameState.players[0].matchPoints} pts)`}
          score={gameState.players[0].score}
        />

        {selectedCard && !isComputerThinking && (
          <div className="fixed bottom-4 right-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
              onClick={handlePlaceCard}
            >
              {selectedTableCards.length > 0 ? "Confirmer la capture" : "Déposer sur le tapis"}
            </button>
          </div>
        )}

        {computerMove && (
          <ComputerMoveIndicator
            selectedCard={computerMove.card}
            capturedCards={computerMove.capturedCards}
          />
        )}

        {gameState.isGameOver && (
          <GameOverModal
            players={gameState.players}
            matchWinner={gameState.matchWinner}
            onNewGame={initializeGame}
            onNewMatch={startNewMatch}
          />
        )}
      </div>
    </div>
  );
};

export default GameBoard;