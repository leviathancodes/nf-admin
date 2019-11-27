/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { AudioContext } from '../../../context/audioContext';
import { ReactComponent as LargePlayIcon } from './playerPlayIcon.svg';
import { ReactComponent as LargePauseIcon } from './playerPauseIcon.svg';
import { ReactComponent as VolumeIcon } from './volumeIcon.svg';
import HeartIcon from './heartIcon';

const LargePlayer = props => {
  const [track, setTrack] = useState('');
  const [progress, setProgress] = useState('');
  const [clicked, setClicked] = useState('#D3D3D3');

  const context = useContext(AudioContext);

  const secondsToMinutes = seconds =>
    `${Math.floor(seconds / 60)}:${`0${Math.floor(seconds % 60)}`.slice(-2)}`;

  const Heading = styled.h3`
    font-size: 3em;
    color: #fa2e6a;
    font-family: futura-pt, sans-serif;
    font-weight: 500;
    font-style: normal;
  `;

  const Paragraph = styled.p`
    color: #1d1d1d;
    padding-top: 2.5px;
  `;

  const PriceText = styled.span`
    color: #7799fc;
    font-weight: 500;
  `;

  const Container = styled.div`
    display: grid;
    width: 1000px;
    height: 250px;
    grid-template-columns: 20% 55% 25%;
    box-shadow: 0 4px 6px 0 #0000004b;
    margin-bottom: 25px;
    border: 1px solid black;
  `;

  const CoverContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    background: -moz-linear-gradient(
      -45deg,
      #fa2e6a 0%,
      #ffa7a6 32%,
      #7799fc 69%,
      #d7e4f0 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      -45deg,
      #fa2e6a 0%,
      #ffa7a6 32%,
      #7799fc 69%,
      #d7e4f0 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
      135deg,
      #fa2e6a 0%,
      #ffa7a6 32%,
      #7799fc 69%,
      #d7e4f0 100%
    );
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
    background-image: url(${props.cover});
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
    border: 1px solid black;

    background: #fa2e6a; /* Old browsers */
    background: -moz-linear-gradient(
      -45deg,
      #fa2e6a 0%,
      #f15377 33%,
      #ffa7a6 65%,
      #ffdbdb 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      -45deg,
      #fa2e6a 0%,
      #f15377 33%,
      #ffa7a6 65%,
      #ffdbdb 100%
    ); /* Chrome10-25,Safari5.1-6 */
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      background: grey;
    }
  `;

  // useEffect(() => {
  //   async function grabTrack() {
  //     if (!track) {
  //       const audio = new Audio(props.trackUrl);
  //       audio.oncanplaythrough = () => {
  //         setTrack(audio);
  //         console.log('trak set');
  //       };
  //     }
  //   }
  //   grabTrack();
  // }, [track]);

  return (
    <Container>
      <LargePlayContainer>
        <LargePlayCircle
          className="play"
          onClick={e => {
            if (!context.currentTrack) {
              return context.handlePlaying(props.trackTitle, props.trackUrl);
            }
            if (context.playing && context.currentTrack !== props.trackTitle) {
              context.handleStopping();
              return context.handlePausing(props.trackTitle, props.trackUrl);
            }

            if (context.playing) {
              console.log('pause track');
              return context.handlePausing(props.trackTitle, props.trackUrl);
            }
            if (context.currentTrack !== props.trackTitle) {
              console.log('play different track');
              context.handleStopping();
              console.log(`the track that will play is ${props.trackTitle}`);
              return context.handlePlaying(props.trackTitle, props.trackUrl);
            }
            return context.handlePlaying(props.trackTitle, props.trackUrl);
          }}
        >
          {context.currentTrack === props.trackTitle ? (
            <LargePauseIcon />
          ) : (
            <LargePlayIcon />
          )}
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
              trackStyle={{ backgroundColor: '#FA2E6A', padding: 0 }}
              handleStyle={{
                backgroundColor: '#F15377',
                borderColor: '#F15377',
                cursor: 'pointer'
              }}
              value={context.progress}
              max={Math.round(props.duration)}
              onChange={e => context.handleSeeking(e)}
            />
          </ProgressContainer>
          <VolumeIcon />
        </VolumeProgressContainer>
        <TimeContainer>
          <Paragraph>{secondsToMinutes(context.progress)}</Paragraph>
          <Paragraph className="duration">
            {secondsToMinutes(props.duration)}
          </Paragraph>
        </TimeContainer>
        <SocialContainer>
          <HeartIcon hover="#ffa7a6" clicked={clicked} />
        </SocialContainer>
      </div>
      <Cover>
        <CoverContainer className="trackCover">
          <Image className={`${props.title}-cover`} />
        </CoverContainer>
      </Cover>
    </Container>
  );
};

export default LargePlayer;
