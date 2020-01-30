import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import ProfileSidebar from '../components/profile/profileSidebar';
import InfoPanel from '../components/profile/infoPanel';
import { UserContext } from '../context/userContext';

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 25% 55% 20%;
`;

const AccountOptions = styled.div`
  background-color: ${props => props.theme.color.lightGrey};
`;

const Main = styled.div`
  padding: 4em;
`;

const MainHeading = styled.h1`
  font-size: 32px;
  font-weight: 500;
  color: ${props => props.theme.color.primaryPink};
`;

const MainSubheading = styled.h3`
  font-size: 24px;
  color: ${props => props.theme.color.black};
`;

const LikedAndPurchased = styled.div`
  background-color: ${props => props.theme.color.lightGrey};
`;

const Profile = () => {
  const userContext = useContext(UserContext);

  console.log(userContext.user);

  if (!userContext.user && !localStorage.getItem('jwtToken')) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <AccountOptions>
        <ProfileSidebar />
      </AccountOptions>
      <Main>
        <MainHeading>Good afternoon, Lance</MainHeading>
        <MainSubheading>
          Manage your account, review your liked and purchased tracks, and more.
        </MainSubheading>
        <InfoPanel
          src={`${process.env.REACT_APP_NOMAD_MUSIC_S3}/icon_assets/iconmonstr-wrench.svg`}
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
        <InfoPanel
          src={`${process.env.REACT_APP_NOMAD_MUSIC_S3}/icon_assets/iconmonstr-headphones.svg`}
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
      </Main>
      <LikedAndPurchased />
    </Container>
  );
};

export default Profile;
