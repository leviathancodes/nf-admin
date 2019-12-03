import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border-radius: 1.25em;
  border: 1px solid ${props => props.theme.color.moodBorder};
  display: flex;
  justify-content: center;
  padding: 2.5px;
  margin: 0 5px 0 5px;
  align-items: center;
  background-color: white;
`;

const Paragraph = styled.p`
  color: ${props => props.theme.color.secondaryGrey};
  padding: 5px;
`;

const MoodTag = props => {
  return (
    <Container>
      <Paragraph>{props.mood}</Paragraph>
    </Container>
  );
};

export default MoodTag;
