import React, { useState, useContext, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import axios from 'axios';
import LargePlayer from '../audio-player/largePlayer/largePlayer';
import MobilePlayer from '../audio-player/mobilePlayer/mobilePlayer';

const Container = styled.div``;

const CarouselComponent = styled(Carousel)``;

const PreviousArrow = styled.img`
  width: 2em;
  margin: 1em 0 0 1.25em;
  cursor: pointer;
`;

const NextArrow = styled.img`
  width: 2em;
  margin: 1em 1.25em 0 0;
  cursor: pointer;
`;

const Heading = styled.h3`
  font-size: 32px;
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

const MobileInfoContainer = styled.div``;

const LandingCarousel = () => {
  const [latestTracks, setLatestTracks] = useState([]);

  const biggerThanMobileWidth = useMediaQuery({ query: '(min-width: 1028px)' });
  const mobileWidth = useMediaQuery({ query: '(max-width: 1028px)' });

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
      <CarouselComponent
        defaultControlsConfig={{
          nextButtonText: 'Next',
          nextButtonClassName: 'carouselNext',
          prevButtonClassName: 'carouselPrev',
          prevButtonText: 'Prev',
          pagingDotsClassName: 'paginationDot',
          pagingDotsStyle: {
            fill: 'white',
            margin: '0.5em'
          }
        }}
        autoGenerateStyleTag={false}
        renderCenterLeftControls={({ previousSlide }) => (
          <PreviousArrow
            onClick={previousSlide}
            alt="Previous Arrow"
            src="https://nf-music-test.s3.amazonaws.com/icon_assets/previousArrow.svg"
          />
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <NextArrow
            onClick={nextSlide}
            alt="Next Arrow"
            src="https://nf-music-test.s3.amazonaws.com/icon_assets/nextArrow.svg"
          />
        )}
      >
        {latestTracks.map(track => {
          return (
            <TrackContainer backgroundImage={track.imageUrl}>
              <FirstOverlay>
                <SecondOverlay>
                  <RainbowStrip />
                  <PlayerContainer>
                    {mobileWidth && (
                      <MobileInfoContainer>
                        <MobileTitle>{track.presentationTitle}</MobileTitle>
                        <MobileTrackInfo>
                          Similar Artists: {track.similarArtists.join(', ')}
                        </MobileTrackInfo>
                      </MobileInfoContainer>
                    )}
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
                </SecondOverlay>
              </FirstOverlay>
            </TrackContainer>
          );
        })}
      </CarouselComponent>
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

LandingCarousel.propTypes = {
  nextButtonClassName: PropTypes.string,
  nextButtonStyle: PropTypes.object,
  nextButtonText: PropTypes.string,
  prevButtonClassName: PropTypes.string,
  prevButtonStyle: PropTypes.object,
  prevButtonText: PropTypes.string,
  pagingDotsContainerClassName: PropTypes.string,
  pagingDotsClassName: PropTypes.string,
  pagingDotsStyle: PropTypes.object
};

export default LandingCarousel;
