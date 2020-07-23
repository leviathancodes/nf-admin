import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// Navigation
export const LinkName = styled.p`
  color: ${props => (props.fontColor ? props.fontColor : 'auto')};
`;

// Elements for Jumbotron Styline - start
const JumboContainer = styled.div`
  background: url(${props => props.url});
  background-repeat: no-repeat;
  background-position: 25% 25%;
  background-size: cover;
  position: relative;
  height: ${props => props.height};
`;

const JumboFirstOverlay = styled.div`
  background: ${props => props.theme.color.landingGradient};
  height: ${props => props.height};
  z-index: 2;
`;

const JumboSecondOverlay = styled.div`
  background: ${props => props.theme.color.darkOverlay};
  height: ${props => props.height};
  z-index: 3;
`;

const RainbowStrip = styled.div`
  background: ${props => props.theme.color.largeBorderGradient};
  width: 100%;
  height: 5px;
  position: absolute;
`;

const JumboTitle = styled.h1`
  color: white;
  font-size: 4em;
  font-family: 'Lato', sans-serif;
  text-align: center;
  font-weight: 200;
`;

const JumboTitleContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Container for mood tags

export const MoodContainer = styled.div`
  display: flex;
  align-items: center;
`;

// Container for any page with a sidebar (single track, /music, /checkout)
export const SideBarPageContainer = styled.div`
  height: auto;
  min-height: 100vh;
  display: grid;
  grid-template-columns: ${props => props.division};
`;

export const Bullet = styled.div`
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  background: ${props => props.theme.color.primaryBlue};
  margin: 0 0.25em 0 0.25em;
`;

export const JumboOverlay = ({ url, height, title }) => {
  return (
    <JumboContainer url={url} height={height}>
      <JumboFirstOverlay height={height}>
        <JumboSecondOverlay height={height}>
          <RainbowStrip />
          {title ? (
            <JumboTitleContainer>
              <JumboTitle>{title}</JumboTitle>
            </JumboTitleContainer>
          ) : (
            ''
          )}
        </JumboSecondOverlay>
      </JumboFirstOverlay>
    </JumboContainer>
  );
};

// Shared navigation

export const NavStart = styled.div`
display: flex;
flex-direction: row;
jusitfy-content: flex-start
margin-right: auto;
align-items:
`;

export const NavEnd = styled.div`
  display: flex;  
  justify-content: flex-end
  margin-left: auto;
`;

export const NavMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
`;

export const NavBrand = styled.div``;

export const NavItem = styled(NavLink)`
  display: block
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0 1em 0 1em;
`;

// Footer player

export const FooterPlayerItem = styled.div`
  display: block
  flex-grow: 0
  flex-shrink: 0
  padding: 0 1em 0 1em;
`;

