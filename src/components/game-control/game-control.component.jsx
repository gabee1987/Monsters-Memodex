import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';

import { GameStateContext } from '../../contexts/game-state.context';
import { GameSettingsContext } from '../../contexts/game-settings.context';
import {
  MODE_SETTING_TYPES,
  DEFAULT_TURN_VALUES,
  calculateTurnValue,
} from '../../contexts/game-settings.context';

import TimerComponent from '../timer/timer.component';
import StopwatchComponent from '../stopwatch/stopwatch.component';
import MotionButton from '../framer-motion-components/motion.button';

import {
  getGameControlParentVariants,
  gameControlButtonVariants,
} from '../../utilities/animation-helper';

import './game-control.styles.scss';

const GameControls = ({ newGameClick, firstFlip, isNewGameButtonDisabled }) => {
  const { turns } = useContext(GameStateContext);
  const { gameMode, numberOfPairs } = useContext(GameSettingsContext);
  const { isNeedStaggerAnimation } = useContext(GameStateContext);
  const { isGamePaused, setIsGamePaused } = useContext(GameStateContext);

  const handlePauseClick = () => {
    setIsGamePaused(!isGamePaused);
  };

  return (
    <motion.div
      className="game-control-button-container"
      variants={getGameControlParentVariants(isNeedStaggerAnimation)}
      initial="hidden"
      animate="show"
    >
      <MotionButton
        className="game-control new-game-btn"
        onClick={newGameClick}
        variants={gameControlButtonVariants}
        disabled={isNewGameButtonDisabled}
      >
        NEW GAME
      </MotionButton>

      <MotionButton
        className="btn game-control pause-btn"
        onClick={handlePauseClick}
        variants={gameControlButtonVariants}
        disabled={isNewGameButtonDisabled}
      >
        {isGamePaused ? '▶ RESUME' : '|| PAUSE'}
      </MotionButton>

      {gameMode === MODE_SETTING_TYPES.FREE && (
        <motion.button
          className="btn game-control game-stat time-passed-btn"
          variants={gameControlButtonVariants}
        >
          TIME PASSED: <StopwatchComponent />
        </motion.button>
      )}

      {gameMode === MODE_SETTING_TYPES.TIME_BASED && (
        <motion.button
          className="btn game-control game-stat time-left-btn"
          variants={gameControlButtonVariants}
        >
          TIME LEFT: <TimerComponent />
        </motion.button>
      )}
      {gameMode === MODE_SETTING_TYPES.TURN_BASED && (
        <motion.button
          className="btn game-control game-stat turn-left-btn"
          variants={gameControlButtonVariants}
        >
          TURNS LEFT:<span>{calculateTurnValue(numberOfPairs) - turns}</span>
        </motion.button>
      )}
      <motion.button
        className="btn game-control game-stat turn-taken-btn"
        variants={gameControlButtonVariants}
      >
        TURNS: {turns}
      </motion.button>
    </motion.div>
  );
};

export default GameControls;
