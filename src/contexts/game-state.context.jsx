import { createContext, useState } from 'react';

export const GameStateContext = createContext({
  turns: 0,
  setTurns: () => {},
  gameInProgress: false,
  setGameInProgress: () => {},
  isWon: false,
  setIsWon: () => {},
  inProgressDeck: [],
  setInProgressDeck: () => {},
});

export const GameStateProvider = ({ children }) => {
  const [turns, setTurns] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [inProgressDeck, setInProgressDeck] = useState([]);

  const value = {
    turns,
    setTurns,
    gameInProgress,
    setGameInProgress,
    isWon,
    setIsWon,
    inProgressDeck,
    setInProgressDeck,
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
