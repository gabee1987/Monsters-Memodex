import { createContext, useState } from 'react';

export const GameSettingsContext = createContext({
  mode: 'relaxed',
  setMode: () => {},
  difficulty: 'easy',
  setDifficulty: () => {},
  numberOfCards: 10,
  setNumberOfCards: () => {},
});

export const GameSettingsProvider = ({ children }) => {
  const [mode, setMode] = useState('relaxed');
  const [difficulty, setDifficulty] = useState('easy');
  const [numberOfCards, setNumberOfCards] = useState(10);
  console.log('number of cards in context: ', numberOfCards);

  const value = {
    mode,
    setMode,
    difficulty,
    setDifficulty,
    numberOfCards,
    setNumberOfCards,
  };

  return (
    <GameSettingsContext.Provider value={value}>
      {children}
    </GameSettingsContext.Provider>
  );
};
