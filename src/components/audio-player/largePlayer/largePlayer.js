/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import { AudioContext } from '../../../context/audioContext';
import VolumeSlider from '../volumeSlider';
import { ReactComponent as LargePlayIcon } from './playerPlayIcon.svg';
import { ReactComponent as LargePauseIcon } from './playerPauseIcon.svg';
import { ReactComponent as VolumeIcon } from './volumeIcon.svg';
import HeartIcon from './heartIcon';
import PriceButton from '../../../elements/buttons/priceButton';

const Heading = styled.h3`
  font-size: 3em;
  color: ${props => props.theme.color.primaryPink};
  font-family: futura-pt, sans-serif;
  font-weight: 500;
  font-style: normal;
`;

const Paragraph = styled.p`
  color: ${props => props.theme.color.black};
  padding-top: 2.5px;
`;

const PriceText = styled.span`
  color: ${props => props.theme.color.primaryBlue};
  font-weight: 500;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 1000px;
  height: auto;
  box-shadow: 0 4px 6px 0 #0000004b;
  margin-bottom: 25px;
  background-color: white;
  border-radius: 5px;
`;

const CoverContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background: ${props => props.theme.color.largeBorderGradient};
  margin: 1em;
`;

const PriceButtonContainer = styled.div`
  margin: 1em 0 1em 0;
`;

const PlayerContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
`;

const LargePlayContainer = styled.div`
  display: flex;
  flex-grow: 2;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const VolumeProgressContainer = styled.div`
  display: flex;
`;

const ProgressContainer = styled.div`
  width: 75%;
  padding-right: 1em;
  display: flex;
  flex-direction: column;
`;

const TrackDataContainer = styled.div`
  flex-grow: 3;
  flex-direction: column;
  display: flex;
`;

const TimeContainer = styled.div`
  width: 75%;
  display: flex;
  justify-content: space-between;
  margin: 0.25em 0 0.25em 0;
`;

const SocialContainer = styled.div`
  width: 25%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin-bottom: 0.5em;
`;

const Image = styled.div`
  width: 95%;
  height: 95%;
  overflow: none;
  background-image: url(${props => props.cover})};
  background-size: cover;
  background-position: 50% 50%;
  display: block;
`;

const Cover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BPMIcon = styled.div`
  background: ${props => props.theme.color.secondaryGrey};
  padding: 0.25em;
  color: white;
  border-radius: 2px;
  margin-right: 0.25em;
`;

const LargePlayCircle = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: ${props => props.theme.color.playGradient}
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.color.black};
    transition: all 0.5s ease-out;

  }
`;

const LargePlayer = props => {
  const [displayVolume, setDisplayVolume] = useState('none');

  const context = useContext(AudioContext);

  const secondsToMinutes = seconds =>
    `${Math.floor(seconds / 60)}:${`0${Math.floor(seconds % 60)}`.slice(-2)}`;

  const playOrPauseIcon = () => {
    if (context.currentTrack === props.trackTitle && context.playing) {
      return <LargePauseIcon />;
    }
    if (context.currentTrack === props.trackTitle && !context.playing) {
      return <LargePlayIcon />;
    }
    return <LargePlayIcon />;
  };

  const handleDisplayVolume = e => {
    console.log(e.type);
    if (e.type === 'mouseenter') {
      setDisplayVolume('flex');
    }
    if (e.type === 'mouseleave') {
      setTimeout(() => {
        console.log('lost focus');
        setDisplayVolume('none');
      }, 3000);
    }
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
      <PlayerContainer>
        <LargePlayContainer>
          <LargePlayCircle className="play" onClick={handlePlaying}>
            {playOrPauseIcon()}
          </LargePlayCircle>
        </LargePlayContainer>
        <TrackDataContainer className="trackData">
          <Heading>{props.trackTitle}</Heading>
          <Paragraph>
            {props.genre} | {props.similarArtists}
          </Paragraph>
          <Paragraph>
            Starting from <PriceText>${props.price}</PriceText>
          </Paragraph>
          <PriceButtonContainer>
            <PriceButton price={props.price} />
          </PriceButtonContainer>
          <VolumeProgressContainer>
            <ProgressContainer>
              <Slider
                railStyle={{ backgroundColor: '#707070', padding: 0 }}
                trackStyle={{ backgroundColor: '#FFA7A6', padding: 0 }}
                handleStyle={{
                  backgroundColor: '#F15377',
                  borderColor: '#F15377',
                  cursor: 'grab'
                }}
                value={
                  context.currentTrack === props.trackTitle
                    ? context.progress
                    : 0
                }
                max={Math.round(props.duration)}
                onChange={e => {
                  if (context.currentTrack === props.trackTitle)
                    context.handleSeeking(e);
                }}
                defaultValue={0}
              />{' '}
            </ProgressContainer>
          </VolumeProgressContainer>
          <TimeContainer>
            <Paragraph>
              {context.currentTrack === props.trackTitle
                ? secondsToMinutes(context.progress)
                : '0:00'}
            </Paragraph>
            <Paragraph className="duration">
              {secondsToMinutes(props.duration)}
            </Paragraph>
          </TimeContainer>
          <SocialContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '0.5em'
              }}
            >
              {' '}
              <HeartIcon style={{ marginRight: '1em' }} />
              {props.likedBy.length}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '1em'
              }}
            >
              <BPMIcon>BPM</BPMIcon>
              {props.bpm}
            </div>
          </SocialContainer>
        </TrackDataContainer>
      </PlayerContainer>
      <Cover>
        <CoverContainer className="trackCover">
          <Image cover={props.cover} lassName={`${props.title}-cover`} />
        </CoverContainer>
      </Cover>
    </Container>
  );
};

export default LargePlayer;
