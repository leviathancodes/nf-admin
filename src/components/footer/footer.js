import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  position: relative;
  bottom: 0;
  width: 100%;
  height: 15vh;
  align-items: center;
  box-shadow: 0 -4px 5px 0 #0000004b;
  padding: 0.25em;

  @media (max-width: 1028px) {
    font-size: 24px;
    height: 35vh;
    flex-direction: column;
    padding: 1em;
  }

  @media (max-width: 514px) {
    font-size: 16px;
    height: 25vh;
  }
`;

const DesktopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const FooterStart = styled.div`
  display: flex;
  width: 80%;
  flex-direction: row;
  justify-content: space-between;
  aign-items: center;

  @media (max-width: 1028px) {
    width: 100%;
    flex-direction: column;
    justify-content: auto;
  }
`;

const FooterStartLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FooterMiddle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5em;
`;

const FooterEnd = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 1028px) {
    margin-top: 1em;
    justify-content: center;
  }
`;

const SocialMediaLogo = styled.img`
  margin: 0.5em;
  width: 60%;
`;

const Footer = () => {
  const biggerThanMobileWidth = useMediaQuery({ query: '(min-width: 1028px)' });
  const mobileWidth = useMediaQuery({ query: '(max-width: 1028px)' });

  return (
    <Container id="footer">
      {biggerThanMobileWidth ? (
        <DesktopContainer>
          {' '}
          <FooterStart>
            <p>Designed and developed by Lance Huddleston II</p>
            <NavLink to="/">Terms of Service</NavLink>
            <NavLink to="/">Privacy Policy</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <p>Owned by Nomad Music LLC</p>
          </FooterStart>
          <FooterEnd>
            <a href="https://twitter.com/1foxtrots">
              <SocialMediaLogo
                alt="Twitter logo"
                src="https://nf-music-test.s3.amazonaws.com/icon_assets/socialMedia/twitter.svg"
              />
            </a>
            <a href="https://www.instagram.com/nomad.music_/">
              <SocialMediaLogo
                alt="Instagram logo"
                src="https://nf-music-test.s3.amazonaws.com/icon_assets/socialMedia/insta.svg"
              />
            </a>
          </FooterEnd>
        </DesktopContainer>
      ) : (
        <div>
          <FooterStart>
            <p>Designed and developed by Lance Huddleston II</p>
            <FooterStartLinks>
              <NavLink to="/">Terms of Service</NavLink>
              <NavLink to="/">Privacy Policy</NavLink>
            </FooterStartLinks>
          </FooterStart>
          <FooterMiddle>
            <NavLink to="/contact">Contact</NavLink>
            <p>Owned by Nomad Music LLC</p>
          </FooterMiddle>
          <FooterEnd>
            <a href="https://twitter.com/1foxtrots">
              <SocialMediaLogo
                alt="Twitter logo"
                src="https://nf-music-test.s3.amazonaws.com/icon_assets/socialMedia/twitter.svg"
              />
            </a>
            <a href="https://www.instagram.com/nomad.music_/">
              <SocialMediaLogo
                alt="Instagram logo"
                src="https://nf-music-test.s3.amazonaws.com/icon_assets/socialMedia/insta.svg"
              />
            </a>
          </FooterEnd>
        </div>
      )}
    </Container>
  );
};

export default Footer;
