import React, { useEffect, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { AudioContext } from '../context/audioContext';
import { NavigationContext } from '../context/navigationContext';
import SmallPlayer from '../components/audio-player/smallPlayer/smallPlayer';
import Sidebar from '../components/filter/sidebar';

const PageLayout = styled.div`
  width: 100vw;
  height: auto;
  display: grid;
  grid-template-columns: 25% 75%;
  padding-bottom: 6em;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const Heading = styled.h3`
  font-size: 5em;
  color: ${props => props.theme.color.primaryPink};
  font-family: ${props => props.theme.font.family};
  font-weight: ${props => props.theme.font.weight};
  font-style: ${props => props.theme.font.style};
  padding: 40px;
`;

const Subheading = styled.p`
  color: ${props => props.theme.color.primaryGrey};
  font-family: ${props => props.theme.font.family};
  font-weight: ${props => props.theme.font.weight};
  font-style: ${props => props.theme.font.style};
  padding: 40px;
  font-size: 2em;
`;

const Music = () => {
  const [tracks, setTracks] = useState([]);
  const [moods, setMoods] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [bpm, setBPM] = useState([0, 200]);
  const [price, setPrice] = useState([0, 150]);

  const context = useContext(AudioContext);
  const navigationContext = useContext(NavigationContext);

  // Returns new tracks based on selected filters
  useEffect(() => {
    async function fetchFilteredTracks() {
      if (!selectedMoods && !selectedGenre) {
        const res = await axios.get('http://localhost:5000/music');
        return setTracks(res.data);
      }

      const params = {
        genre: selectedGenre,
        mood: selectedMoods,
        bpm,
        price
      };

      const res = await axios.request({
        method: 'GET',
        url: 'http://localhost:5000/music/search',
        params
      });

      setTracks(res.data);
    }
    fetchFilteredTracks();
  }, [selectedMoods, selectedGenre, bpm, price]);

  // Initial fetch for tracks, sets footer visibility
  useEffect(() => {
    context.setFooterVisibility('auto');
    navigationContext.setBackgroundColor('auto');
    async function fetchData() {
      const res = await axios.get('http://localhost:5000/music');
      console.log(res);
      setTracks(res.data);
      if (context.playlist.length < 1 || !context.playing) {
        context.setPlaylist(res.data);
      }
    }
    console.log('rendered fetch data for tracks in music.js');
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
    setPrice([0, 200]);
    setBPM([0, 200]);
  };

  const handleAddMood = useCallback(
    mood => {
      setSelectedMoods(selectedMoods.concat([mood]));
    },
    [selectedMoods]
  );

  const handleCheckboxChange = useCallback(
    (category, option) => {
      console.log(price);
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
      if (category === 'price') {
        if (option[0] === price[0] && option[1] === price[1]) {
          return setPrice([0, 200]);
        }
        return setPrice(option);
      }
      return handleAddMood(option);
    },
    [price, handleAddMood, selectedGenre, selectedMoods]
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
      if (category === 'price') {
        if (option[0] === price[0] && option[1] === price[1]) return true;
        return false;
      }
    },
    [price, selectedGenre, selectedMoods]
  );

  const createTracks = () => {
    return tracks.map(data => {
      return (
        <SmallPlayer
          trackTitle={data.presentationTitle}
          genre={data.genre}
          similarArtists={data.similarArtists.join(', ')}
          price={data.price}
          trackUrl={data.trackUrl}
          cover={data.imageUrl}
          duration={data.duration}
          moods={data.mood}
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
          bpm={bpm}
          setBPM={setBPM}
        />
      )}
      <div>
        <Heading>{context.message}</Heading>
        <Subheading>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim{' '}
        </Subheading>

        <Container>{createTracks()}</Container>
      </div>
    </PageLayout>
  );
};

export default Music;
