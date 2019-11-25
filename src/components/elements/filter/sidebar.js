import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Sidebar = () => {
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
      }
    `}

    &:selected {
      border: 1px solid #fa2e6a;
    }
  `;

  const [moods, setMoods] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  const [err, setErr] = useState('');
  useEffect(() => {
    async function fetchOptionData() {
      try {
        const moodData = await axios.get('http://localhost:5000/music/mood');
        setMoods(moodData.data.sort());
        const genreData = await axios.get('http://localhost:5000/music/genre');
        return setGenres(genreData.data.sort());
      } catch (e) {
        return setErr(`An error occured: ${e}`);
      }
    }

    // async function fetchTrackData() {

    // }
    fetchOptionData();
  }, []);

  const handleClearAll = () => {
    setSelectedMoods([]);
    setSelectedGenre('');
  };

  const handleAddMood = mood => {
    setSelectedMoods(selectedMoods.concat([mood]));
  };

  const handleCheckboxChange = (e, category, option) => {
    if (category === 'genre') {
      if (selectedGenre === option) return setSelectedGenre('');
      return setSelectedGenre(option);
    }
    if (category === 'mood') {
      if (selectedMoods.includes(option)) {
        return setSelectedMoods(selectedMoods.filter(item => item !== option));
      }
    }
    return handleAddMood(option);
  };

  const handleSelected = (category, option) => {
    if (category === 'genre') {
      if (option !== selectedGenre) return false;
      return true;
    }
    if (category === 'mood') {
      if (selectedMoods.includes(option)) return true;
      return false;
    }
  };

  const createCheckboxes = (data, type, category) => {
    return data.map(option => {
      return (
        <div>
          <Label for={category}>
            <Checkbox
              key={option}
              type={type}
              name={category}
              onChange={e => handleCheckboxChange(e, category, option)}
              checked={handleSelected(category, option)}
            />
            <Paragraph>{option}</Paragraph>
          </Label>
        </div>
      );
    });
  };

  if (err) {
    return <Container>{err}</Container>;
  }
  return (
    <>
      <Container>
        <Heading>
          Filters <span onClick={handleClearAll}>Clear all</span>
        </Heading>
        <Subheading>Genres</Subheading>
        {createCheckboxes(genres, 'radio', 'genre')}
        <Subheading>Moods</Subheading>
        {createCheckboxes(moods, 'checkbox', 'mood')}
      </Container>
    </>
  );
};

export default Sidebar;
