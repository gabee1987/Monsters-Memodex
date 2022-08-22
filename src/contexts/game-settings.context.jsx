import { createContext, useState } from 'react';

export const GameSettingsContext = createContext({
  mode: 'relaxed',
  setMode: () => {},
  difficulty: 'easy',
  setDifficulty: () => {},
  cardNumber: 10,
  setCardNumber: () => {},
});

export const GameSettingsProvider = ({ children }) => {
  const [mode, setMode] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [cardNumber, setCardNumber] = useState(10);

  const value = {
    mode,
    setMode,
    difficulty,
    setDifficulty,
    cardNumber,
    setCardNumber,
  };

  return (
    <GameSettingsContext.Provider value={value}>
      {children}
    </GameSettingsContext.Provider>
  );
};
