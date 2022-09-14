import { useState, useEffect, useContext } from 'react';
import { useTimer } from 'react-timer-hook';

import { GameStateContext } from '../../contexts/game-state.context.jsx';
import { GameSettingsContext } from '../../contexts/game-settings.context.jsx';

const Timer = () => {
  const { timeLeft, setTimeLeft } = useContext(GameStateContext);

  // Convert the seconds to a time format
  function formatTime(timeToFormat) {
    const h = Math.floor(timeToFormat / 3600);
    const m = Math.floor((timeToFormat % 3600) / 60);
    const s = Math.round(timeToFormat % 60);
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
      .filter(Boolean)
      .join(':');
  }

  return (
    <div>
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
};

export default Timer;
