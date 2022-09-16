import { useContext, useEffect } from 'react';
import { GameStateContext } from '../../contexts/game-state.context';
import { GameSettingsContext } from '../../contexts/game-settings.context';

import { MODE_SETTING_TYPES } from '../../contexts/game-settings.context';

import Timer from '../timer/timer.component';

import './game-control.styles.scss';

const GameControls = ({ newGameClick }) => {
  const { turns } = useContext(GameStateContext);
  const { timerSecondsLeft } = useContext(GameStateContext);
  const { timerMinutesLeft } = useContext(GameStateContext);
  const { timeCounter } = useContext(GameStateContext);

  const { mode } = useContext(GameSettingsContext);

  // Convert the seconds to a time format
  function formatSeconds(timeToFormat) {
    const h = Math.floor(timeToFormat / 3600);
    const m = Math.floor((timeToFormat % 3600) / 60);
    const s = Math.round(timeToFormat % 60);
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
      .filter(Boolean)
      .join(':');
  }

  useEffect(() => {
    console.log('GAME CONTROL TIME: ', timerMinutesLeft, timerSecondsLeft);
  }, []);

  return (
    <div className="button-container">
      <button className="btn game-control new-game-btn" onClick={newGameClick}>
        NEW GAME
      </button>
      {mode === MODE_SETTING_TYPES.FREE && (
        <button className="btn game-control game-stat time-elapsed-btn">
          TIME: <span>{formatSeconds(timeCounter)}</span>
        </button>
      )}
      {mode === MODE_SETTING_TYPES.TIME_BASED && (
        <button className="btn game-control game-stat time-left-btn">
          TIME LEFT:{' '}
          <Timer
            minutesLeft={timerMinutesLeft}
            secondsLeft={timerSecondsLeft}
          />
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
