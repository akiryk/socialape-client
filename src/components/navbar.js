import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ onLogout, authenticated }) => {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        {authenticated ? (
          <button type="button" onClick={onLogout}>
            log out
          </button>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
