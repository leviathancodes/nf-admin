import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  height: 50vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  @media (max-width: 992px) {
    height: 75vh;
  }
`;

const ClipPath = styled.div`
  background-color: blue;
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.color.pastelBlue};
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Heading = styled.h3`
  font-size: 64px;
  text-align: center;
  margin-top: 1em;

  @media (max-width: 992px) {
    font-size: 32px;
  }
`;

const Subheading = styled.p`
  margin: 1em 0 5em 0;
  width: 50%;
  text-align: center;
`;

const CTA = styled(Link)`
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
  z-index: 3;
  transform: translate(0, -50%);
  width: max-content;
  `;

const ContactSection = () => {
  return (
    <Container>
      <ClipPath>
        <Heading>Let’s Get In Touch</Heading>
        <Subheading>
          Whether it’s about a specific beat, a request for a custom beat, or
          you just want to talk about your wife leaving you, I’ve got you
          covered. Hit the button below so we can connect.
        </Subheading>
      </ClipPath>
      <CTA to="/contact">Contact Me</CTA>
    </Container>
  );
};

export default ContactSection;
