import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUpload,
  faMusic,
  faChartPie
} from '@fortawesome/free-solid-svg-icons';
import { NavigationContext } from '../../context/navigationContext';
import { AuthContext } from '../../context/authContext';

const Container = styled.nav`
  &.navbar {
    background-color: ${props => (props.color ? props.color : 'auto')};
    box-shadow: ${props => (props.color !== 'auto' ? 'none' : 'auto')};
    visibility: ${props => (props.visibility ? props.visibility : 'auto')};
  }
  padding: 1em;
`;

const LinkName = styled.p`
  color: ${props => (props.fontColor ? props.fontColor : 'auto')};
`;

const Logo = styled.object`
  width: 100px;
`;

const Nav = props => {
  const context = useContext(NavigationContext);
  const authContext = useContext(AuthContext);

  const createPageOptions = () => {
    const { pages } = context.menuOptions;
    return pages.map(page => {
      return (
        <NavLink to={page.route} className="navbar-item is-tab is-size-4">
          <LinkName fontColor={props.fontColor}>{page.name}</LinkName>
        </NavLink>
      );
    });
  };

  const createAuthOptions = () => {
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

      return (
        <NavLink to={link.route} className="navbar-item is-tab is-size-4">
          <LinkName fontColor={props.fontColor}>{link.name}</LinkName>
        </NavLink>
      );
    });
  };

  return (
    <Container
      className="navbar is-transparent"
      role="navigation"
      aria-label="main navigation"
      id="navigation"
      color={props.color}
    >
      <div className="navbar-brand">
        <NavLink className="navbar-item" to="/">
          <Logo
            data={`${process.env.REACT_APP_NOMAD_MUSIC_S3}/icon_assets/logo_no_text.svg`}
          />
        </NavLink>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">{createPageOptions()}</div>
        <div className="navbar-end">{createAuthOptions()}</div>
      </div>
    </Container>
  );
};

export default Nav;
