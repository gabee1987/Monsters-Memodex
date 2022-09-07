import { useContext } from 'react';
import { GameStateContext } from '../../contexts/game-state.context';

import './game-control.styles.scss';

const GameControls = ({ newGameClick, stopWatchSeconds }) => {
  const { turns } = useContext(GameStateContext);

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
      <button className="btn new-game-btn" onClick={newGameClick}>
        NEW GAME
      </button>
      <button className="btn time-counter">
        {/* TIME: <span>{stopWatchMinutes}</span>:{stopWatchSeconds} */}
        TIME: <span>{formatTime(stopWatchSeconds)}</span>
      </button>
      <button className="btn turn-counter">TURNS: {turns}</button>
    </div>
  );
};

export default GameControls;
