import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import LargePlayer from '../components/audio-player/largePlayer/largePlayer';
import MobilePlayer from '../components/audio-player/mobilePlayer/mobilePlayer';
import TrackInformation from '../components/singleTrack/sidebar';
import {
  JumboOverlay,
  MoodContainer,
  SideBarPageContainer
} from '../components/shared/shared';
import MoodTag from '../elements/moodTag/moodTag';
import PriceButton from '../elements/buttons/priceButton';

const Content = styled.div`
  height: 100vh;
  position: relative;
  margin-bottom: 10em;
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
  padding-left: 2em;

  @media (max-width: 1028px) {
    display: flex;
    align-items: center;
    jusitfy-content: center;
    flex-direction: column;
    padding: 0;
    margin-top: 1em;
  }
`;

const MobileTitle = styled.h1`
  font-size: 32px;
  color: ${props => props.theme.color.primaryPink}
  font-weight: 500;
`;

const MobileMetadata = styled.p`
  font-size: 16px;
`;

const MobileInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TagContainer = styled(MoodContainer)`
  @media (max-width: 1028px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SingleTrack = ({ match }) => {
  const [track, setTrack] = useState(false);
  const qsp = match.params.track;

  const biggerThanMobileWidth = useMediaQuery({ query: '(min-width: 1028px)' });
  const mobileWidth = useMediaQuery({ query: '(max-width: 1028px)' });

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
  }, [qsp]);

  const tags = () => {
    return (
      <TagContainer>
        {track.mood.map(mood => {
          return <MoodTag key={mood} mood={mood} />;
        })}
      </TagContainer>
    );
  };

  if (!track) {
    return <p>Loading...</p>;
  }
  return (
    <SideBarPageContainer division={biggerThanMobileWidth ? '25% 75%' : '100%'}>
      {biggerThanMobileWidth && (
        <TrackInformation
          title={track.presentationTitle}
          genre={track.genre}
          similarArtists={track.similarArtists.join(', ')}
          price={track.price}
          bpm={track.bpm}
          release={new Date(track.createdAt).toDateString()}
          moods={track.mood}
        />
      )}
      <Content>
        <JumboOverlay
          height="40vh"
          url={track.imageUrl}
          title={track.presentationTitle}
        />
        <PlayerContainer>
          {biggerThanMobileWidth ? (
            <LargePlayer
              trackTitle={track.presentationTitle}
              genre={track.genre}
              similarArtists={`Similar Artists: ${track.similarArtists.join(
                ', '
              )}`}
              price={track.price}
              duration={track.duration}
              cover={track.imageUrl}
              trackUrl={track.trackUrl}
              bpm={track.bpm}
              likedBy={track.likedBy}
            />
          ) : (
            <MobilePlayer
              trackTitle={track.presentationTitle}
              genre={track.genre}
              similarArtists={`Similar Artists: ${track.similarArtists.join(
                ', '
              )}`}
              price={track.price}
              duration={track.duration}
              cover={track.imageUrl}
              trackUrl={track.trackUrl}
              bpm={track.bpm}
              likedBy={track.likedBy}
            />
          )}
        </PlayerContainer>
        {mobileWidth && (
          <MobileInfoContainer>
            <MobileTitle>{track.presentationTitle}</MobileTitle>
            <MobileMetadata>{track.genre}</MobileMetadata>
            <MobileMetadata>
              {`Similar Artists: ${track.similarArtists.join(', ')}`}
            </MobileMetadata>
            <MobileMetadata>{`Starting from $${track.price}`}</MobileMetadata>
            <PriceButton price={track.price} />
          </MobileInfoContainer>
        )}
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
