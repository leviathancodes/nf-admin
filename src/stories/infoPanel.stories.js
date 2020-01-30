import React from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import InfoPanel from '../components/profile/infoPanel';
import '../styles/scss/main.scss';
import theme from '../styles/styled-components/theme';

export default {
  title: 'Info Panel',
  component: InfoPanel
};

export const YourMusicPanel = () => {
  return (
    <ThemeProvider theme={theme}>
      <InfoPanel
        src={`${process.env.NOMAD_MUSIC_S3}/icon_assets/iconmonstr-headphones.svg`}
        title="Your Music"
        iconAlt="Over-the-ear headphones"
        staticData={{
          a: 'Liked tracks: 8',
          b: 'Purchased tracks: 8'
        }}
        firstLink={{
          route: '/404',
          title: 'View all liked tracks'
        }}
        secondLink={{
          route: '/404',
          title: 'View all purchased tracks'
        }}
      />
    </ThemeProvider>
  );
};

export const YourAccountPanel = () => {
  return (
    <ThemeProvider theme={theme}>
      <InfoPanel
        src={`${process.env.NOMAD_MUSIC_S3}/icon_assets/iconmonstr-wrench.svg`}
        title="Your Account"
        iconAlt="A wrench"
        staticData={{
          a: 'Email: testuser@gmail.com',
          b: 'Password: ***********'
        }}
        firstLink={{
          route: '/404',
          title: 'Change email'
        }}
        secondLink={{
          route: '/404',
          title: 'Change password'
        }}
      />
    </ThemeProvider>
  );
};

