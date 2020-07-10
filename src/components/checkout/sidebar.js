import React from 'react';
import styled from 'styled-components';
import StripeCheckout from 'react-stripe-checkout';
import Checkout from '../../pages/checkout';

const Container = styled.div`
  height: 100%;
  background-color: ${props => props.theme.color.pastelBlue};
  padding: 2em;
`;

const Heading = styled.h1`
  color: ${props => props.theme.color.black};
  font-size: 64px;
`;

const Paragraph = styled.p``;

const CheckoutSidebar = ({ price }) => {
  return (
    <Container>
      <Heading>Your total: {price}</Heading>
      <Paragraph>
        Files will be delivered immediately via email, and will also be
        downloadable via your account page.
      </Paragraph>
    </Container>
  );
};

export default CheckoutSidebar;
