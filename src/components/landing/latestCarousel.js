import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import axios from 'axios';
import LargePlayer from '../audio-player/largePlayer/largePlayer';
import MobilePlayer from '../audio-player/mobilePlayer/mobilePlayer';

const Container = styled.div``;

const Heading = styled.h3`
  font-size: 64px;
  margin-bottom: 1em;
  text-align: center;
`;

const MobileTitle = styled.h4`
  font-size: 32px;
  text-align: center;
  color: white;
  font-weight: 500;
`;

const MobileTrackInfo = styled.p`
  font-weight: 500;
  color: white;
`;

const TrackContainer = styled.div`
  background: url(${props => props.backgroundImage});
  background-repeat: no-repeat;
  background-position: 25% 25%;
  background-size: cover;
  position: relative;
  height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const FirstOverlay = styled.div`
  background: ${props => props.theme.color.landingGradient};
  height: 100%;
  width: 100%;
  z-index: 2;
`;

const SecondOverlay = styled.div`
  background: ${props => props.theme.color.darkOverlay};
  height: 100%;
  width: 100%;
  z-index: 3;
`;

const RainbowStrip = styled.div`
  background: ${props => props.theme.color.largeBorderGradient};
  width: 100%;
  height: 5px;
  position: absolute;
`;

const LandingCarousel = () => {
  const [latestTracks, setLatestTracks] = useState([]);

  // Fetches four most recent tracks
  useEffect(() => {
    async function fetchLatest() {
      const res = await axios.get(`/api/music?limit=4`);
      console.log(res.data);
      return setLatestTracks(res.data);
    }
    fetchLatest();
  }, []);

  const createSlides = () => {
    return (
      <Carousel>
        {latestTracks.map(track => {
          return (
            <TrackContainer backgroundImage={track.imageUrl}>
              <FirstOverlay>
                <SecondOverlay>
                  <RainbowStrip />
                  <PlayerContainer>
                    {window.innerWidth < 777 ? (
                      <div>
                        <MobileTitle>{track.presentationTitle}</MobileTitle>
                        <MobileTrackInfo>
                          Similar Artists: {track.similarArtists.join(', ')}
                        </MobileTrackInfo>
                      </div>
                    ) : (
                      <div />
                    )}
                    {window.innerWidth > 777 ? (
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
                </SecondOverlay>
              </FirstOverlay>
            </TrackContainer>
          );
        })}
      </Carousel>
    );
  };
  if (latestTracks.length > 1) {
    return (
      <Container>
        <Heading>Latest Tracks</Heading>
        {createSlides()}
      </Container>
    );
  }
  return <p>Loading...</p>;
};

export default LandingCarousel;
