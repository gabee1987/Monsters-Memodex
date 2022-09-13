import { useEffect, useContext } from 'react';
import { createContext, useState } from 'react';
// import { useTimer } from 'use-timer';

import { GameSettingsContext } from './game-settings.context';
import {
  MODE_SETTING_TYPES,
  TIMER_SECONDS_BASED_ON_CARD_NUMBERS,
} from './game-settings.context';

// const TIMER_TYPE = {
//   INCREMENTAL: 'INCREMENTAL',
//   DECREMENTAL: 'DECREMENTAL',
// };

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
  timeElapsed: 0,
  setTimeElapsed: () => {},
  gamePaused: false,
  setGamePaused: () => {},
  gameOver: false,
  setGameOver: () => {},
  timeLeft: 0,
  setTimeLeft: () => {},
  // timerInitialTime: false,
  // setTimerInitialTime: () => {},
  // timerInitialType: TIMER_TYPE.INCREMENTAL,
  // setTimerInitialType: () => {},
});

export const GetTimerDuration = (numOfCards) => {
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
  const [gamePaused, setGamePaused] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  // const [timerInitialType, setTimerInitialType] = useState(
  //   TIMER_TYPE.INCREMENTAL
  // );
  // const [timerInitialTime, setTimerInitialTime] = useState(10);

  const { mode } = useContext(GameSettingsContext);
  const { numberOfCards } = useContext(GameSettingsContext);

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
    timeElapsed,
    setTimeElapsed,
    gamePaused,
    setGamePaused,
    gameOver,
    setGameOver,
    timeLeft,
    setTimeLeft,
    // timerInitialTime,
    // setTimerInitialTime,
    // timerInitialType,
    // setTimerInitialType,
  };

  // useEffect(() => {
  //   if (
  //     mode === MODE_SETTING_TYPES.FREE ||
  //     mode === MODE_SETTING_TYPES.TURN_BASED
  //   ) {
  //     setTimerInitialType(TIMER_TYPE.INCREMENTAL);
  //     setTimerInitialTime(5);
  //     setTimeLeft(timerInitialTime);
  //   } else if (mode === MODE_SETTING_TYPES.TIME_BASED) {
  //     setTimerInitialType(TIMER_TYPE.DECREMENTAL);
  //     setTimerInitialTime(GetTimerDuration(numberOfCards));
  //     setTimeLeft(timerInitialTime);
  //   }
  //   resetTimer();
  //   console.log('timer status: ', timerStatus);
  // }, [mode]);

  // const onTimerTimeUpdate = () => {
  //   console.log('timer is at: ', timerTime);
  //   console.log('initial time: ', timerInitialTime);
  //   console.log('timer type: ', timerInitialType);
  //   console.log('timer status: ', timerStatus);
  //   if (mode === MODE_SETTING_TYPES.TIME_BASED) {
  //     setTimeLeft(timerTime);
  //   } else if (
  //     mode === MODE_SETTING_TYPES.FREE ||
  //     mode === MODE_SETTING_TYPES.TURN_BASED
  //   ) {
  //     setTimeElapsed(timerTime);
  //   }
  // };

  // const onTimerTimeOver = () => {
  //   console.log('timer is finished!');
  // };

  // const {
  //   time: timerTime,
  //   start: startTimer,
  //   pause: pauseTimer,
  //   reset: resetTimer,
  //   status: timerStatus,
  // } = useTimer({
  //   initialTime: timerInitialTime,
  //   timerType: timerInitialType,
  //   onTimeOver: onTimerTimeOver,
  //   onTimeUpdate: onTimerTimeUpdate,
  // });

  // useEffect(() => {
  //   if (mode === MODE_SETTING_TYPES.TIME_BASED) {
  //     let initialTime = GetTimerDuration(numberOfCards);
  //     setTimerInitialTime(initialTime);
  //     setTimeLeft(timerInitialTime);
  //     console.log('this shouzld be the time: ', initialTime);
  //     console.log('initial time set to: ', timerInitialTime);
  //   } else {
  //     setTimerInitialTime(0);
  //   }
  //   resetTimer();
  // }, [numberOfCards]);

  // Start the timer when a game starts
  // useEffect(() => {
  //   if (gameInProgress && needNewGame) {
  //     resetTimer();
  //     startTimer();
  //   } else {
  //     pauseTimer();
  //   }
  // }, [gameInProgress]);

  // Pause/start the timer when a game starts or pauses
  // useEffect(() => {
  //   if (gamePaused) {
  //     pauseTimer();
  //   } else if (!gamePaused && gameInProgress) {
  //     startTimer();
  //   }
  // }, [gamePaused]);

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
