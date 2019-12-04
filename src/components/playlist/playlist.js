import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AudioContext } from '../../context/audioContext';

const Container = styled.div`
  height: 100%;
  width: ${props => (props.open ? '500px' : '0')};
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: ${props => props.theme.color.darkGrey};
  transition: 0.5s;
  z-index: 1000;
`;

const CloseButton = styled(FontAwesomeIcon)`
  color: ${props => (props.open ? props.theme.color.primaryPink : 'none')};
  font-size: 4em;
  cursor: pointer;
  margin: 1em;
  margin-left: auto;
  transform: ${props => (props.open ? 'rotateZ(360deg)' : 'none')};
  transition: 0.5s;

  &:hover {
    color: ${props => props.theme.color.pastelPink};
  }
`;

const Paragraph = styled.p`
font-size: 5em;
  color: white;
`

const CloseButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
`;

const Playlist = props => {
  const context = useContext(AudioContext);

  const createTracks = () => {
    if (context.playlist.length > 1) {
      return context.playlist.map(track => {
        return <Paragraph>{track.presentationTitle}</Paragraph>;
      });
    }
  };

  return (
    <Container open={context.playlistActive}>
      <CloseButtonContainer>
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
