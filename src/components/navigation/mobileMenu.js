import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { NavigationContext } from '../../context/navigationContext';
import { AuthContext } from '../../context/authContext';
import { ShoppingCartContext } from '../../context/shoppingCartContext';
import NavCart from './cart';
import { NavStart, NavEnd, NavMenu, NavItem, LinkName } from '../shared/shared';

const Container = styled.div`
  background: rgba(255, 255, 255, 0.4);
  font-size: 32px;
`;

const MobileMenuContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const NavLinks = styled(NavLink)`
  padding: 0 1em 0 1em;
  color: ${props => props.theme.color.primaryPink};
`;

const NavMobileMenu = styled(NavMenu)`
  display: flex
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;
`;

const NavMobileStart = styled(NavStart)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const MobileMenu = props => {
  const context = useContext(NavigationContext);
  const authContext = useContext(AuthContext);
  const { cart } = useContext(ShoppingCartContext);

  const handleLinkClick = () => {
    context.setMobileMenu(false);
  };

  const createPageOptions = () => {
    const { pages } = context.menuOptions;
    return pages.map(page => {
      if (page.name === 'Cart') {
        return (
          <NavLinks
            to={page.route}
            onClick={handleLinkClick}
            className="navbar-item"
          >
            <NavCart
              fontColor={props.fontColor}
              name={page.name}
              count={cart.length}
            />
          </NavLinks>
        );
      }
      return (
        <NavLinks
          to={page.route}
          onClick={handleLinkClick}
          className="navbar-item"
        >
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
          <NavLinks
            to="/"
            className="navbar-item"
            onClick={() => authContext.logoutUserLocal()}
          >
            <LinkName fontColor={props.fontColor}>{link.name}</LinkName>
          </NavLinks>
        );
      }

      return (
        <NavLinks
          onClick={handleLinkClick}
          to={link.route}
          className="navbar-item"
        >
          <LinkName fontColor={props.fontColor}>{link.name}</LinkName>
        </NavLinks>
      );
    });
  };

  return (
    <Container>
      {context.mobileMenu && (
        <MobileMenuContainer id="mobile-menu">
          <NavMobileMenu className="navbar-menu">
            <NavMobileStart className="navbar-start">
              {createPageOptions()}
              {createAuthOptions()}
            </NavMobileStart>
          </NavMobileMenu>
        </MobileMenuContainer>
      )}
    </Container>
  );
};

export default MobileMenu;
