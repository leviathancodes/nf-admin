import React, { useContext } from 'react';
import styled from 'styled-components';
import { AudioContext } from '../../../context/audioContext';
import { ReactComponent as LargePlayIcon } from '../largePlayer/playerPlayIcon.svg';
import { ReactComponent as LargePauseIcon } from '../largePlayer/playerPauseIcon.svg';

const CoverContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background: ${props => props.theme.color.largeBorderGradient};
  margin: 1em;
`;

const Cover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const LargePlayContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1em;
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

const MobilePlayer = props => {
  const context = useContext(AudioContext);

  const playOrPauseIcon = () => {
    if (context.currentTrack === props.trackTitle && context.playing) {
      return <LargePauseIcon />;
    }
    if (context.currentTrack === props.trackTitle && !context.playing) {
      return <LargePlayIcon />;
    }
    return <LargePlayIcon />;
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
    <div>
      <Cover>
        <CoverContainer className="trackCover">
          <Image cover={props.cover}>
            <LargePlayContainer>
              <LargePlayCircle className="play" onClick={handlePlaying}>
                {playOrPauseIcon()}
              </LargePlayCircle>
            </LargePlayContainer>
          </Image>
        </CoverContainer>
      </Cover>
    </div>
  );
};

export default MobilePlayer;
