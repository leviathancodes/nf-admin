import React, { useContext } from 'react';
import styled from 'styled-components';
import { ShoppingCartContext } from '../../context/shoppingCartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  height: 62.5px;
  width: 150px;
  background-color: ${props => props.theme.color.primaryPink};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  padding: 6px;
  transition: all 0.2s ease-in;

  &:hover {
    background-color: ${props => props.theme.color.pastelPink};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px 0 #0000004b;
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 2px 0 #0000004b;
  }
`;

const PriceText = styled.p`
  font-size: 24px;
  color: white;
  margin-right: 10px;
`;

const Cart = styled(FontAwesomeIcon)`
  color: white;
  font-size: 24px;
`;

const PriceButton = ({ id, price }) => {
  const { addItemToCart } = useContext(ShoppingCartContext);
  return (
    <Container onClick={() => addItemToCart(id)}>
      <Cart icon={faCartPlus} />
      <PriceText>${price}</PriceText>
    </Container>
  );
};

export default PriceButton;
