import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  color: ${props => (props.color ? props.color : 'auto')};
`;

const Cart = styled(FontAwesomeIcon)`
  margin: 0 0.5em 0 0.5em;
  font-size: 0.75em;
`;

const CartCountContainer = styled.div`
  border-radius: 50%;
  padding: 0.5em;
  background-color: ${props => props.theme.color.secondaryGrey};
  height: 0.5em;
  width: 0.5em;
  margin: 0 0.5em 0 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CartCount = styled.p`
  font-size: 0.5em;
  color: white;
`;

const NavCart = ({ name, count, fontColor }) => {
  return (
    <Container color={fontColor}>
      <Cart icon={faCartPlus} />
      <p>{name}</p>
      <CartCountContainer>
        <CartCount>{count}</CartCount>
      </CartCountContainer>
    </Container>
  );
};

export default NavCart;
