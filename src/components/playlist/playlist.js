import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { AudioContext } from '../../context/audioContext';
import {
  SmallPlayIcon,
  ThumbnailBorder,
  ThumbnailImage,
  ThumbnailContainer,
  TrackInfo
} from '../audio-player/base';

const Title = styled.h1`
  font-size: 4em;
  margin: 0.5em;
  color: white;
  font-weight: 500;
  position: fixed;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${props => (props.open ? '700px' : '0')};
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: ${props => props.theme.color.darkGrey};
  transition: 1s;
  transition-property: all;
  z-index: 1000;
  overflow: scroll;
`;

const CloseButton = styled(FontAwesomeIcon)`
  color: ${props => (props.open ? props.theme.color.primaryPink : 'none')};
  font-size: 4em;
  cursor: pointer;
  margin: 0.25em;
  margin-left: auto;
  margin-bottom: 1em;
  transform: ${props => (props.open ? 'rotateZ(360deg)' : 'none')};
  transition: 0.5s;
`;

const Paragraph = styled.p`
  font-size: 1em;
  color: white;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 12.5em;
`;

const TrackContainer = styled.div`
  height: auto;
  background-color: ${props => props.theme.color.playlistTrack};
  border: ${props => props.theme.color.smallBorderGradient};
  width: 700px
  display: flex;
  box-shadow: 0 4px 6px 0 black;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: #626262;
  }
`;

const TrackDetail = styled.p`
  color: #d3d3d3;
  font-weight: 500;
  transition: all 0.3s ease-in;
  padding: 0;
`;

const TrackTitle = styled.h1`
  font-weight: 500;
  color: white;
  font-size: 24px;
  font-style: ${props => props.theme.font.style};
`;

const Playlist = props => {
  const context = useContext(AudioContext);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (context.currentTrack === props.trackTitle) {
      return setActive(true);
    }
    return setActive(false);
  }, [context.currentTrack, props.trackTitle]);

  const createTracks = () => {
    if (context.playlist.length > 1) {
      return context.playlist.map(track => {
        return (
          <TrackContainer open={context.playlistActive}>
            <ThumbnailContainer
              onClick={() =>
                context.playing
                  ? context.handlePausing()
                  : context.handlePlaying(
                      track.presentationTitle,
                      track.trackUrl,
                      track.duration
                    )
              }
            >
              <ThumbnailBorder height="75px" width="75px">
                <ThumbnailImage active={active} imageUrl={track.imageUrl}>
                  <SmallPlayIcon
                    active={active}
                    className="playIcon"
                    icon={
                      context.playing &&
                      track.presentationTitle === context.currentTrack
                        ? faPause
                        : faPlay
                    }
                  />
                </ThumbnailImage>
              </ThumbnailBorder>
              <TrackInfo>
                <TrackTitle>{track.presentationTitle}</TrackTitle>
                <TrackDetail>{track.genre}</TrackDetail>
                <TrackDetail>
                  Similar Artists: {track.similarArtists.join(', ')}
                </TrackDetail>
              </TrackInfo>
            </ThumbnailContainer>
          </TrackContainer>
        );
      });
    }
  };

  return (
    <Container open={context.playlistActive}>
      <CloseButtonContainer>
        <Title>Up Next</Title>
        <CloseButton
          icon={faTimes}
          onClick={() => context.setPlaylistActive(false)}
          open={context.playlistActive}
        />
      </CloseButtonContainer>
      {createTracks()}
    </Container>
  );
};

export default Playlist;
