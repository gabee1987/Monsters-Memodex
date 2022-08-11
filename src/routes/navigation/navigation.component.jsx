import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';

import logo from '../../logo.svg';

const Navigation = () => {
  return (
    // This Fragment element wont be rendered in the browser, we wont see it in the DOM tree
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/sign-in">
            Sign In
          </Link>
          <Link className="nav-link" to="/sign-in">
            New Game
          </Link>
          <Link className="nav-link" to="/sign-in">
            Shuffle
          </Link>
        </div>
      </div>
      {/* Thos Outlet represents our directory component */}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
