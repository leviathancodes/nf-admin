import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AudioContext } from '../context/audioContext';
import { NavigationContext } from '../context/navigationContext';
import Jumbotron from '../components/landing/jumbotron';
import Features from '../components/landing/features';
import SiteDescription from '../components/landing/siteDescription';

const Landing2 = () => {
  const audioContext = useContext(AudioContext);
  const navigationContext = useContext(NavigationContext);

  useEffect(() => {
    navigationContext.setVisibility(false);
    audioContext.setFooterVisibility('none');

    return function setNavVisibility() {
      navigationContext.setVisibility(true);
      audioContext.setFooterVisibility('auto');
    };
  }, []);

  return (
    <div>
      <Jumbotron />
      <SiteDescription />
      <Features />
    </div>
  );
};

export default Landing2;
