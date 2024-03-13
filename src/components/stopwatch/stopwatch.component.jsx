import React, {
  useEffect,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { useStopwatch } from 'react-timer-hook';
import { GameStateContext } from '../../contexts/game-state.context';
import { GameSettingsContext } from '../../contexts/game-settings.context';

import './stopwatch.styles.scss';

const StopwatchComponent = () => {
  const { firstFlipAtStart } = useContext(GameStateContext);

  const { seconds, minutes, start } = useStopwatch({
    autoStart: false,
  });

  useEffect(() => {
    if (firstFlipAtStart) {
      start();
    }
  }, [firstFlipAtStart]); // TODO start is causing an infinite render loop, need to address it later

  return (
    <div className="stopwatch-container">
      <div className="stopwatch">
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
};

export default StopwatchComponent;
