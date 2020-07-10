import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0.5em;
  padding: 1em;
  height: 80%;
  width: 33%;
  color: white;
  background-color: #1d1d1d;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const List = styled.ul`
  list-style: inside;
  margin-bottom: 0.5em;
  font-size: 1em;
`;

const ListItem = styled.li``;

const Heading = styled.h3`
  font-size: 2em;
  font-family: futura-pt, sans-serif;
  font-weight: 500;
  font-style: normal;
  text-align: left;
  margin-bottom: 0.5em;
`;

const Description = styled.p`
  font-weight: 500;
  font-style: normal;
  font-size: 1.5em;
  text-align: left;
  margin-bottom: 1em;
`;

const AddToCart = styled.div`
  cursor: pointer;
  padding: 6px;
  transition: all 0.2s ease-in;
  background-color: ${props => props.theme.color.primaryPink};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  height: 62.5px;
  width: 150px;
  margin: 4em 0 2em;

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

const PurchaseContainer = ({ title, description, licenseBenefits }) => {
  const createLicenseList = () => {
    return licenseBenefits.map(item => {
      return (
        <div>
          <List>
            <ListItem>{item}</ListItem>
          </List>
        </div>
      );
    });
  };

  return (
    <Container>
      <Heading>{title}</Heading>
      <Description>{description}</Description>
      <Description>License includes:</Description>
      <div>{createLicenseList()}</div>
      <AddToCart>Add to cart</AddToCart>
    </Container>
  );
};

export default PurchaseContainer;
