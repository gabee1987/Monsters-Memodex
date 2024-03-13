import React, {
  useEffect,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { useTimer } from 'react-timer-hook';
import { GameStateContext } from '../../contexts/game-state.context';
import { GameSettingsContext } from '../../contexts/game-settings.context';
import { DEFAULT_TIMER_SECONDS } from '../../contexts/game-settings.context';

import './timer.styles.scss';

const GetTimerSeconds = (numOfCards) => {
  // console.log('card number: ', numOfCards);
  switch (numOfCards) {
    case '2':
      return DEFAULT_TIMER_SECONDS.TIMER_AT_2_CARDS;
    case '4':
      return DEFAULT_TIMER_SECONDS.TIMER_AT_4_CARDS;
    case '6':
      return DEFAULT_TIMER_SECONDS.TIMER_AT_6_CARDS;
    case '8':
      return DEFAULT_TIMER_SECONDS.TIMER_AT_8_CARDS;
    case '10':
      return DEFAULT_TIMER_SECONDS.TIMER_AT_10_CARDS;
    case '12':
      return DEFAULT_TIMER_SECONDS.TIMER_AT_12_CARDS;
    case '14':
      return DEFAULT_TIMER_SECONDS.TIMER_AT_14_CARDS;
    case '16':
      return DEFAULT_TIMER_SECONDS.TIMER_AT_16_CARDS;
    case '18':
      return DEFAULT_TIMER_SECONDS.TIMER_AT_18_CARDS;
    case '20':
      return DEFAULT_TIMER_SECONDS.TIMER_AT_20_CARDS;

    default:
      return DEFAULT_TIMER_SECONDS.TIMER_DEFAULT;
  }
};

const TimerComponent = () => {
  const { numberOfCards } = useContext(GameSettingsContext);
  const { firstFlipAtStart, needToRestartTimer, gameInProgress, needNewGame } =
    useContext(GameStateContext);
  console.log('what is needToRestartTimer hereee? -> ', needToRestartTimer);

  const expiryTimestamp = useMemo(() => {
    const newExpiryTime = new Date();
    const timerSeconds = GetTimerSeconds(numberOfCards);
    newExpiryTime.setSeconds(newExpiryTime.getSeconds() + timerSeconds);
    return newExpiryTime;
  }, [numberOfCards]);

  const handleExpire = useCallback(() => {
    console.warn('onExpire called');
  }, []);

  const {
    seconds: timerSeconds,
    minutes: timerMinutes,
    isRunning: timerIsRunning,
    start: startTimer,
    pause: pauseTimer,
    resume: resumeTimer,
    restart: restartTimer,
  } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => handleExpire(),
  });

  useEffect(() => {
    if (firstFlipAtStart) {
      startTimer();
    }
  }, [firstFlipAtStart, startTimer]);

  useEffect(() => {
    console.log('what is needToRestartTimer? -> ', needToRestartTimer);
    if (needToRestartTimer) {
      console.log('Expiry timestamp:', expiryTimestamp);
      restartTimer();
    }
  }, [needToRestartTimer]);

  // const SetInitialTimer = () => {
  //   if (mode !== MODE_SETTING_TYPES.TIME_BASED) {
  //     return;
  //   }
  //   let minutes = GetTimerMinutesBasedOnCardNumber(numberOfCards);
  //   let seconds = GetTimerSecondsBasedOnCardNumber(numberOfCards);
  //   console.log('set initial timer, seconds: ', seconds);
  //   setTimeout(() => setTimerMinutesLeft(minutes), 100);
  //   setTimeout(() => setTimerSecondsLeft(seconds), 100);
  // };

  // const StartTheTimer = () => {
  //   if (mode !== MODE_SETTING_TYPES.TIME_BASED) {
  //     return;
  //   }

  //   if (!gameInProgress) {
  //     restartTimer(expiryTimestamp);
  //   } else if (gamePaused) {
  //     resumeTimer();
  //   }
  // };

  // const PauseTheTimer = () => {
  //   if (mode !== MODE_SETTING_TYPES.TIME_BASED) {
  //     return;
  //   }
  //   pauseTimer();
  // };

  // const OnTimerExpire = () => {
  //   setGameInProgress(false);
  //   console.log('Time is expired! ', timerMinutes, timerSeconds);
  //   setGameOver(true);
  // };

  // const {
  //   seconds: stopWatchSeconds,
  //   isRunning: stopWatchIsRunning,
  //   start: startStopWatch,
  //   pause: pauseStopWatch,
  //   reset: resetStopWatch,
  // } = useStopwatch({ autoStart: false });

  // Start the timer on game start
  // useEffect(() => {
  //   setExpiryTimestamp(GetActualTimeInSeconds(GetTimerSeconds(numberOfCards)));

  //   if (mode === MODE_SETTING_TYPES.TIME_BASED) {
  //     if (gameInProgress && needNewGame) {
  //       restartTimer(expiryTimestamp);
  //     } else if (needNewGame && !gameInProgress) {
  //       restartTimer(expiryTimestamp, false);
  //     }
  //   }
  // }, [gameInProgress]);
  // TODO There are still some bugs relating to the first start of the timer

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

  // Reset the timer on start
  // useEffect(() => {
  //   if (mode === MODE_SETTING_TYPES.TIME_BASED) {
  //     if (needNewGame) {
  //       const newExpiryTimestamp = GetActualTimeInSeconds(
  //         GetTimerSeconds(numberOfCards)
  //       );
  //       console.log('ExpiryTimeStamp was ', expiryTimestamp);
  //       setExpiryTimestamp(newExpiryTimestamp);
  //       console.log('ExpiryTimeSTamp set to ', newExpiryTimestamp);
  //       // restartTimer(newExpiryTimestamp);
  //       //setTimeout(() => restartTimer(expiryTimestamp, false), 300);
  //     }
  //   }
  // }, [needNewGame]);

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
        {timerMinutes.toString().padStart(2, '0')}:
        {timerSeconds.toString().padStart(2, '0')}
      </div>
      {/* The start, pause, etc., can be controlled externally via props if needed */}
    </div>
  );
};

export default TimerComponent;
