import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  height: 75vh;
  position: relative;
  background: transparent;
  overflow: hidden;
`;
const ClipPath = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%);
  background-color: ${props => props.theme.color.pastelBlue};
`;

const Heading = styled.h1`
  font-size: 64px;
  margin: 1.5em 0 0.5em 0;

  @media (max-width: 992px) {
    text-align: center;
    font-size: 32px;
  }
`;

const Pink = styled.span`
  color: ${props => props.theme.color.primaryPink};
`;

const Description = styled.p`
  width: 50%;
  font-weight: 500;
  text-align: center;

  @media (max-width: 992px) {
    width: 80%;
  }
`;

const CTA = styled(Link)`
  position: absolute;
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
  box-shadow: ${props => props.theme.color.boxShadow};
  top: 60%;
  left: 50%;
  transform: translate(-50%, 50%);
  @media (max-width: 992px) {
    text-align: center;
    font-size: 24px;
  }
  `;

const SiteDescription = () => {
  return (
    <Container>
      <ClipPath>
        <Heading>Music Made Right.</Heading>
        <Description>
          With over <Pink>four years</Pink> of music production, mixing and
          mastering under my belt, we can work together to get the{' '}
          <Pink>right sound for you</Pink>. From boom-bap and lo-fi to trap,
          drill and synthwave music, I’ve strived to perfect my craft and
          deliver the utmost quality. There are{' '}
          <Pink>over 100 beats and counting</Pink> available in my marketplace,
          ready for <Pink>your next hit!</Pink>{' '}
        </Description>
      </ClipPath>
      <CTA to="/music">Listen Now</CTA>
    </Container>
  );
};

export default SiteDescription;
