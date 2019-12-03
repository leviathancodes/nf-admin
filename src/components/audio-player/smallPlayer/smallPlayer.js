import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { AudioContext } from '../../../context/audioContext';
import PriceButton from '../../../elements/buttons/priceButton';
import MoodTag from '../../../elements/moodTag/moodTag';

const Container = styled.div`
  width: 100%;
  height: 125px;
  border: 1px solid rgba(112, 112, 112, 0.17);
  display: flex;
  transition: all 0.1s ease-in;
  &:hover {
    background-color: #ededed;
  }
`;

const Border = styled.div`
  background: ${props => props.theme.color.largeBorderGradient};
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 1em;
`;

const Cover = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const PriceContainer = styled(Cover)`
  margin-left: auto;
  padding-right: 16px;
`;

const PlayIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 36px;
  display: ${props => (props.active ? 'flex' : 'none')};
`;

const Image = styled.div`
  width: 95%;
  height: 95%;
  overflow: none;
  background-image: url(${props => props.imageUrl})};
  box-shadow: ${props => (props.active ? props.theme.color.darkHover : 'none')};
  background-size: cover;
  background-position: 50% 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  transition: all 0.3s ease-in;

  &:hover {
    box-shadow: ${props => props.theme.color.darkHover};
  }

  &:hover ${PlayIcon} {
    display: flex;
  }

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
      <Cover onClick={handlePlaying}>
        <Border>
          <Image active={active} imageUrl={props.cover}>
            <PlayIcon
              active={active}
              className="playIcon"
              icon={
                context.playing && props.trackTitle === context.currentTrack
                  ? faPause
                  : faPlay
              }
            />
          </Image>
        </Border>
      </Cover>
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
