import { useContext } from 'react';
import { GameStateContext } from '../../contexts/game-state.context';
import { GameSettingsContext } from '../../contexts/game-settings.context';

import { MODE_SETTING_TYPES } from '../../contexts/game-settings.context';

import './game-control.styles.scss';

const GameControls = ({ newGameClick, stopWatchSeconds, timerSeconds }) => {
  const { turns } = useContext(GameStateContext);
  const { mode } = useContext(GameSettingsContext);

  // Convert the seconds to a time format
  function formatTime(stopWatchSeconds) {
    const h = Math.floor(stopWatchSeconds / 3600);
    const m = Math.floor((stopWatchSeconds % 3600) / 60);
    const s = Math.round(stopWatchSeconds % 60);
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
      .filter(Boolean)
      .join(':');
  }

  return (
    <div className="button-container">
      <button className="btn game-control new-game-btn" onClick={newGameClick}>
        NEW GAME
      </button>
      {mode === MODE_SETTING_TYPES.FREE && (
        <button className="btn game-control game-stat time-elapsed-btn">
          TIME: <span>{formatTime(stopWatchSeconds)}</span>
        </button>
      )}
      {mode === MODE_SETTING_TYPES.TIME_BASED && (
        <button className="btn game-control game-stat time-left-btn">
          TIME LEFT: <span>{formatTime(timerSeconds)}</span>
        </button>
      )}
      {mode === MODE_SETTING_TYPES.TURN_BASED && (
        <button className="btn game-control game-stat turn-left-btn">
          TURN LEFT: <span>{formatTime(stopWatchSeconds)}</span>
        </button>
      )}
      <button className="btn game-control game-stat turn-taken-btn">
        TURNS: {turns}
      </button>
    </div>
  );
};

export default GameControls;
