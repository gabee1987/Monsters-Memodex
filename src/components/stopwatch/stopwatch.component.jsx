import React, {
  useEffect,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { TimeContext } from '../../contexts/time-context';

import './stopwatch.styles.scss';

const StopwatchComponent = () => {
  const { stopwatchMinutes, stopwatchSeconds } = useContext(TimeContext);

  return (
    <div className="stopwatch-container">
      <div className="stopwatch">
        {stopwatchMinutes.toString().padStart(2, '0')}:
        {stopwatchSeconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
};

export default StopwatchComponent;
