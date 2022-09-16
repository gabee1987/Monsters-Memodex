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

export const TIMER_SECONDS_BASED_ON_CARD_NUMBERS = {
  TIMER_DEFAULT: 600,
  TIMER_AT_2_CARDS: 40,
  TIMER_AT_4_CARDS: 70,
  TIMER_AT_6_CARDS: 100,
  TIMER_AT_8_CARDS: 160,
  TIMER_AT_10_CARDS: 240,
  TIMER_AT_12_CARDS: 320,
  TIMER_AT_14_CARDS: 440,
  TIMER_AT_16_CARDS: 560,
  TIMER_AT_18_CARDS: 680,
  TIMER_AT_20_CARDS: 800,
};

export const GameSettingsContext = createContext({
  activeTab: TAB_VALUES.GAME_TAB,
  setActiveTab: () => {},
  mode: MODE_SETTING_TYPES.FREE,
  setMode: () => {},
  difficulty: DIFFICULTY_SETTING_TYPES.EASY,
  setDifficulty: () => {},
  numberOfCards: 10,
  setNumberOfCards: () => {},
  cardSet: CARDSET_SETTING_TYPES.MONSTERS,
  setCardSet: () => {},
  cardBack: CARBACK_SETTING_TYPES.BUBBLES,
  setCardBack: () => {},
});

export const GameSettingsProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(TAB_VALUES.GAME_TAB);
  const [mode, setMode] = useState(MODE_SETTING_TYPES.FREE);
  const [difficulty, setDifficulty] = useState(DIFFICULTY_SETTING_TYPES.EASY);
  const [numberOfCards, setNumberOfCards] = useState(10);
  const [cardSet, setCardSet] = useState(CARDSET_SETTING_TYPES.MONSTERS);
  const [cardBack, setCardBack] = useState(CARBACK_SETTING_TYPES.BUBBLES);
  // console.log('number of cards in context: ', numberOfCards);
  // console.log('mode in context is: ', mode);
  // console.log('cardSet in context is: ', cardSet);
  // console.log('cardBack in context is: ', cardBack);

  const value = {
    activeTab,
    setActiveTab,
    mode,
    setMode,
    difficulty,
    setDifficulty,
    numberOfCards,
    setNumberOfCards,
    cardSet,
    setCardSet,
    cardBack,
    setCardBack,
  };

  return (
    <GameSettingsContext.Provider value={value}>
      {children}
    </GameSettingsContext.Provider>
  );
};
