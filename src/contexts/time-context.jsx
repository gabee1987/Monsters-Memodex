import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';

import { useTimer } from 'react-timer-hook';

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

const GetTimerMinutesBasedOnCardNumber = (pairNumber) => {
  let expirySeconds = GetTimerSeconds(pairNumber);
  return Math.floor(expirySeconds / 60);
};
const GetTimerSecondsBasedOnCardNumber = (pairNumber) => {
  let expirySeconds = GetTimerSeconds(pairNumber);
  let minutes = Math.floor(expirySeconds / 60);
  return expirySeconds - minutes * 60;
};

export const TimeContext = createContext({
  timerSeconds: null,
  timerMinutes: null,
  timerIsRunning: false,
  timerState: {
    startTime: null, // The initial start time of the timer
    remainingTime: null, // The remaining time when the timer is paused
    wasPaused: false, // Flag to check if the timer was paused
    winTime: null,
  },
  setTimerState: () => {}, // Function to update the timer state
  needToRestartTimer: true,
  setNeedToRestartTimer: () => {},
  pauseTimer: () => {},
  resumeTimer: () => {},
});

export const TimeProvider = ({ children }) => {
  const { numberOfPairs } = useContext(GameSettingsContext);
  const { gameMode } = useContext(GameSettingsContext);
  const [expiryTimestamp, setExpiryTimestamp] = useState(
    GetActualTimeInSeconds(GetTimerSeconds(numberOfPairs))
  );
  const [needToRestartTimer, setNeedToRestartTimer] = useState(true);
  const [timerState, setTimerState] = useState({
    startTime: null,
    remainingTime: null,
    wasPaused: false,
    winTime: null,
  });
  const {
    firstFlipAtStart,
    setFirstFlipAtStart,
    isGameInProgress,
    setIsGameInProgress,
    setIsGameOver,
    isWon,
    isGamePaused,
  } = useContext(GameStateContext);

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
  useEffect(() => {
    const newExpiryTime = setExpiryTimeForTimer(numberOfPairs);
    console.log('number of pairs : ', numberOfPairs);
    restartTimer(newExpiryTime, false);
    setTimerState((prevState) => ({ ...prevState, startTime: newExpiryTime }));
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
  }, [timerSeconds, timerMinutes]);

  const handleTimerPauseMidGame = useCallback(() => {}, []);

  // Start the timer on first flip
  useEffect(() => {
    if (firstFlipAtStart) {
      const newExpiryTime = setExpiryTimeForTimer(numberOfPairs);
      setTimerState((prevState) => ({
        ...prevState,
        startTime: newExpiryTime,
      }));
      startTimer(newExpiryTime);
      setFirstFlipAtStart(false);
    }
  }, [firstFlipAtStart, startTimer, setFirstFlipAtStart, numberOfPairs]);

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
    if (isGamePaused === true) {
      pauseTimer();
    } else if (!isGamePaused && isGameInProgress) {
      resumeTimer();
      console.log('timer continues after pause...');
    }
  }, [isGamePaused, isGameInProgress]);

  const value = {
    timerSeconds,
    timerMinutes,
    timerIsRunning,
    pauseTimer,
    resumeTimer,
    timerState,
    setTimerState,
    needToRestartTimer,
    setNeedToRestartTimer,
  };

  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
};
