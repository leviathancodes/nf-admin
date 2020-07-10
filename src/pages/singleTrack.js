import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import LargePlayer from '../components/audio-player/largePlayer/largePlayer';
import TrackInformation from '../components/singleTrack/sidebar';
import {
  JumboOverlay,
  MoodContainer,
  SideBarPageContainer
} from '../components/shared/shared';
import MoodTag from '../elements/moodTag/moodTag';

const Content = styled.div`
  height: 100%;
`;

const PlayerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2em;
`;

const Paragraph = styled.p`
  font-size: 1em;
`;

const InfoContainer = styled.div`
  padding: 2em;
`;

const SingleTrack = ({ match }) => {
  const [track, setTrack] = useState(false);
  const qsp = match.params.track;

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

  const tags = () => {
    return (
      <MoodContainer>
        {track.mood.map(mood => {
          return <MoodTag key={mood} mood={mood} />;
        })}
      </MoodContainer>
    );
  };

  if (!track) {
    return <p>Loading...</p>;
  }
  return (
    <SideBarPageContainer division="25% 75%">
      <TrackInformation
        title={track.presentationTitle}
        genre={track.genre}
        similarArtists={track.similarArtists.join(', ')}
        price={track.price}
        bpm={track.bpm}
        release={new Date(track.createdAt).toDateString()}
        moods={track.mood}
      />
      <Content>
        <JumboOverlay
          height="40vh"
          url={track.imageUrl}
          title={track.presentationTitle}
        />
        <PlayerContainer id="vagine">
          <LargePlayer
            trackTitle={track.presentationTitle}
            genre={track.genre}
            similarArtists={`Similar Artists: ${track.similarArtists.join(
              ', '
            )}`}
            price={track.price}
            duration={track.duration}
            cover={track.imageUrl}
            trackUrl={track.mp3Url || track.wavUrl}
            bpm={track.bpm}
            likedBy={track.likedBy}
          />
        </PlayerContainer>
        <InfoContainer>
          {tags()}
          <Paragraph>Audio Formats: MP3, WAV, WAV w/ Trackouts</Paragraph>
          <Paragraph>
            Release date: {new Date(track.createdAt).toDateString()}
          </Paragraph>
        </InfoContainer>
      </Content>
    </SideBarPageContainer>
  );
};

export default SingleTrack;
