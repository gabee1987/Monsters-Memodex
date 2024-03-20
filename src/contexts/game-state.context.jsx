import { useEffect, useContext } from 'react';
import { createContext, useState } from 'react';
import { useStopwatch, useTimer } from 'react-timer-hook';

import { GameSettingsContext } from './game-settings.context';
import {
  MODE_SETTING_TYPES,
  DEFAULT_TIMER_SECONDS,
} from './game-settings.context';

export const GameStateContext = createContext({
  turns: 0,
  setTurns: () => {},
  isGameInProgress: false,
  setIsGameInProgress: () => {},
  isWon: false,
  setIsWon: () => {},
  inProgressDeck: [],
  setInProgressDeck: () => {},
  needNewGame: false,
  setNeedNewGame: () => {},
  isGamePaused: false,
  setIsGamePaused: () => {},
  isGameOver: false,
  setIsGameOver: () => {},
});

export const GameStateProvider = ({ children }) => {
  const [turns, setTurns] = useState(0);
  const [isGameInProgress, setIsGameInProgress] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [inProgressDeck, setInProgressDeck] = useState([]);
  const [needNewGame, setNeedNewGame] = useState();
  const [isGamePaused, setIsGamePaused] = useState(false);
  const { gameMode } = useContext(GameSettingsContext);

  const value = {
    turns,
    setTurns,
    isGameInProgress,
    setIsGameInProgress,
    isWon,
    setIsWon,
    inProgressDeck,
    setInProgressDeck,
    needNewGame,
    setNeedNewGame,
    isGamePaused,
    setIsGamePaused,
    isGameOver,
    setIsGameOver,
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
