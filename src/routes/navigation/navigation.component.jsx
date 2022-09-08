import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { GameStateContext } from '../../contexts/game-state.context';

import './navigation.styles.scss';

const Navigation = () => {
  const { gameInProgress, setGameInProgress } = useContext(GameStateContext);
  const { gamePaused, setGamePaused } = useContext(GameStateContext);
  const { inProgressDeck } = useContext(GameStateContext);

  // Pause the game when we leave the game page
  const handleGamePause = () => {
    console.log('deck before leaving game component: ', inProgressDeck);
    setGamePaused(true);
  };

  return (
    // This Fragment element wont be rendered in the browser, we wont see it in the DOM tree
    <Fragment>
      <div className="navigation">
        <Link
          className="nav-link brand-container"
          to="/"
          onClick={handleGamePause}
        >
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <span>Home</span>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/sign-in">
            Sign In
          </Link>
          {/* TODO only shown if logged in */}
          {/* <Link className="nav-link" to="/sign-out">
            Sign In
          </Link> */}
          <Link className="nav-link" to="/settings" onClick={handleGamePause}>
            Settings
          </Link>
          {/* <Link className="nav-link" to="/sign-in">
            Shuffle
          </Link> */}
        </div>
      </div>
      {/* This Outlet represents the game component */}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
