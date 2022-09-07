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
});

export const GameStateProvider = ({ children }) => {
  const [turns, setTurns] = useState(0);
  const [timeCounter, setTimeCounter] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [inProgressDeck, setInProgressDeck] = useState([]);
  const [needNewGame, setNeedNewGame] = useState();

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
  };

  const {
    seconds: stopWatchSeconds,
    isRunning: stopWatchIsRunning,
    start: startStopWatch,
    pause: pauseStopWatch,
    reset: resetStopWatch,
  } = useStopwatch({ autoStart: false });

  useEffect(() => {
    if (gameInProgress) {
      resetStopWatch(null, false);
      startStopWatch();
      console.log('timer started...');
    } else {
      pauseStopWatch();
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
