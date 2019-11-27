import React, { useEffect, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { AudioContext } from '../context/audioContext';
import LargePlayer from '../components/elements/audio-player/largePlayer';
import Sidebar from '../components/elements/filter/sidebar';

const Music = () => {
  const [tracks, setTracks] = useState([]);
  const [moods, setMoods] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  const context = useContext(AudioContext);

  // Fetch data for tracks
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('http://localhost:5000/music');
      setTracks(res.data);
    }
    console.log('rendered fetch data for tracks in music.js')
    fetchData();
  }, []);

  // Fetch sidebar options
  useEffect(() => {
    console.log('rerenderd sidebar');
    async function fetchData() {
      const moodData = await axios.get('http://localhost:5000/music/mood');
      const genreData = await axios.get('http://localhost:5000/music/genre');
      setMoods(moodData.data.sort());
      setGenre(genreData.data.sort());
    }
    fetchData();
  }, []);

  const handleClearAll = () => {
    setSelectedMoods([]);
    setSelectedGenre('');
  };

  const handleAddMood = useCallback(mood => {
      setSelectedMoods(selectedMoods.concat([mood]));
    },
    [selectedMoods]
  );

  const handleCheckboxChange = useCallback(
    (category, option) => {
      console.log(option);
      if (category === 'genre') {
        if (selectedGenre === option) return setSelectedGenre('');
        return setSelectedGenre(option);
      }
      if (category === 'mood') {
        if (selectedMoods.includes(option)) {
          return setSelectedMoods(
            selectedMoods.filter(item => item !== option)
          );
        }
      }
      return handleAddMood(option);
    },
    [handleAddMood, selectedMoods, selectedGenre]
  );

  const handleSelected = useCallback(
    (category, option) => {
      if (category === 'genre') {
        if (option !== selectedGenre) return false;
        return true;
      }
      if (category === 'mood') {
        if (selectedMoods.includes(option)) return true;
        return false;
      }
    },
    [selectedGenre, selectedMoods]
  );

  const PageLayout = styled.div`
    width: 100vw;
    height: auto;
    display: grid;
    grid-template-columns: 20% 80%;
  `;
  const Container = styled.div`
    display: flex;
    justify-content: center;
    min-height: 100vh;
  `;

  const Heading = styled.h3`
    font-size: 5em;
    color: #fa2e6a;
    font-family: futura-pt, sans-serif;
    font-weight: 500;
    font-style: normal;
    text-align: center;
    margin-bottom: 100px;
  `;

  const createTracks = () => {
    return tracks.map(data => {
      return (
        <LargePlayer
          trackTitle={data.presentationTitle}
          genre={data.genre}
          similarArtists={data.similarArtists.join(' X ')}
          price={data.price}
          trackUrl={data.trackUrl}
          cover={data.imageUrl}
          duration={data.duration}
        />
      );
    });
  };

  return (
    <PageLayout>
      {moods && genre && (
        <Sidebar
          moods={moods}
          genres={genre}
          handleClearAll={handleClearAll}
          handleCheckboxChange={handleCheckboxChange}
          handleSelected={handleSelected}
          handleAddMood={handleAddMood}
        />
      )}
      <div>
        <Heading>{context.message}</Heading>
        <Container>
          <div className="container">{createTracks()}</div>
        </Container>
      </div>
    </PageLayout>
  );
};

export default Music;
