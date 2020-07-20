import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AudioContext } from '../context/audioContext';
import { NavigationContext } from '../context/navigationContext';
import Jumbotron from '../components/landing/jumbotron';
import Features from '../components/landing/features';
import SiteDescription from '../components/landing/siteDescription';
import LandingCarousel from '../components/landing/latestCarousel';
import ContactSection from '../components/landing/contact';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
`;

const Landing2 = () => {
  const audioContext = useContext(AudioContext);
  const navigationContext = useContext(NavigationContext);

  useEffect(() => {
    navigationContext.setVisibility(false);
    audioContext.setFooterVisibility('none');

    return function setNavVisibility() {
      navigationContext.setVisibility(true);
      audioContext.setFooterVisibility('flex');
    };
  }, [audioContext, navigationContext]);

  return (
    <Container>
      <Jumbotron />
      <SiteDescription />
      <Features />
      <LandingCarousel />
      <ContactSection />
    </Container>
  );
};

export default Landing2;
