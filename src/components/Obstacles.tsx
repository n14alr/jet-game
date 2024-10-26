import React from 'react';
import { GAME_CONFIG } from './Game';

export function Obstacles({ obstacles }) {
  return (
    <>
      {obstacles.map((obstacle, index) => (
        <React.Fragment key={index}>
          {/* Top obstacle */}
          <div
            className="absolute bg-gradient-to-b from-green-700 to-green-900"
            style={{
              left: `${obstacle.x}px`,
              height: `${obstacle.topHeight}px`,
              width: `${GAME_CONFIG.OBSTACLE_WIDTH}px`,
              borderBottomLeftRadius: '10px',
              borderBottomRightRadius: '10px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-green-800 rounded-b-lg" />
          </div>
          
          {/* Bottom obstacle */}
          <div
            className="absolute bg-gradient-to-b from-green-900 to-green-700 bottom-0"
            style={{
              left: `${obstacle.x}px`,
              height: `${obstacle.bottomHeight}px`,
              width: `${GAME_CONFIG.OBSTACLE_WIDTH}px`,
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-4 bg-green-800 rounded-t-lg" />
          </div>
        </React.Fragment>
      ))}
    </>
  );
}