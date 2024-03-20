import React, { useContext } from 'react';
import { TimeContext } from '../../contexts/time-context';

import './timer.styles.scss';

const TimerComponent = () => {
  const { timerSeconds, timerMinutes, timerIsRunning } =
    useContext(TimeContext);

  // Pause/start the stopwatch when a game starts or pauses
  // useEffect(() => {
  //   if (gamePaused) {
  //     pauseStopWatch();
  //     console.log('Time counter paused!');
  //   } else if (!gamePaused && gameInProgress) {
  //     startStopWatch();
  //     console.log('Time counter continued...');
  //   }
  // }, [gamePaused]);

  // Stop the game if the timer is up
  // useEffect(() => {}, []);

  // Update the stopwatch time at every seconds
  // useEffect(() => {
  //   // console.log('time counter at: ', stopWatchSeconds);
  //   setTimeCounter(stopWatchSeconds);
  // }, [stopWatchSeconds]);

  // Update the timer at every seconds
  // useEffect(() => {
  //   // console.log('timer at: ', timerSeconds);
  //   setTimerSecondsLeft(timerSeconds);
  // }, [timerSeconds]);

  // Update the timer at every minutes
  // useEffect(() => {
  //   // console.log('timer at: ', timerSeconds);
  //   setTimerMinutesLeft(timerMinutes);
  // }, [timerMinutes]);

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
