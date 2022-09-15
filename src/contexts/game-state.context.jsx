import { useEffect, useContext } from 'react';
import { createContext, useState } from 'react';
import { useStopwatch, useTimer } from 'react-timer-hook';

import { GameSettingsContext } from './game-settings.context';
import {
  MODE_SETTING_TYPES,
  TIMER_SECONDS_BASED_ON_CARD_NUMBERS,
} from './game-settings.context';

export const GameStateContext = createContext({
  turns: 0,
  setTurns: () => {},
  gameInProgress: false,
  setGameInProgress: () => {},
  isWon: false,
  setIsWon: () => {},
  inProgressDeck: [],
  setInProgressDeck: () => {},
  needNewGame: false,
  setNeedNewGame: () => {},
  timeCounter: 0,
  setTimeCounter: () => {},
  gamePaused: false,
  setGamePaused: () => {},
  gameOver: false,
  setGameOver: () => {},
  timerSecondsLeft: 0,
  setTimerSecondsLeft: () => {},
  timerMinutesLeft: 0,
  setTimerMinutesLeft: () => {},
  expiryTimestamp: 0,
  setExpiryTimestamp: () => {},
  SetInitialTimer: () => {},
});

const GetActualTimeInSeconds = (secondsToShiftWith) => {
  let time = new Date();
  return time.setSeconds(time.getSeconds() + secondsToShiftWith);
};

const GetTimerMinutesBasedOnCardNumber = (cardNumber) => {
  let expirySeconds = GetTimerSeconds(cardNumber);
  return Math.floor(expirySeconds / 60);
};
const GetTimerSecondsBasedOnCardNumber = (cardNumber) => {
  let expirySeconds = GetTimerSeconds(cardNumber);
  let minutes = Math.floor(expirySeconds / 60);
  return expirySeconds - minutes * 60;
};

export const GetTimerSeconds = (numOfCards) => {
  // console.log('card number: ', numOfCards);
  switch (numOfCards) {
    case '2':
      return TIMER_SECONDS_BASED_ON_CARD_NUMBERS.TIMER_AT_2_CARDS;
    case '4':
      return TIMER_SECONDS_BASED_ON_CARD_NUMBERS.TIMER_AT_4_CARDS;
    case '6':
      return TIMER_SECONDS_BASED_ON_CARD_NUMBERS.TIMER_AT_6_CARDS;
    case '8':
      return TIMER_SECONDS_BASED_ON_CARD_NUMBERS.TIMER_AT_8_CARDS;
    case '10':
      return TIMER_SECONDS_BASED_ON_CARD_NUMBERS.TIMER_AT_10_CARDS;
    case '12':
      return TIMER_SECONDS_BASED_ON_CARD_NUMBERS.TIMER_AT_12_CARDS;
    case '14':
      return TIMER_SECONDS_BASED_ON_CARD_NUMBERS.TIMER_AT_14_CARDS;
    case '16':
      return TIMER_SECONDS_BASED_ON_CARD_NUMBERS.TIMER_AT_16_CARDS;
    case '18':
      return TIMER_SECONDS_BASED_ON_CARD_NUMBERS.TIMER_AT_18_CARDS;
    case '20':
      return TIMER_SECONDS_BASED_ON_CARD_NUMBERS.TIMER_AT_20_CARDS;

    default:
      return TIMER_SECONDS_BASED_ON_CARD_NUMBERS.TIMER_DEFAULT;
  }
};

export const GameStateProvider = ({ children }) => {
  const [turns, setTurns] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [inProgressDeck, setInProgressDeck] = useState([]);
  const [needNewGame, setNeedNewGame] = useState();
  const [timeCounter, setTimeCounter] = useState(0);
  const [gamePaused, setGamePaused] = useState(false);
  const [timerMinutesLeft, setTimerMinutesLeft] = useState(0);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(0);
  const [expiryTimestamp, setExpiryTimestamp] = useState(
    GetActualTimeInSeconds(0)
  );

  const { mode } = useContext(GameSettingsContext);
  const { numberOfCards } = useContext(GameSettingsContext);

  const SetInitialTimer = () => {
    if (mode !== MODE_SETTING_TYPES.TIME_BASED) {
      return;
    }
    let minutes = GetTimerMinutesBasedOnCardNumber(numberOfCards);
    let seconds = GetTimerSecondsBasedOnCardNumber(numberOfCards);
    setTimeout(() => setTimerMinutesLeft(minutes), 100);
    setTimeout(() => setTimerSecondsLeft(seconds), 100);
  };

  const value = {
    turns,
    setTurns,
    gameInProgress,
    setGameInProgress,
    isWon,
    setIsWon,
    inProgressDeck,
    setInProgressDeck,
    needNewGame,
    setNeedNewGame,
    timeCounter,
    setTimeCounter,
    gamePaused,
    setGamePaused,
    gameOver,
    setGameOver,
    timerSecondsLeft,
    setTimerSecondsLeft,
    timerMinutesLeft,
    setTimerMinutesLeft,
    expiryTimestamp,
    setExpiryTimestamp,
    SetInitialTimer,
  };

  const {
    seconds: stopWatchSeconds,
    isRunning: stopWatchIsRunning,
    start: startStopWatch,
    pause: pauseStopWatch,
    reset: resetStopWatch,
  } = useStopwatch({ autoStart: false });

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
    onExpire: () => console.warn('Time is up!'),
  });

  // Start the timer on game start
  useEffect(() => {
    setExpiryTimestamp(GetActualTimeInSeconds(GetTimerSeconds(numberOfCards)));

    if (mode === MODE_SETTING_TYPES.TIME_BASED) {
      if (gameInProgress && needNewGame) {
        restartTimer(expiryTimestamp);
      } else if (needNewGame && !gameInProgress) {
        restartTimer(expiryTimestamp, false);
      }
    }
  }, [gameInProgress]);

  // Pause/start the timer when a game starts or pauses
  useEffect(() => {
    if (mode === MODE_SETTING_TYPES.TIME_BASED) {
      if (gamePaused) {
        pauseTimer();
        console.log('Timer paused at: ', timerMinutes, timerSeconds);
      } else if (!gamePaused && gameInProgress) {
        resumeTimer();
        console.log('Timer continued at: ', timerMinutes, timerSeconds);
      }
    }
  }, [gamePaused]);

  // Start the stopwatch when a game starts
  useEffect(() => {
    if (mode === MODE_SETTING_TYPES.FREE) {
      if (gameInProgress && needNewGame) {
        resetStopWatch(null, false);
        startStopWatch();
        console.log('time counter started...');
      } else if (needNewGame && !gameInProgress) {
        pauseStopWatch();
        resetStopWatch(null, false);
      }
    }
  }, [gameInProgress]);

  // Pause/start the stopwatch when a game starts or pauses
  useEffect(() => {
    if (gamePaused) {
      pauseStopWatch();
      console.log('Time counter paused!');
    } else if (!gamePaused && gameInProgress) {
      startStopWatch();
      console.log('Time counter continued...');
    }
  }, [gamePaused]);

  // Update the stopwatch time at every seconds
  useEffect(() => {
    // console.log('time counter at: ', stopWatchSeconds);
    setTimeCounter(stopWatchSeconds);
  }, [stopWatchSeconds]);

  // Update the timer at every seconds
  useEffect(() => {
    // console.log('timer at: ', timerSeconds);
    setTimerSecondsLeft(timerSeconds);
  }, [timerSeconds]);

  // Update the timer at every minutes
  useEffect(() => {
    // console.log('timer at: ', timerSeconds);
    setTimerMinutesLeft(timerMinutes);
  }, [timerMinutes]);

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
