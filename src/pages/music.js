import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LargePlayer from '../components/elements/audio-player/largePlayer';
import Sidebar from '../components/elements/filter/sidebar';
import styled from 'styled-components';

const Music = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('http://localhost:5000/music');
      setTracks(res.data);
    }
    fetchData();
  }, []);

  
  const PageLayout = styled.div`
    width: 100vw;
    height: auto;
    display: grid;
    grid-template-columns: 20% 80%;
  `;
  const Container = styled.div`
    display: flex;
    justify-content: center;
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
    console.log(tracks);
    return tracks.map(data => {
      return (
        <LargePlayer
          trackTitle={data.presentationTitle}
          genre={data.genre}
          similarArtists={data.similarArtists.join(' X ')}
          price={data.price}
          trackUrl={data.trackUrl}
          cover={data.imageUrl}
        />
      );
    });
  };

  return (
    <PageLayout>
      <Sidebar />
      <div>
        <Heading>Latest Tracks</Heading>
        <Container>
          <div className="container">{createTracks()}</div>
        </Container>
      </div>
    </PageLayout>
  );
};

export default Music;
