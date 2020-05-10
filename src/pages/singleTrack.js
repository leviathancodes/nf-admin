import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import LargePlayer from '../components/audio-player/largePlayer/largePlayer';
import TrackInformation from '../components/singleTrack/sidebar';

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 25% 75%;
`;

const Content = styled.div`
  padding: 2.5em;
`;
const SingleTrack = ({ match }) => {
  const [track, setTrack] = useState(false);
  const qsp = match.params.track;
  console.log(qsp);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const { data } = await axios.get(`/api/music/search?track=${qsp}`);
        console.log(data);
        setTrack(data);
      } catch (e) {
        return console.log(e);
      }
    };
    fetchTrack();
  }, []);

  if (!track) {
    return <p>Loading...</p>;
  }
  return (
    <Container>
      <TrackInformation
        title={track.presentationTitle}
        genre={track.genre}
        similarArtists={track.similarArtists.join(', ')}
        price={track.price}
        bpm={track.bpm}
        release={new Date(track.createdAt).toDateString()}
      />
      <Content>
        <LargePlayer
          trackTitle={track.presentationTitle}
          genre={track.genre}
          similarArtists={`Similar Artists: ${track.similarArtists.join(', ')}`}
          price={track.price}
          duration={track.duration}
          cover={track.imageUrl}
          trackUrl={track.trackUrl}
          bpm={track.bpm}
          likedBy={track.likedBy}
        />
      </Content>
    </Container>
  );
};

export default SingleTrack;
