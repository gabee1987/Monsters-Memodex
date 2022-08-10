import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';

const Navigation = () => {
  return (
    // This Fragment element wont be rendered in the browser, we wont see it in the DOM tree
    <Fragment>
      <div className="navigation">
        {/* <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link> */}
        <div className="nav-links-container">
          {/* <Link className="nav-link" to="/sign-in">
              SIGN IN
            </Link> */}
        </div>
      </div>
      {/* Thos Outlet represents our directory component */}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
