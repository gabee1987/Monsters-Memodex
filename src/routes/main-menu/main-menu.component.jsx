import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

import './main-menu.styles.scss';

const MainMenu = () => {
  return (
    <div className="main-menu">
      <h1 className="app-title">Monsters Memodex</h1>
      <div className="main-menu-container">
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
  );
};

export default MainMenu;
