import React from 'react';
import styled from 'styled-components';

const Sidebar = () => {
  const Container = styled.div`
    background-color: #f8f8f8;
    padding: 1em;
  `;

  const Heading = styled.h3`
    color: #1d1d1d;
    font-size: 2em;
    font-weight: 500;
  `;

  return (
    <>
      <Container>
        <Heading>Filters</Heading>
      </Container>
    </>
  );
};

export default Sidebar;
