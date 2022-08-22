import { useState, useEffect, useRef, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { GameStateContext } from '../../contexts/game-state.context';

import './main-menu.styles.scss';
import VanillaTilt from 'vanilla-tilt';

const MainMenu = () => {
  const { gameInProgress } = useContext(GameStateContext);

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
              state={{ fromNewGame: false }}
            >
              Continue
            </Link>
          )}
          <Link className="menu-link" to="/game" state={{ fromNewGame: true }}>
            New Game
          </Link>
          <Link className="menu-link" to="/sign-up">
            Sign Up
          </Link>
          <Link className="menu-link" to="/sign-in">
            Sign In
          </Link>
          <Link className="menu-link" to="/settings">
            Settings
          </Link>
          <Link className="menu-link" to="/help">
            Help
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
