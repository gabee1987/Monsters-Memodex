import { useEffect, useContext } from 'react';
import { createContext, useState } from 'react';
import { useStopwatch, useTimer } from 'react-timer-hook';

import { GameSettingsContext } from './game-settings.context';
import { MODE_SETTING_TYPES } from './game-settings.context';

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
  timeLeft: 0,
  setTimeLeft: () => {},
});

export const GameStateProvider = ({ children }) => {
  const [turns, setTurns] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [inProgressDeck, setInProgressDeck] = useState([]);
  const [needNewGame, setNeedNewGame] = useState();
  const [timeCounter, setTimeCounter] = useState(0);
  const [gamePaused, setGamePaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const { mode } = useContext(GameSettingsContext);

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
    timeLeft,
    setTimeLeft,
  };

  const time = new Date();
  console.log('time: ', time);
  const expiryTimestamp = time.setSeconds(time.getSeconds() + 300);
  console.log('expire: ', expiryTimestamp);

  const {
    seconds: stopWatchSeconds,
    isRunning: stopWatchIsRunning,
    start: startStopWatch,
    pause: pauseStopWatch,
    reset: resetStopWatch,
  } = useStopwatch({ autoStart: false });

  const {
    seconds: timerSeconds,
    isRunning: timerIsRunning,
    start: startTimer,
    pause: pauseTimer,
    resume: resumeTimer,
    restart: restartTimer,
  } = useTimer(expiryTimestamp);

  useEffect(() => {
    if (gamePaused) {
      console.log('game paused!');
      if (mode === MODE_SETTING_TYPES.FREE) {
        pauseStopWatch();
      } else if (mode === MODE_SETTING_TYPES.TIME_BASED) {
        pauseTimer();
      }
    } else if (!gamePaused && gameInProgress) {
      if (mode === MODE_SETTING_TYPES.FREE) {
        startStopWatch();
      } else if (mode === MODE_SETTING_TYPES.TIME_BASED) {
        startTimer(1000);
      }
      console.log('game continued...');
    }
  }, [gamePaused]);

  useEffect(() => {
    if (gameInProgress && needNewGame) {
      if (mode === MODE_SETTING_TYPES.FREE) {
        resetStopWatch(null, false);
        startStopWatch();
        console.log('time counter started...');
      } else if (mode === MODE_SETTING_TYPES.TIME_BASED) {
        // resetTimer(null, false);
        // startTimer();
        restartTimer(1000);
      }
    } else if (needNewGame && !gameInProgress) {
      if (mode === MODE_SETTING_TYPES.FREE) {
        pauseStopWatch();
        resetStopWatch(null, false);
      } else if (mode === MODE_SETTING_TYPES.TIME_BASED) {
        // pauseTimer();
        restartTimer(null, false);
      }
    }
  }, [gameInProgress]);

  useEffect(() => {
    // console.log('time counter at: ', stopWatchSeconds);
    setTimeCounter(stopWatchSeconds);
  }, [stopWatchSeconds]);

  useEffect(() => {
    // console.log('timer at: ', timerSeconds);
    setTimeLeft(timerSeconds);
  }, [timerSeconds]);

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
