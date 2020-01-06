import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AudioContext } from '../context/audioContext';
import { NavigationContext } from '../context/navigationContext';

const Container = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  height: 100vh;
  width: auto;
  background: ${props => props.theme.color.landingGradient};
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LandingImage = styled.img`
  width: 80%;
  height: 80%;
  margin-right: 50px;
`;

const ContentContainer = styled.div`
  height: auto;
  width: auto;
  margin-top: 80px;
`;

const Heading = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 128px;
  font-weight: 200;
  margin-left: 64px;
`;

const Subheading = styled.div`
  font-size: 64px;
  margin-left: 64px;
`;

const CTA = styled.div`
  height: auto;
  width: 80%;
  family: 'futura-pt, sans-serif',
  weight: '500',
  style: 'normal'
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props  => props.theme.color.primaryPink};
  color:  white;
  font-size:  64px;
  padding: 16px;
  border-radius: 5px
  margin: 64px 0 0 64px;
  `;

const Landing = () => {
  const audioContext = useContext(AudioContext);
  const navigationContext = useContext(NavigationContext);
  useEffect(() => {
    audioContext.setFooterVisibility('none');
    navigationContext.setBackgroundColor('rgba(216,228,240,1)');
  }, [audioContext.footerVisibility]);
  return (
    <Container>
      <ContentContainer>
        <Heading>Nomad Fox</Heading>
        <Subheading>Studio quality music.</Subheading>
        <Subheading>Undeground pricing.</Subheading>
        <CTA>Listen Now</CTA>
      </ContentContainer>
      <ImageContainer>
        <LandingImage src="https://d3g8t2jk5ak9zp.cloudfront.net/img/002_landing_img.svg"/>
      </ImageContainer>
    </Container>
  );
};

export default Landing;
