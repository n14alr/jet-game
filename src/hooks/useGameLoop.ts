import { useEffect } from 'react';
import { GAME_CONFIG } from '../components/Game';

export function useGameLoop({
  gameStarted,
  gameOver,           // Added gameOver parameter
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
}) {
  useEffect(() => {
    if (!gameStarted || gameOver) return;  // Added gameOver check

    const generateObstacle = () => {
      const minHeight = 50;
      const maxHeight = GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.OBSTACLE_GAP - minHeight;
      const height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
      
      return {
        x: GAME_CONFIG.GAME_WIDTH,
        topHeight: height,
        bottomHeight: GAME_CONFIG.GAME_HEIGHT - height - GAME_CONFIG.OBSTACLE_GAP,
        passed: false,
      };
    };

    const checkCollision = (jetY, obstacles) => {
      for (const obstacle of obstacles) {
        if (
          GAME_CONFIG.JET_POSITION_X + GAME_CONFIG.JET_SIZE > obstacle.x &&
          GAME_CONFIG.JET_POSITION_X < obstacle.x + GAME_CONFIG.OBSTACLE_WIDTH
        ) {
          if (jetY < obstacle.topHeight || jetY + GAME_CONFIG.JET_SIZE > GAME_CONFIG.GAME_HEIGHT - obstacle.bottomHeight) {
            return true;
          }
        }
      }
      return false;
    };

    const updateGame = () => {
      setJetPosition((prev) => {
        const newVelocity = spacePressed.current ? GAME_CONFIG.JUMP_FORCE : velocity + GAME_CONFIG.GRAVITY;
        setVelocity(newVelocity);
        return prev + newVelocity;
      });

      setObstacles((prevObstacles) => {
        let newObstacles = prevObstacles
          .map(obstacle => ({
            ...obstacle,
            x: obstacle.x - GAME_CONFIG.OBSTACLE_SPEED,
          }))
          .filter(obstacle => obstacle.x > -GAME_CONFIG.OBSTACLE_WIDTH);

        if (newObstacles.length === 0 || newObstacles[newObstacles.length - 1].x < GAME_CONFIG.GAME_WIDTH - 200) {
          newObstacles.push(generateObstacle());
        }

        newObstacles.forEach(obstacle => {
          if (!obstacle.passed && obstacle.x < GAME_CONFIG.JET_POSITION_X) {
            obstacle.passed = true;
            setScore(s => s + 1);
          }
        });

        return newObstacles;
      });

      if (
        jetPosition < 0 ||
        jetPosition > GAME_CONFIG.GAME_HEIGHT - GAME_CONFIG.JET_SIZE ||
        checkCollision(jetPosition, obstacles)
      ) {
        setGameOver(true);
        return;
      }

      frameRef.current = requestAnimationFrame(updateGame);
    };

    frameRef.current = requestAnimationFrame(updateGame);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [gameStarted, gameOver, velocity, obstacles]);  // Added gameOver to dependency array
}