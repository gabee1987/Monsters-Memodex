import { useEffect } from 'react';
import { createContext, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';

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
});

export const GameStateProvider = ({ children }) => {
  const [turns, setTurns] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [inProgressDeck, setInProgressDeck] = useState(false);
  const [needNewGame, setNeedNewGame] = useState();
  const [timeCounter, setTimeCounter] = useState(0);
  const [gamePaused, setGamePaused] = useState(false);

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
  };

  const {
    seconds: stopWatchSeconds,
    isRunning: stopWatchIsRunning,
    start: startStopWatch,
    pause: pauseStopWatch,
    reset: resetStopWatch,
  } = useStopwatch({ autoStart: false });

  useEffect(() => {
    if (gamePaused) {
      pauseStopWatch();
      console.log('game paused!');
    } else if (!gamePaused && gameInProgress) {
      startStopWatch();
      console.log('game continued...');
    }
  }, [gamePaused]);

  useEffect(() => {
    if (gameInProgress && needNewGame) {
      resetStopWatch(null, false);
      startStopWatch();
      console.log('time counter started...');
    } else if (needNewGame && !gameInProgress) {
      pauseStopWatch();
      resetStopWatch(null, false);
      console.log('ez fut most');
    }
  }, [gameInProgress]);

  useEffect(() => {
    // console.log('time counter at: ', stopWatchSeconds);
    setTimeCounter(stopWatchSeconds);
  }, [stopWatchSeconds]);

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
