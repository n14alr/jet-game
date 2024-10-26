import React from 'react';

export function GameUI({ gameStarted, gameOver, score, onReset }) {
  return (
    <>
      {!gameStarted && !gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Jet Game</h1>
            <p className="text-xl">Press SPACE to start</p>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Game Over!</h2>
            <p className="text-2xl mb-4">Score: {score}</p>
            <button
              onClick={onReset}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 text-2xl font-bold text-white">
        Score: {score}
      </div>
    </>
  );
}