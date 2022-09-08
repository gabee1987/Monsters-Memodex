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
});

export const GameStateProvider = ({ children }) => {
  const [turns, setTurns] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [isWon, setIsWon] = useState(false);
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
    } else if (!gamePaused && gameInProgress) {
      startStopWatch();
    }
  }, [gamePaused]);

  useEffect(() => {
    if (gameInProgress && needNewGame) {
      resetStopWatch(null, false);
      startStopWatch();
      console.log('timer started...');
    } else if (needNewGame && !gameInProgress) {
      pauseStopWatch();
      resetStopWatch(null, false);
    }
  }, [gameInProgress]);

  useEffect(() => {
    setTimeCounter(stopWatchSeconds);
  }, [stopWatchSeconds]);

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
