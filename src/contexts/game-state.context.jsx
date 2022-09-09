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
  const expiryTimestamp = time.setSeconds(time.getSeconds() + 20);
  // console.log('time: ', time);
  // console.log('expire: ', expiryTimestamp);

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
  } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => console.warn('Time is up!'),
  });

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

  // Pause/start the timer when a game starts or pauses
  useEffect(() => {
    const expiryTimestamp = time.setSeconds(time.getSeconds() + 20);
    if (mode === MODE_SETTING_TYPES.TIME_BASED) {
      if (gamePaused) {
        pauseTimer();
        console.log('Timer paused!');
      } else if (!gamePaused && gameInProgress) {
        startTimer(1000);
        console.log('Timer continued...');
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

  // Start the timer when a game starts
  useEffect(() => {
    const expiryTimestamp = time.setSeconds(time.getSeconds() + 20);
    if (mode === MODE_SETTING_TYPES.TIME_BASED) {
      if (gameInProgress && needNewGame) {
        restartTimer(1000);
      } else if (needNewGame && !gameInProgress) {
        restartTimer(null, false);
      }
    }
  }, [gameInProgress]);

  // Update the stopwatch time at every seconds
  useEffect(() => {
    // console.log('time counter at: ', stopWatchSeconds);
    setTimeCounter(stopWatchSeconds);
  }, [stopWatchSeconds]);

  // Update the timer at every seconds
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
