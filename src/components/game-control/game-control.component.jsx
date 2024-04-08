import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';

import { GameStateContext } from '../../contexts/game-state.context';
import { GameSettingsContext } from '../../contexts/game-settings.context';
import { MODE_SETTING_TYPES } from '../../contexts/game-settings.context';

import TimerComponent from '../timer/timer.component';
import StopwatchComponent from '../stopwatch/stopwatch.component';

import './game-control.styles.scss';

const GameControls = ({ newGameClick, firstFlip }) => {
  const { turns } = useContext(GameStateContext);
  const { gameMode } = useContext(GameSettingsContext);

  const parentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.7 },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 5,
        mass: 0.2,
        duration: 0.25,
      },
    },
  };

  // const firstButtonVariants = {
  //   ...buttonVariants,
  //   show: {
  //     ...buttonVariants.show,
  //     transition: {
  //       ...buttonVariants.show.transition,
  //       delay: 0.7, // Delay for the first button
  //     },
  //   },
  // };

  return (
    <motion.div
      className="button-container"
      variants={parentVariants}
      initial="hidden"
      animate="show"
    >
      <motion.button
        className="btn game-control new-game-btn"
        onClick={newGameClick}
        variants={buttonVariants}
      >
        NEW GAME
      </motion.button>

      {gameMode === MODE_SETTING_TYPES.FREE && (
        <motion.button
          className="btn game-control game-stat time-passed-btn"
          variants={buttonVariants}
        >
          TIME PASSED: <StopwatchComponent />
        </motion.button>
      )}

      {gameMode === MODE_SETTING_TYPES.TIME_BASED && (
        <motion.button
          className="btn game-control game-stat time-left-btn"
          variants={buttonVariants}
        >
          TIME LEFT: <TimerComponent />
        </motion.button>
      )}
      {gameMode === MODE_SETTING_TYPES.TURN_BASED && (
        <motion.button
          className="btn game-control game-stat turn-left-btn"
          variants={buttonVariants}
        >
          TURN LEFT: <span>TODO</span>
        </motion.button>
      )}
      <motion.button
        className="btn game-control game-stat turn-taken-btn"
        variants={buttonVariants}
      >
        TURNS: {turns}
      </motion.button>
    </motion.div>
  );
};

export default GameControls;
