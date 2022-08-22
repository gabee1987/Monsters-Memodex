import { createContext, useState } from 'react';

export const SettingsContext = createContext({
  mode: 'relaxed',
  setMode: () => {},
  difficulty: 'easy',
  setDifficulty: () => {},
  cardNumber: 10,
  setCardNumber: () => {},
});

export const SettingsProvider = ({ children }) => {
  const [mode, setMode] = useState('relaxed');
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

  return <SettingsProvider value={value}>{children}</SettingsProvider>;
};
