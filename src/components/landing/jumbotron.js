import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Nav from '../navigation/navigation';

const Container = styled.div`
  background: url(${process.env.REACT_APP_NOMAD_MUSIC_S3}/img/landing_nomad.jpeg);
  background-repeat: no-repeat;
  background-position: 25% 25%;
  background-size: 100%;
  position: relative;
  height: 90vh;

  @media (max-width: 1028px) {
    background-size: cover;
  }
`;

const FirstOverlay = styled.div`
  background: ${props => props.theme.color.landingGradient};
  height: 100vh;
  z-index: 2;
`;

const SecondOverlay = styled.div`
  background: ${props => props.theme.color.darkOverlay};
  height: 100vh;
  z-index: 3;
`;

const RainbowStrip = styled.div`
  background: ${props => props.theme.color.largeBorderGradient};
  width: 100%;
  height: 5px;
  position: absolute;
`;

const Heading = styled.h1`
  color: white;
  font-size: 96px;
  font-family: 'Lato', sans-serif;
  font-weight: 100;
  margin-bottom: 10px;

  @media (max-width: 750px) {
    font-size: 48px;
  }
`;

const Main = styled.div`
  margin-left: 5em;

  @media (max-width: 750px) {
    text-align: center;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Subheading = styled.h1`
  color: white;
  font-size: 32px;
  margin-bottom: 100px;

  @media (max-width: 750px) {
    font-size: 24px;
  }
`;

const CTA = styled(Link)`
  height: auto;
  family: 'futura-pt, sans-serif',
  weight: '500',
  style: 'normal'
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.color.secondaryPink};
  color: white;
  font-size: 32px;
  border-radius: 5px
  padding: 32px;
  box-shadow: ${props => props.theme.color.boxShadow}

  @media (max-width: 750px) {
    padding: 24px;
    font-size: 16px;
    margin-top: auto;
    position: none;
  }

  @media (min-width: 750px) {
    position: absolute;
  }
  `;

const Jumbotron = () => {
  return (
    <Container>
      <FirstOverlay>
        <SecondOverlay>
          <RainbowStrip />
          <Nav color="rgba(129, 202, 136, 0)" fontColor="white" />
          <Main>
            <Heading>Nomad Fox</Heading>
            <Subheading>
              Hip-hop and electronic music producer based in the DMV.
            </Subheading>
            <CTA to="/music">Listen Now</CTA>
          </Main>
        </SecondOverlay>
      </FirstOverlay>
    </Container>
  );
};

export default Jumbotron;
