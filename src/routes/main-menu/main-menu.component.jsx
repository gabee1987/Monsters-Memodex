import { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';

import { GameStateContext } from '../../contexts/game-state.context';

import './main-menu.styles.scss';
import VanillaTilt from 'vanilla-tilt';

const MainMenu = () => {
  const { gameInProgress } = useContext(GameStateContext);
  const { setNeedNewGame } = useContext(GameStateContext);
  const { setIsWon } = useContext(GameStateContext);
  const { setIsNeedStaggerAnimation } = useContext(GameStateContext);

  const isLinkEnabled = false;

  const handleNewGameClick = () => {
    setNeedNewGame(true);
    setIsNeedStaggerAnimation(true); // Indicate new game from menu
    // TODO Need to extract and centralize this state change
    setIsWon(false);
  };

  const handleContinueClick = () => {
    setNeedNewGame(false);
  };

  const handleDisabledLinkClick = (event) => {
    event.preventDefault();
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
            <div className="menu-item-container">
              <Link
                className="menu-link"
                to="/game"
                onClick={handleContinueClick}
              >
                Continue
              </Link>
            </div>
          )}
          <div className="menu-item-container">
            <Link className="menu-link" to="/game" onClick={handleNewGameClick}>
              New Game
            </Link>
          </div>
          <div className="menu-item-container">
            <div className="cursor-not-allowed">
              <Link
                className="menu-link disabled-menu"
                to="/sign-in"
                onClick={isLinkEnabled ? undefined : handleDisabledLinkClick}
              >
                Sign In
              </Link>
            </div>
          </div>
          <div className="menu-item-container">
            <Link className="menu-link" to="/settings">
              Settings
            </Link>
          </div>
          <div className="menu-item-container">
            <div className="cursor-not-allowed">
              <Link
                className="menu-link disabled-menu"
                to="/help"
                onClick={isLinkEnabled ? undefined : handleDisabledLinkClick}
              >
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
