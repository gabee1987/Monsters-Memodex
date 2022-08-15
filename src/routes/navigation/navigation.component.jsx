import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';

import './navigation.styles.scss';
import logo from '../../logo.svg';

const Navigation = () => {
  return (
    // This Fragment element wont be rendered in the browser, we wont see it in the DOM tree
    <Fragment>
      <div className="navigation">
        <Link className="brand-container" to="/">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/sign-in">
            Sign In
          </Link>
          {/* TODO only shown if logged in */}
          {/* <Link className="nav-link" to="/sign-out">
            Sign In
          </Link> */}
          <Link className="nav-link" to="/settings">
            Settings
          </Link>
          {/* <Link className="nav-link" to="/sign-in">
            Shuffle
          </Link> */}
        </div>
      </div>
      {/* This Outlet represents the home component */}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
