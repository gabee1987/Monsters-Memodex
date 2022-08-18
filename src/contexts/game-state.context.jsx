import { createContext, useState, useEffect } from 'react';

export const GameStateContext = createContext({
  turns: 0,
  setTurns: () => {},
  isWon: false,
  setIsWon: () => {},
});

export const GameStateProvider = ({ children }) => {
  const [turns, setTurns] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const value = {
    turns,
    setTurns,
    isWon,
    setIsWon,
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
