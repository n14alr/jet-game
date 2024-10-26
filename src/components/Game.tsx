import React, { useEffect, useRef, useState } from 'react';
import { GameUI } from './GameUI';
import { Jet } from './Jet';
import { Obstacles } from './Obstacles';
import { useGameLoop } from '../hooks/useGameLoop';
import { useControls } from '../hooks/useControls';

export const GAME_CONFIG = {
  GRAVITY: 0.4,
  JUMP_FORCE: -6,
  OBSTACLE_SPEED: 2,
  OBSTACLE_GAP: 250,
  OBSTACLE_WIDTH: 60,
  GAME_WIDTH: 800,
  GAME_HEIGHT: 600,
  JET_POSITION_X: 100,
  JET_SIZE: 40,        // Reduced from 50 to 40
};

export default function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [jetPosition, setJetPosition] = useState(GAME_CONFIG.GAME_HEIGHT / 2);
  const [velocity, setVelocity] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const frameRef = useRef();

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setJetPosition(GAME_CONFIG.GAME_HEIGHT / 2);
    setVelocity(0);
    setObstacles([]);
  };

  const { spacePressed } = useControls({ gameStarted, gameOver, setGameStarted });

  useGameLoop({
    gameStarted,
    gameOver,           // Added gameOver to useGameLoop props
    setGameOver,
    setJetPosition,
    setVelocity,
    setObstacles,
    setScore,
    velocity,
    jetPosition,
    obstacles,
    spacePressed,
    frameRef,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center">
      <div className="relative w-[800px] h-[600px] bg-gradient-to-b from-blue-200 to-blue-400 overflow-hidden rounded-lg shadow-2xl">
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
                animation: `float ${5 + Math.random() * 5}s linear infinite`,
                animationDelay: `${-Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
        <Jet position={jetPosition} velocity={velocity} gameOver={gameOver} />
        <Obstacles obstacles={obstacles} />
        <GameUI
          gameStarted={gameStarted}
          gameOver={gameOver}
          score={score}
          onReset={resetGame}
        />
      </div>
    </div>
  );
}