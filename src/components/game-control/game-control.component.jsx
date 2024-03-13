import { useState, useEffect, useContext } from 'react';
import { GameStateContext } from '../../contexts/game-state.context';
import { GameSettingsContext } from '../../contexts/game-settings.context';

import { MODE_SETTING_TYPES } from '../../contexts/game-settings.context';

import TimerComponent from '../timer/timer.component';
import StopwatchComponent from '../stopwatch/stopwatch.component';

import './game-control.styles.scss';

const GameControls = ({ newGameClick, firstFlip }) => {
  const { turns } = useContext(GameStateContext);
  const { mode } = useContext(GameSettingsContext);

  return (
    <div className="button-container">
      <button className="btn game-control new-game-btn" onClick={newGameClick}>
        NEW GAME
      </button>

      {mode === MODE_SETTING_TYPES.FREE && (
        <button className="btn game-control game-stat time-passed-btn">
          TIME PASSED: <StopwatchComponent />
        </button>
      )}

      {mode === MODE_SETTING_TYPES.TIME_BASED && (
        <button className="btn game-control game-stat time-left-btn">
          TIME LEFT: <TimerComponent />
        </button>
      )}
      {mode === MODE_SETTING_TYPES.TURN_BASED && (
        <button className="btn game-control game-stat turn-left-btn">
          TURN LEFT: <span>TODO</span>
        </button>
      )}
      <button className="btn game-control game-stat turn-taken-btn">
        TURNS: {turns}
      </button>
    </div>
  );
};

export default GameControls;
