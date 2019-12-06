import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { AudioContext } from '../../../context/audioContext';
import {
  SmallPlayIcon,
  ThumbnailBorder,
  ThumbnailImage,
  ThumbnailContainer
} from '../base';
import PriceButton from '../../../elements/buttons/priceButton';
import MoodTag from '../../../elements/moodTag/moodTag';

const Container = styled.div`
  width: 100%;
  height: 125px;
  border: ${props => props.theme.color.smallBorderGradient};
  display: flex;
  transition: all 0.1s ease-in;
  &:hover {
    background-color: #ededed;
  }
`;

const PriceContainer = styled(ThumbnailContainer)`
  margin-left: auto;
  padding-right: 16px;
`;

const Title = styled.h1`
  font-weight: 600;
  color: ${props => props.theme.color.black};
  font-size: 24px;
  font-style: ${props => props.theme.font.style};
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 10px;
  transition: all 0.3s ease-in;
`;

const TrackDetail = styled.p`
  font-color: ${props => props.theme.color.secondaryGrey};
  font-weight: 500;
  transition: all 0.3s ease-in;
`;

const MoodContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1em;
`;

const SmallPlayer = props => {
  const context = useContext(AudioContext);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (context.currentTrack === props.trackTitle) {
      return setActive(true);
    }
    setActive(false);
  }, [context.currentTrack, props.trackTitle]);

  const tags = () => {
    return (
      <MoodContainer>
        {props.moods.map(mood => {
          return <MoodTag mood={mood} />;
        })}
      </MoodContainer>
    );
  };

  const handlePlaying = () => {
    if (!context.currentTrack) {
      return context.handlePlaying(
        props.trackTitle,
        props.trackUrl,
        props.duration
      );
    }
    if (context.playing && context.currentTrack !== props.trackTitle) {
      context.handleStopping();
      return context.handlePlaying(
        props.trackTitle,
        props.trackUrl,
        props.duration
      );
    }

    if (context.playing) {
      return context.handlePausing(props.trackTitle, props.trackUrl);
    }
    if (context.currentTrack !== props.trackTitle) {
      context.handleStopping();
      return context.handlePlaying(
        props.trackTitle,
        props.trackUrl,
        props.duration
      );
    }
    return context.handlePlaying(
      props.trackTitle,
      props.trackUrl,
      props.duration
    );
  };

  return (
    <Container>
      <ThumbnailContainer onClick={handlePlaying}>
        <ThumbnailBorder height="100px" width="100px">
          <ThumbnailImage active={active} imageUrl={props.cover}>
            <SmallPlayIcon
              active={active}
              className="playIcon"
              icon={
                context.playing && props.trackTitle === context.currentTrack
                  ? faPause
                  : faPlay
              }
            />
          </ThumbnailImage>
        </ThumbnailBorder>
      </ThumbnailContainer>
      <TrackInfo>
        <Title>{props.trackTitle}</Title>
        <TrackDetail>{props.genre}</TrackDetail>
        <TrackDetail>Similar Artists: {props.similarArtists}</TrackDetail>
      </TrackInfo>
      {tags()}
      <PriceContainer>
        <PriceButton price={props.price} />
      </PriceContainer>
    </Container>
  );
};

export default SmallPlayer;
