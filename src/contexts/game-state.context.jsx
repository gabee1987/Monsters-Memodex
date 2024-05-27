import { useEffect, useContext } from 'react';
import { createContext, useState } from 'react';
import { useStopwatch, useTimer } from 'react-timer-hook';

import {
  DEFAULT_TURN_VALUES,
  GameSettingsContext,
} from './game-settings.context';
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
  isShufflingActive: false,
  setIsShufflingActive: () => {},
  isNeedStaggerAnimation: true,
  setIsNeedStaggerAnimation: () => {},
  isNewGameButtonDisabled: true,
  setIsNewGameButtonDisabled: () => {},
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
  const [isShufflingActive, setIsShufflingActive] = useState(false);
  const [isNeedStaggerAnimation, setIsNeedStaggerAnimation] = useState(true);
  const [isNewGameButtonDisabled, setIsNewGameButtonDisabled] = useState(false);

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
    isShufflingActive,
    setIsShufflingActive,
    isNeedStaggerAnimation,
    setIsNeedStaggerAnimation,
    isNewGameButtonDisabled,
    setIsNewGameButtonDisabled,
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
