import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';

import { useTimer, useStopwatch } from 'react-timer-hook';
import { localStorageService } from '../services/local-storage.service';

import { GameSettingsContext } from './game-settings.context';
import { GameStateContext } from './game-state.context';
import {
  MODE_SETTING_TYPES,
  DEFAULT_TIMER_SECONDS,
} from './game-settings.context';

const GetTimerSeconds = (numberOfPairs) => {
  // console.log('card number: ', numOfCards);
  switch (numberOfPairs) {
    case '2':
      return DEFAULT_TIMER_SECONDS.TIMER_AT_2_PAIRS;
    case '4':
      return DEFAULT_TIMER_SECONDS.TIMER_AT_4_PAIRS;
    case '6':
      return DEFAULT_TIMER_SECONDS.TIMER_AT_6_PAIRS;
    case '8':
      return DEFAULT_TIMER_SECONDS.TIMER_AT_8_PAIRS;
    case '10':
      return DEFAULT_TIMER_SECONDS.TIMER_AT_10_PAIRS;
    case '12':
      return DEFAULT_TIMER_SECONDS.TIMER_AT_12_PAIRS;
    case '14':
      return DEFAULT_TIMER_SECONDS.TIMER_AT_14_PAIRS;
    case '16':
      return DEFAULT_TIMER_SECONDS.TIMER_AT_16_PAIRS;
    case '18':
      return DEFAULT_TIMER_SECONDS.TIMER_AT_18_PAIRS;
    case '20':
      return DEFAULT_TIMER_SECONDS.TIMER_AT_20_PAIRS;

    default:
      return DEFAULT_TIMER_SECONDS.TIMER_DEFAULT;
  }
};

const GetActualTimeInSeconds = (secondsToShiftWith) => {
  let time = new Date();
  return time.setSeconds(time.getSeconds() + secondsToShiftWith);
};

export const TimeContext = createContext({
  timerSeconds: null,
  timerMinutes: null,
  timerIsRunning: false,
  timerState: {
    startTime: null, // The initial start time of the timer
    remainingTime: null, // The remaining time when the timer is paused
    wasPaused: false,
    winTime: null,
  },
  setTimerState: () => {},
  needToStartTimer: false,
  setNeedToStartTimer: () => {},
  needToRestartTimer: true,
  setNeedToRestartTimer: () => {},
  pauseTimer: () => {},
  resumeTimer: () => {},
  // Stopwatch
  needToStartStopwatch: false,
  setNeedToStartStopwatch: () => {},
  needToResetStopwatch: false,
  setNeedToResetStopwatch: () => {},
  stopwatchSeconds: null,
  stopwatchMinutes: null,
  stopwatchIsRunning: false,
  stopwatchState: {
    wasPaused: false,
    winTime: null,
  },
  setStopWatchState: () => {},
});

export const TimeProvider = ({ children }) => {
  const { numberOfPairs, gameMode } = useContext(GameSettingsContext);
  const [expiryTimestamp] = useState(
    GetActualTimeInSeconds(GetTimerSeconds(numberOfPairs))
  );
  const [needToStartTimer, setNeedToStartTimer] = useState(false);
  const [needToRestartTimer, setNeedToRestartTimer] = useState(true);
  const [timerState, setTimerState] = useState(
    localStorageService.load('timerState') || {
      startTime: null,
      remainingTime: null,
      wasPaused: false,
      winTime: null,
    }
  );
  const {
    isGameInProgress,
    setIsGameInProgress,
    setIsGameOver,
    isWon,
    isGamePaused,
  } = useContext(GameStateContext);

  const saveTimerState = (state) => {
    setTimerState(state);
    localStorageService.save('timerState', state);
  };

  // ================ TIMER RELATED LOGIC ================
  const setExpiryTimeForTimer = (numberOfPairs) => {
    const newExpiryTime = new Date();
    const timerSeconds = GetTimerSeconds(numberOfPairs);
    newExpiryTime.setSeconds(newExpiryTime.getSeconds() + timerSeconds);
    return newExpiryTime;
  };

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

  // Set initial timer value
  // useEffect(() => {
  //   const newExpiryTime = setExpiryTimeForTimer(numberOfPairs);
  //   restartTimer(newExpiryTime, false);
  //   setTimerState((prevState) => ({ ...prevState, startTime: newExpiryTime }));
  // }, [numberOfPairs]);

  const calculateRemainingTime = (expiryTimestamp) => {
    const now = new Date();
    const remainingTime = expiryTimestamp - now;
    return remainingTime > 0 ? remainingTime / 1000 : 0;
  };

  useEffect(() => {
    const remainingTime = calculateRemainingTime(timerState.startTime);
    if (remainingTime > 0) {
      restartTimer(
        new Date(new Date().getTime() + remainingTime * 1000),
        false
      );
    } else {
      const newExpiryTime = setExpiryTimeForTimer(numberOfPairs);
      restartTimer(newExpiryTime, false);
      setTimerState((prevState) => ({
        ...prevState,
        startTime: newExpiryTime,
      }));
    }
  }, [numberOfPairs]);

  const handleExpire = useCallback(() => {
    setIsGameInProgress(false);
    console.log('Time is expired!');
    setIsGameOver(true);
  }, [setIsGameOver, setIsGameInProgress]);

  const handleTimerStopEndGame = useCallback(() => {
    const formattedTime = `${timerMinutes
      .toString()
      .padStart(2, '0')}:${timerSeconds.toString().padStart(2, '0')}`;

    setTimerState((prevState) => ({
      ...prevState,
      winTime: formattedTime,
    }));
    // TODO Need to fix the timer state saving, temporarly turned off
    // saveTimerState({ ...timerState, winTime: formattedTime });
  }, [timerSeconds, timerMinutes]);

  const handleTimerPauseMidGame = useCallback(() => {}, []);

  // Start the timer on first flip
  useEffect(() => {
    if (gameMode === MODE_SETTING_TYPES.TIME_BASED) {
      if (needToStartTimer) {
        const newExpiryTime = setExpiryTimeForTimer(numberOfPairs);
        setTimerState((prevState) => ({
          ...prevState,
          startTime: newExpiryTime,
        }));
        saveTimerState({ ...timerState, startTime: newExpiryTime });
        startTimer(newExpiryTime);
        setNeedToStartTimer(false);
      }
    }
  }, [
    needToStartTimer,
    setNeedToStartTimer,
    startTimer,
    numberOfPairs,
    gameMode,
    timerState,
  ]);

  // Restart the timer when needed
  useEffect(() => {
    if (needToRestartTimer) {
      const newExpiryTime = setExpiryTimeForTimer(numberOfPairs);
      restartTimer(newExpiryTime, false);
      setNeedToRestartTimer(false);
    }
  }, [needToRestartTimer, restartTimer, setNeedToRestartTimer, numberOfPairs]);

  // Stop and save timer when the game is won
  useEffect(() => {
    if (isWon === true) {
      pauseTimer();
      handleTimerStopEndGame();
    }
  }, [isWon, handleTimerStopEndGame]);

  // Pause and save the timer when the game is paused
  useEffect(() => {
    if (gameMode === MODE_SETTING_TYPES.TIME_BASED) {
      if (isGamePaused === true) {
        pauseTimer();
      } else if (!isGamePaused && isGameInProgress) {
        resumeTimer();
      }
    }
  }, [isGamePaused, isGameInProgress, gameMode]);

  // ================ STOPWATCH RELATED LOGIC ================
  const [needToStartStopwatch, setNeedToStartStopwatch] = useState(false);
  const [needToResetStopwatch, setNeedToResetStopwatch] = useState(false);
  const [stopwatchState, setStopwatchState] = useState({
    wasPaused: false,
    winTime: null,
  });
  const {
    seconds: stopwatchSeconds,
    minutes: stopwatchMinutes,
    isRunning: stopwatchIsRunning,
    start: startStopwatch,
    pause: pauseStopwatch,
    reset: resetStopwatch,
  } = useStopwatch({ autoStart: false });

  const saveStopwatchState = (state) => {
    setStopwatchState(state);
    localStorageService.save('stopwatchState', state);
  };

  // Reset the stopwatch
  useEffect(() => {
    if (gameMode === MODE_SETTING_TYPES.FREE) {
      if (needToResetStopwatch && !needToStartStopwatch) {
        pauseStopwatch();
        resetStopwatch(null, false);
        // console.log('stopwatch reset');
      }
    }
  }, [needToResetStopwatch, needToStartStopwatch, gameMode]);

  // Pause/start the stopwatch when a game starts or pauses
  useEffect(() => {
    if (gameMode === MODE_SETTING_TYPES.FREE) {
      if (isGamePaused === true) {
        pauseStopwatch();
      } else if (!isGamePaused && isGameInProgress) {
        startStopwatch();
        console.log('stopwatch continues');
      }
    }
  }, [isGamePaused, isGameInProgress, gameMode]);

  const handleStopWatchStopEndGame = useCallback(() => {
    const formattedTime = `${stopwatchMinutes
      .toString()
      .padStart(2, '0')}:${stopwatchSeconds.toString().padStart(2, '0')}`;

    setStopwatchState((prevState) => ({
      ...prevState,
      winTime: formattedTime,
    }));
    // TODO Need to fix the timer state saving, temporarly turned off
    // saveStopwatchState({ ...stopwatchState, winTime: formattedTime });
  }, [stopwatchSeconds, stopwatchMinutes]);

  // Stop and save stopwatch time when the game is won
  useEffect(() => {
    if (isWon === true) {
      pauseStopwatch();
      handleStopWatchStopEndGame();
    }
  }, [isWon, handleTimerStopEndGame]);

  const value = {
    timerSeconds,
    timerMinutes,
    timerIsRunning,
    pauseTimer,
    resumeTimer,
    timerState,
    // setTimerState,
    setTimerState: saveTimerState,
    needToStartTimer,
    setNeedToStartTimer,
    needToRestartTimer,
    setNeedToRestartTimer,
    // Stopwatch
    needToStartStopwatch,
    setNeedToStartStopwatch,
    needToResetStopwatch,
    setNeedToResetStopwatch,
    stopwatchMinutes,
    stopwatchSeconds,
    stopwatchIsRunning,
    stopwatchState,
    setStopwatchState: saveStopwatchState,
  };

  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
};
