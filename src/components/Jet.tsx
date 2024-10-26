import React from 'react';
import { GAME_CONFIG } from './Game';

export function Jet({ position, velocity, gameOver }) {
  const rotation = Math.min(Math.max(velocity * 3, -45), 45);

  return (
    <div
      className={`absolute transition-transform duration-75 z-10 ${
        gameOver ? 'animate-bounce' : ''
      }`}
      style={{
        left: `${GAME_CONFIG.JET_POSITION_X}px`,
        transform: `translateY(${position}px) rotate(${rotation}deg)`,
        width: `${GAME_CONFIG.JET_SIZE}px`,
        height: `${GAME_CONFIG.JET_SIZE}px`,
      }}
    >
      <div className="relative w-full h-full">
        {/* Jet body */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full transform scale-x-[2.5]" />
        
        {/* Cockpit */}
        <div className="absolute left-[60%] top-[30%] w-[20%] h-[40%] bg-sky-400 rounded-full" />
        
        {/* Wings */}
        <div className="absolute left-[40%] top-[-20%] w-[40%] h-[20%] bg-red-600 transform -skew-x-[30deg]" />
        <div className="absolute left-[40%] bottom-[-20%] w-[40%] h-[20%] bg-red-600 transform skew-x-[30deg]" />
        
        {/* Tail */}
        <div className="absolute right-[-10%] top-[35%] w-[20%] h-[30%] bg-red-600" />
        
        {/* Engine exhaust */}
        <div className="absolute right-[-20%] top-[45%] w-[15%] h-[10%] bg-orange-500 animate-pulse rounded-full" />
      </div>
    </div>
  );
}