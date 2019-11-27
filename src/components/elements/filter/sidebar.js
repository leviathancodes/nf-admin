import React, {useEffect} from 'react';
import styled from 'styled-components';

const Sidebar = props => {
  const Container = styled.div`
    background-color: #efefef;
    padding: 1em;
  `;

  const Heading = styled.h3`
    color: #1d1d1d;
    font-size: 2.5em;
    font-weight: 500;

    & > span {
      font-size: 0.5em;
      color: #fa2e6a;
    }
  `;

  const Paragraph = styled.p`
    font-size: 1.5em;
  `;

  const Subheading = styled.h3`
    color: #1d1d1d;
    font-size: 2em;
    font-weight: 500;
  `;

  const Label = styled.label`
    display: flex;
    align-items: center;
  `;

  const Checkbox = styled.input`
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    height: 25px;
    width: 25px;
    border: 1px solid #4a4a4a;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1em;
    transition-duration: 0.3s;

    &:hover {
      border: 1px solid #fa2e6a;
    }

    ${({ checked }) =>
      checked &&
      `
      border: 1px solid #fa2e6a;
      &::before {
        display: inline-block;
        content: '';
        height: 15px;
        width: 15px;
        border-radius: 50%;
        background-color: #fa2e6a;
        transition:  0.2s;

      }
    `}

    &:selected {
      border: 1px solid #fa2e6a;
    }
  `;
  const createCheckboxes = (data, type, category) => {
    return data.map(option => {
      return (
        <div>
          <Label for={category}>
            <Checkbox
              key={option}
              type={type}
              name={category}
              onClick={e => props.handleCheckboxChange(category, option)}
              checked={props.handleSelected(category, option)}
            />
            <Paragraph>{option}</Paragraph>
          </Label>
        </div>
      );
    });
  };


  if (props.err) {
    return <Container>{props.err}</Container>;
  }
  return (
    <>
      <Container>
        <Heading>
          Filters <span key="clearAll" onClick={props.handleClearAll}>Clear all</span>
        </Heading>
        <Subheading>Genres</Subheading>
        {createCheckboxes(props.genres, 'radio', 'genre')}
        <Subheading>Moods</Subheading>
        {createCheckboxes(props.moods, 'checkbox', 'mood')}
      </Container>
    </>
  );
};

export default Sidebar;
