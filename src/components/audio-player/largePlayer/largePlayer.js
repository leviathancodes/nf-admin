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
  display: grid;
  width: 1000px;
  height: 250px;
  grid-template-columns: 20% 55% 25%;
  box-shadow: 0 4px 6px 0 #0000004b;
  margin-bottom: 25px;
`;

const CoverContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background: ${props => props.theme.color.largeBorderGradient};
`;

const LargePlayContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const VolumeProgressContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProgressContainer = styled.div`
  width: 75%;
  padding-right: 1em;
  display: flex;
  flex-direction: column;
`;

const VolumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
`;

const TimeContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
`;

const SocialContainer = styled.div`
  display: flex;
  padding-top: 1.5em;
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
  const [clicked, setClicked] = useState('#D3D3D3');
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
      <LargePlayContainer>
        <LargePlayCircle className="play" onClick={handlePlaying}>
          {playOrPauseIcon()}
        </LargePlayCircle>
      </LargePlayContainer>
      <div className="trackData">
        <Heading>{props.trackTitle}</Heading>
        <Paragraph>
          {props.genre} | {props.similarArtists} Type Beat
        </Paragraph>
        <Paragraph>
          Starting from <PriceText>${props.price}</PriceText>
        </Paragraph>
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
                context.currentTrack === props.trackTitle ? context.progress : 0
              }
              max={Math.round(props.duration)}
              onChange={e => {
                if (context.currentTrack === props.trackTitle)
                  context.handleSeeking(e);
              }}
              defaultValue={0}
            />{' '}
          </ProgressContainer>

          <VolumeContainer
            className="volume-container"
            onMouseEnter={handleDisplayVolume}
            onMouseLeave={handleDisplayVolume}
          >
            <VolumeSlider
              display={displayVolume}
              onMouseLeave={handleDisplayVolume}
            />
            <VolumeIcon />
          </VolumeContainer>
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
          <HeartIcon />
        </SocialContainer>
      </div>
      <Cover>
        <CoverContainer className="trackCover">
          <Image cover={props.cover} lassName={`${props.title}-cover`} />
        </CoverContainer>
      </Cover>
    </Container>
  );
};

export default LargePlayer;
