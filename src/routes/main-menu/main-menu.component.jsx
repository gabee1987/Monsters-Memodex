import { useState, useEffect, useRef, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { GameStateContext } from '../../contexts/game-state.context';
import { GameSettingsContext } from '../../contexts/game-settings.context';

import './main-menu.styles.scss';
import VanillaTilt from 'vanilla-tilt';

const MainMenu = () => {
  const { gameInProgress } = useContext(GameStateContext);
  const { needNewGame, setNeedNewGame } = useContext(GameStateContext);
  const { SetInitialTimer } = useContext(GameStateContext);

  const handleNewGameClick = () => {
    setNeedNewGame(true);
    SetInitialTimer();
  };

  const handleContinueClick = () => {
    setNeedNewGame(false);
  };

  // 3D perspective effect with Vanilla Tilt
  const tilt = useRef(null);
  useEffect(() => {
    VanillaTilt.init(tilt.current, {
      max: 10,
      scale: 1.05,
      speed: 600,
      easing: 'cubic-bezier(.03,.98,.52,.99)',
    });
  }, []);

  return (
    <div className="main-menu">
      <h1 className="app-title">Monsters Memodex</h1>
      <div className="main-menu-container" id="mainMenu" ref={tilt}>
        <div className="main-menu-inner-container" id="mainMenuInner">
          {gameInProgress && (
            <Link
              className="menu-link"
              to="/game"
              onClick={handleContinueClick}
            >
              Continue
            </Link>
          )}
          <Link className="menu-link" to="/game" onClick={handleNewGameClick}>
            New Game
          </Link>
          <div className="cursor-not-allowed">
            <Link className="menu-link disabled-menu" to="/sign-in">
              Sign In
            </Link>
          </div>
          <Link className="menu-link" to="/settings">
            Settings
          </Link>
          <div className="cursor-not-allowed">
            <Link className="menu-link disabled-menu" to="/help">
              Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
