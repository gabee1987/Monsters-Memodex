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
import { DEFAULT_TIMER_SECONDS } from './game-settings.context';

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

export const TimerContext = createContext({
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
});

export const TimerProvider = ({ children }) => {
  const { numberOfPairs } = useContext(GameSettingsContext);
  const [expiryTimestamp, setExpiryTimestamp] = useState(
    GetActualTimeInSeconds(GetTimerSeconds(numberOfPairs))
  );
  const [needToRestartTimer, setNeedToRestartTimer] = useState(true);
  const [timerState, setTimerState] = useState(0);
  const {
    firstFlipAtStart,
    setFirstFlipAtStart,
    isGameInProgress,
    setIsGameInProgress,
    setIsGameOver,
    isWon,
    isGamePaused,
  } = useContext(GameStateContext);

  // const expirySeconds = GetTimerSeconds(numberOfPairs);
  // const expiryTimestamp = new Date();
  // expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + expirySeconds);

  const setExpiryTimeForTimer = (numberOfPairs) => {
    const newExpiryTime = new Date();
    const timerSeconds = GetTimerSeconds(numberOfPairs);
    newExpiryTime.setSeconds(newExpiryTime.getSeconds() + timerSeconds);
    return newExpiryTime;
  };

  //   const expiryTimestamp = useMemo(() => {
  //     const newExpiryTime = setExpiryTimeForTimer(numberOfPairs);
  //     return newExpiryTime;
  //   }, [numberOfPairs]);

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

  //   useEffect(() => {
  //     const newExpiryTime = setExpiryTimeForTimer(numberOfPairs);
  //     restartTimer(newExpiryTime, false);
  //   }, [numberOfPairs, restartTimer]);

  const handleExpire = useCallback(() => {
    setIsGameInProgress(false);
    console.log('Time is expired!');
    setIsGameOver(true);
  }, [setIsGameOver, setIsGameInProgress]);

  const handleTimerStopEndGame = useCallback(() => {
    console.log('Timer is stopped at ', timerMinutes, timerSeconds);
    // pauseTimer();
    // Format the time and save it
    const formattedTime = `${timerMinutes
      .toString()
      .padStart(2, '0')}:${timerSeconds.toString().padStart(2, '0')}`;
    // setTimerState({ remainingTime: formattedTime });
  }, [timerMinutes, timerSeconds]);

  const handleTimerPauseMidGame = useCallback(() => {
    console.log('Timer is paused at ', timerMinutes, timerSeconds);
    // pauseTimer();
    // Format the time and save it
    const formattedTime = `${timerMinutes
      .toString()
      .padStart(2, '0')}:${timerSeconds.toString().padStart(2, '0')}`;
    // setTimerState({ remainingTime: formattedTime });
    // setTimerState({
    //   startTime: initialStartTime,
    //   remainingTime: remainingTime,
    //   wasPaused: true
    // });
  }, [timerMinutes, timerSeconds]);

  // Set initial timer value
  useEffect(() => {
    const newExpiryTime = setExpiryTimeForTimer(numberOfPairs);
    console.log('number of pairs : ', numberOfPairs);
    restartTimer(newExpiryTime, false);
  }, [numberOfPairs]);

  // Start the timer on first flip
  useEffect(() => {
    if (firstFlipAtStart) {
      const newExpiryTime = setExpiryTimeForTimer(numberOfPairs);
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

  useEffect(() => {
    if (isWon === true) {
      pauseTimer();
      //   handleTimerStopEndGame();
    }
  }, [isWon, handleTimerStopEndGame, pauseTimer]);

  useEffect(() => {
    if (isGamePaused === true) {
      pauseTimer();
      //   handleTimerPauseMidGame();
    } else if (!isGamePaused && isGameInProgress) {
      resumeTimer();
    }
  }, [
    isGamePaused,
    isGameInProgress,
    handleTimerPauseMidGame,
    pauseTimer,
    resumeTimer,
  ]);

  //   const totalDuration = GetTimerSeconds(numberOfPairs); // total duration in seconds
  //   const calculateRemainingTime = () => {
  //     const now = new Date();
  //     const elapsed = (now.getTime() - timerState.startTime.getTime()) / 1000; // in seconds

  //     return timerState.wasPaused
  //       ? timerState.remainingTime
  //       : totalDuration - elapsed;
  //   };

  //   useEffect(() => {
  //     // Logic to calculate the current state of the timer
  //     const currentRemainingTime = calculateRemainingTime(); // Implement this function based on your timer logic

  //     setTimerState((prevState) => ({
  //       ...prevState,
  //       remainingTime: currentRemainingTime,
  //     }));

  //     // Additional logic for pause, resume, etc.
  //   }, [timerSeconds, timerMinutes, setTimerState]);

  const value = {
    timerSeconds,
    timerMinutes,
    timerIsRunning,
    timerState,
    setTimerState,
    needToRestartTimer,
    setNeedToRestartTimer,
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};
