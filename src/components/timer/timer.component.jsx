import React, { useContext } from 'react';
import { TimeContext } from '../../contexts/time-context';

import './timer.styles.scss';

const TimerComponent = () => {
  const { timerSeconds, timerMinutes, timerIsRunning } =
    useContext(TimeContext);

  return (
    <div className="timer-container">
      <div className="timer">
        {String(timerMinutes).padStart(2, '0')}:
        {String(timerSeconds).padStart(2, '0')}
      </div>
    </div>
  );
};

export default TimerComponent;
