import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LinkName } from '../../shared/shared';



const createAuthOptions = props => {
  const context = useContext(NavigationContext);
  const authContext = useContext(AuthContext);

  const { auth } = context.menuOptions;
  return auth.map(link => {
    if (link.name === 'Log out') {
      return (
        <NavLink
          to="/"
          className="navbar-item is-tab is-size-4"
          onClick={() => authContext.logoutUserLocal()}
        >
          <LinkName fontColor={props.fontColor}>{link.name}</LinkName>
        </NavLink>
      );
    }
  }
}

export default createAuthOptions;
