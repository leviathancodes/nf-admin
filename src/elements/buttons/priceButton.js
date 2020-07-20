import React, { useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartContext } from '../../context/shoppingCartContext';

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

  @media (max-width: 750px) {
    width: 100px;
    height: 41.66px;
    font-weight: 500;
  }
`;

const PriceText = styled.p`
  font-size: 24px;
  color: white;
  margin-right: 10px;

  @media (max-width: 750px) {
    font-size: 16px;
    margin-left: 5px;
  }
`;

const Cart = styled(FontAwesomeIcon)`
  color: white;
  font-size: 24px;
`;

const PriceButton = ({ id, price }) => {
  const { setLicenseModal, setModalPrice } = useContext(ShoppingCartContext);
  return (
    <Container
      onClick={() => {
        setModalPrice(price);
        setLicenseModal(true);
      }}
    >
      <Cart icon={faCartPlus} />
      <PriceText>${price}</PriceText>
    </Container>
  );
};

export default PriceButton;
