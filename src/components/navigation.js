import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUpload,
  faMusic,
  faChartPie
} from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../img/logo.svg';

const Nav = () => {
  const handleSearch = () => {
    console.log('Your mom is a pussy');
  };

  const [search, setSearch] = useState('');

  return (
    <nav
      className="navbar is-spaced"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <NavLink className="navbar-item" to="/">
          <Logo />
        </NavLink>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <NavLink to="/" className="navbar-item is-tab is-size-4">
            <span className="icon">
              <FontAwesomeIcon className="icon-nav" icon={faHome} size="sm" />
            </span>
            <p>Home</p>
          </NavLink>
          <NavLink to="/music" className="navbar-item is-tab is-size-4">
            <span className="icon">
              <FontAwesomeIcon className="icon-nav" icon={faMusic} size="sm" />
            </span>
            <p>Music</p>
          </NavLink>
          <NavLink to="/upload" className="navbar-item is-tab is-size-4">
            <span className="icon">
              <FontAwesomeIcon className="icon-nav" icon={faUpload} size="sm" />
            </span>
            <p>Upload</p>
          </NavLink>
          <NavLink to="/analytics" className="navbar-item is-tab is-size-4">
            <span className="icon">
              <FontAwesomeIcon
                className="icon-nav"
                icon={faChartPie}
                size="sm"
              />
            </span>
            <p>Analytics</p>
          </NavLink>
        </div>
        <div className="navbar-end">
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Find a track..."
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="control">
              <a className="button is-primary" onClick={handleSearch}>
                Search
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
