import { useState, useEffect, useRef } from 'react';
import { Outlet, Link } from 'react-router-dom';

import './main-menu.styles.scss';
import VanillaTilt from 'vanilla-tilt';

const MainMenu = () => {
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
          <Link className="menu-link" to="/game">
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
          <Link className="menu-link" to="/settings">
            Help
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
