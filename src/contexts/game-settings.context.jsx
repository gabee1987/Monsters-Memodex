import { createContext, useEffect, useState } from 'react';

export const MODE_SETTING_TYPES = {
  TIME_BASED: 'TIME_BASED',
  TURN_BASED: 'TURN_BASED',
  RELAXED: 'RELAXED',
};

export const DIFFICULTY_SETTING_TYPES = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
};

export const GameSettingsContext = createContext({
  mode: MODE_SETTING_TYPES.RELAXED,
  setMode: () => {},
  difficulty: DIFFICULTY_SETTING_TYPES.EASY,
  setDifficulty: () => {},
  numberOfCards: 10,
  setNumberOfCards: () => {},
});

export const GameSettingsProvider = ({ children }) => {
  const [mode, setMode] = useState(MODE_SETTING_TYPES.RELAXED);
  const [difficulty, setDifficulty] = useState(DIFFICULTY_SETTING_TYPES.EASY);
  const [numberOfCards, setNumberOfCards] = useState(10);
  // console.log('number of cards in context: ', numberOfCards);
  // console.log('mode in context is: ', mode);

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
