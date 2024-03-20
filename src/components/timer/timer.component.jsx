import React, { useContext } from 'react';

import { TimerContext } from '../../contexts/timer-context';

import './timer.styles.scss';

const TimerComponent = () => {
  const { timerSeconds, timerMinutes, timerIsRunning } =
    useContext(TimerContext);
  // useEffect(() => {
  //   if (timerState.wasPaused) {
  //     // Calculate new expiry timestamp based on remaining time
  //     const newExpiryTime = new Date();
  //     newExpiryTime.setSeconds(
  //       newExpiryTime.getSeconds() + timerState.remainingTime
  //     );

  //     restartTimer(newExpiryTime);
  //     setTimerState({ ...timerState, wasPaused: false }); // Reset the pause flag
  //   }
  // }, [timerState, restartTimer, setTimerState]);

  // const {
  //   seconds: stopWatchSeconds,
  //   isRunning: stopWatchIsRunning,
  //   start: startStopWatch,
  //   pause: pauseStopWatch,
  //   reset: resetStopWatch,
  // } = useStopwatch({ autoStart: false });

  // Pause/start the timer when a game starts or pauses
  // useEffect(() => {
  //   if (mode === MODE_SETTING_TYPES.TIME_BASED) {
  //     if (gamePaused) {
  //       pauseTimer();
  //       console.log('Timer paused at: ', timerMinutes, timerSeconds);
  //     } else if (!gamePaused && gameInProgress) {
  //       resumeTimer();
  //       console.log('Timer continued at: ', timerMinutes, timerSeconds);
  //     }
  //   }
  // }, [gamePaused]);

  // Start the stopwatch when a game starts
  // useEffect(() => {
  //   if (mode === MODE_SETTING_TYPES.FREE) {
  //     if (gameInProgress && needNewGame) {
  //       resetStopWatch(null, false);
  //       startStopWatch();
  //       console.log('time counter started...');
  //     } else if (needNewGame && !gameInProgress) {
  //       pauseStopWatch();
  //       resetStopWatch(null, false);
  //     }
  //   }
  // }, [gameInProgress]);

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
