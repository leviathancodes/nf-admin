import React from 'react';
import styled from 'styled-components';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const Container = styled.div`
  background-color: #efefef;
  padding: 1em;
`;

const Heading = styled.h3`
  color: ${props => props.theme.color.black};
  font-size: 2.5em;
  font-weight: 500;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  & > span.clear {
    font-size: 0.5em;
    color: ${props => props.theme.color.primaryPink};
    cursor: pointer;
    transition: 0.5s;

    &: hover {
      transform: translateY(-2.5px);
    }
  }
`;

const Paragraph = styled.p`
  font-size: 1.5em;
`;

const Subheading = styled.h3`
  color: ${props => props.theme.color.black};
  font-size: 2em;
  font-weight: 500;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  appearance: none;
  height: 25px;
  width: 25px;
  border: 1px solid ${props => props.theme.color.darkGrey};
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1em;
  transition: 0.3s;

  &:hover {
    border: 1px solid ${props => props.theme.color.primaryPink};
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
    transition: all 0.2s;

  }
`}

  &:selected {
    border: 1px solid ${props => props.theme.color.primaryPink};
  }
`;
const prices = [[0, 25], [25, 50], [50, 75], [75, 100], [100, 125], [125, 150]];

const BPMSlider = props => {
  return (
    <div>
      <Range
        min={0}
        max={200}
        value={props.bpm}
        onChange={e => props.setBPM(e)}
        step={10}
        trackStyle={[{ backgroundColor: '#FA2E6A', padding: 0 }]}
        railStyle={{ backgroundColor: '#707070', padding: 0 }}
        handleStyle={[
          {
            backgroundColor: '#FA2E6A',
            border: '1px solid white'
          },
          {
            backgroundColor: '#FA2E6A',
            border: '1px solid white'
          }
        ]}
      />
      <p>
        {props.bpm[0]} - {props.bpm[1]}
      </p>
    </div>
  );
};

const Sidebar = props => {
  const createCheckboxes = (data, type, category) => {
    return data.map(option => {
      let priceOption = '';
      if (category === 'price') {
        priceOption = `$${option[0]} - $${option[1] - 0.01}`;
      }
      return (
        <div>
          <Label for={category}>
            <Checkbox
              key={priceOption || option}
              type={type}
              name={category}
              onClick={() => props.handleCheckboxChange(category, option)}
              checked={props.handleSelected(category, option)}
            />
            <Paragraph>{priceOption || option}</Paragraph>
          </Label>
        </div>
      );
    });
  };

  if (props.err) {
    return <Container>{props.err}</Container>;
  }
  return (
    <Container>
      <Heading>
        <span>Filters</span>
        <span className="clear" key="clearAll" onClick={props.handleClearAll}>
          Clear all
        </span>
      </Heading>
      <Subheading>Genres</Subheading>
      {createCheckboxes(props.genres, 'radio', 'genre')}
      <Subheading>Moods</Subheading>
      {createCheckboxes(props.moods, 'checkbox', 'mood')}
      <Subheading>BPM</Subheading>
      <BPMSlider bpm={props.bpm} setBPM={props.setBPM} />
      <Subheading>Price</Subheading>
      {createCheckboxes(prices, 'radio', 'price')}
    </Container>
  );
};

export default Sidebar;
