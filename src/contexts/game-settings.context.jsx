import { createContext, useEffect, useState } from 'react';

export const TAB_VALUES = {
  GAME_TAB: 'GAME_TAB',
  VISUALS_TAB: 'VISUALS_TAB',
};

export const MODE_SETTING_TYPES = {
  TIME_BASED: 'TIME_BASED',
  TURN_BASED: 'TURN_BASED',
  FREE: 'FREE',
};

export const DIFFICULTY_SETTING_TYPES = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
};

export const CARDSET_SETTING_TYPES = {
  MONSTERS: 'MONSTERS',
  ROBOTS: 'ROBOTS',
  ROBOTHEADS: 'ROBOTHEADS',
  CATS: 'CATS',
};

export const CARDSET_ROBOHASH_IDS = {
  MONSTERS: 2,
  ROBOTS: 1,
  ROBOTHEADS: 3,
  CATS: 4,
};

export const CARBACK_SETTING_TYPES = {
  BASIC: 'basic',
  HEXAGON: 'hexagon',
  BUBBLES: 'bubbles',
  CIRCLES: 'circles',
  DIAMONDS: 'diamonds',
  JAPANESE: 'japanese',
  SCALES: 'scales',
  TRIANGLES: 'triangles',
  MEMPHIS: 'memphis',
};

export const DEFAULT_TIMER_SECONDS = {
  TIMER_DEFAULT: 600,
  TIMER_AT_2_PAIRS: 30,
  TIMER_AT_4_PAIRS: 60,
  TIMER_AT_6_PAIRS: 120,
  TIMER_AT_8_PAIRS: 180,
  TIMER_AT_10_PAIRS: 240,
  TIMER_AT_12_PAIRS: 300,
  TIMER_AT_14_PAIRS: 360,
  TIMER_AT_16_PAIRS: 420,
  TIMER_AT_18_PAIRS: 480,
  TIMER_AT_20_PAIRS: 540,
};

export const calculateTimerValue = (numOfCards, difficulty) => {
  const baseTime =
    DEFAULT_TIMER_SECONDS[`TIMER_AT_${numOfCards}_CARDS`] ||
    DEFAULT_TIMER_SECONDS.TIMER_DEFAULT;

  switch (difficulty) {
    case DIFFICULTY_SETTING_TYPES.EASY:
      return baseTime * 1.5; // 50% more time for easy
    case DIFFICULTY_SETTING_TYPES.HARD:
      return baseTime * 0.75; // 25% less time for hard
    default:
      return baseTime; // Default is medium difficulty
  }
};

export const GameSettingsContext = createContext({
  activeTab: TAB_VALUES.GAME_TAB,
  setActiveTab: () => {},
  gameMode: MODE_SETTING_TYPES.FREE,
  setGameMode: () => {},
  difficulty: DIFFICULTY_SETTING_TYPES.EASY,
  setDifficulty: () => {},
  numberOfPairs: 10,
  setNumberOfPairs: () => {},
  cardSet: CARDSET_SETTING_TYPES.MONSTERS,
  setCardSet: () => {},
  cardBack: CARBACK_SETTING_TYPES.BASIC,
  setCardBack: () => {},
});

export const GameSettingsProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(TAB_VALUES.GAME_TAB);
  const [gameMode, setGameMode] = useState(MODE_SETTING_TYPES.FREE);
  const [difficulty, setDifficulty] = useState(DIFFICULTY_SETTING_TYPES.EASY);
  const [numberOfPairs, setNumberOfPairs] = useState(10);
  const [cardSet, setCardSet] = useState(CARDSET_SETTING_TYPES.MONSTERS);
  const [cardBack, setCardBack] = useState(CARBACK_SETTING_TYPES.BASIC);

  const value = {
    activeTab,
    setActiveTab,
    gameMode,
    setGameMode,
    difficulty,
    setDifficulty,
    numberOfPairs,
    setNumberOfPairs,
    cardSet,
    setCardSet,
    cardBack,
    setCardBack,
    calculateTimerValue,
  };

  return (
    <GameSettingsContext.Provider value={value}>
      {children}
    </GameSettingsContext.Provider>
  );
};
