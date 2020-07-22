import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { NavigationContext } from '../../context/navigationContext';
import { AuthContext } from '../../context/authContext';
import { ShoppingCartContext } from '../../context/shoppingCartContext';
import NavCart from './cart';
import { NavStart, NavEnd, NavMenu, NavBrand, NavItem } from '../shared/shared';

const Container = styled.nav`
  position: relative;
  top: 0;
  z-index: 9999;
  background-color: ${props => (props.color ? props.color : 'white')};
  box-shadow: 0 4px 6px 0 #0000004b;
  box-shadow: ${props => (props.color !== 'auto' ? 'none' : 'auto')};
  visibility: ${props => (props.visibility ? props.visibility : 'auto')};
  display: flex;
  flex-direction: row;
  padding: 0.5em;
  font-size: 16px;
  width: 100vw;
  overflow: hidden;
`;

const LinkName = styled.p`
  color: ${props => (props.fontColor ? props.fontColor : 'auto')};
`;

const Logo = styled.object`
  width: 100px;
  cursor: pointer;
`;

const NavLinks = styled(NavLink)`
  padding: 0 1em 0 1em;
`;

const MobileMenu = styled.img`
  cursor: pointer;
  margin: 1em;
`;

const MobileMenuContainer = styled.div`
  height: 100vh;
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
`;

// <LinkName fontColor={props.fontColor}>{page.name}</LinkName>
// <p>{cart.length}</p>

const Nav = props => {
  const context = useContext(NavigationContext);
  const authContext = useContext(AuthContext);
  const { cart } = useContext(ShoppingCartContext);

  const [mobileMenu, setMobileMenu] = useState(false);

  const biggerThanMobileWidth = useMediaQuery({ query: '(min-width: 1028px)' });
  const mobileWidth = useMediaQuery({ query: '(max-width: 1028px)' });

  const createPageOptions = () => {
    const { pages } = context.menuOptions;
    return pages.map(page => {
      if (page.name === 'Cart') {
        return (
          <NavLinks to={page.route} className="navbar-item is-tab is-size-4">
            <NavCart
              fontColor={props.fontColor}
              name={page.name}
              count={cart.length}
            />
          </NavLinks>
        );
      }
      return (
        <NavLinks to={page.route} className="navbar-item is-tab is-size-4">
          <LinkName fontColor={props.fontColor}>{page.name}</LinkName>
        </NavLinks>
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
        <NavItem to={link.route} className="navbar-item is-tab is-size-4">
          <LinkName fontColor={props.fontColor}>{link.name}</LinkName>
        </NavItem>
      );
    });
  };

  const handleMobileMenu = () => {
    if (!context.mobileMenu) {
      return context.setMobileMenu(true);
    }
  };

  return (
    <Container
      className="navbar"
      role="navigation"
      aria-label="main navigation"
      id="navigation"
      color={props.color}
    >
      <NavBrand className="navbar-brand">
        <NavLink to="/">
          <Logo
            data={`${process.env.REACT_APP_NOMAD_MUSIC_S3}/icon_assets/logo_no_text.svg`}
          />
        </NavLink>
      </NavBrand>

      {biggerThanMobileWidth ? (
        <NavMenu className="navbar-menu">
          <NavStart className="navbar-start">{createPageOptions()}</NavStart>
          <NavEnd className="navbar-end">{createAuthOptions()}</NavEnd>
        </NavMenu>
      ) : (
        <NavMenu>
          <NavEnd>
            <MobileMenu
              alt="hamburger menu"
              src="https://nf-music-test.s3.amazonaws.com/icon_assets/hamburger-button.svg"
              onClick={handleMobileMenu}
            />
          </NavEnd>
        </NavMenu>
      )}
    </Container>
  );
};

export default Nav;
