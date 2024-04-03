import { Fragment, useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import { GameStateContext } from '../../contexts/game-state.context';

import './navigation.styles.scss';

const Navigation = () => {
  const { isGamePaused, setIsGamePaused } = useContext(GameStateContext);

  const location = useLocation();
  const onSettingsPage = location.pathname === '/settings';

  // Pause the game when we leave the game page
  const handleGamePause = () => {
    setIsGamePaused(true);
  };

  return (
    <div className="nav-container">
      <motion.nav
        initial={{ rotateX: 110, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        exit={{ rotateX: 110, opacity: 0 }}
        transition={{
          duration: 2.5,
          type: 'spring',
          stiffness: 100,
        }}
        // This Fragment element wont be rendered in the browser, we wont see it in the DOM tree
      >
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
            {onSettingsPage && (
              <span className="settings-title-on-nav">Settings</span>
            )}
            <div className="nav-links-container">
              {/* <Link className="nav-link" to="/sign-in">
            Sign In
          </Link> */}
              {/* TODO only shown if logged in */}
              {/* <Link className="nav-link" to="/sign-out">
            Sign In
          </Link> */}
              <Link
                className="nav-link"
                to="/settings"
                onClick={handleGamePause}
              >
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
      </motion.nav>
    </div>
  );
};

export default Navigation;
