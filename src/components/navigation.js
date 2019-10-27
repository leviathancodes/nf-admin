import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../img/logo.svg';

const Nav = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink className="navbar-item" to="/">
          <Logo />
        </NavLink>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <NavLink to="/" className="navbar-item">
            Home
          </NavLink>
          <NavLink to="/upload" className="navbar-item">
            Upload
          </NavLink>
          <NavLink to="/analytics" className="navbar-item">
            Analytics
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
