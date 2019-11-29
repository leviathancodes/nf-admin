import React, { useContext } from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { ReactComponent as VolumeWrapper } from './volumeWrapper.svg';
import { AudioContext } from '../../../context/audioContext';

const VolumeSlider = props => {
  let { display } = props;

  const Wrapper = styled.div`
    clip-path: polygon(
      20% 10%,
      80% 10%,
      80% 85%,
      60% 85%,
      50% 100%,
      40% 85%,
      20% 85%
    );
    overflow: hidden;
    display: ${display};
    justify-content: center;
    align-items: center;
    background-color: #d3d3d3;
    width: 80px;
    height: 240px;
    position: absolute;
    transform: translate(-25px, -200px);
    &:hover,
    &:focus,
    &:focus-within { 
      opacity: 1; 
    }
  `;

  const Volume = styled(Slider)`
    height: 60%;
    &:hover,
    &:focus,
    &:focus-within { 
      opacity: 1; 
    }
  `;
  const context = useContext(AudioContext);

  return (
    <Wrapper>
      <Volume
        vertical
        railStyle={{
          backgroundColor: '#707070',
          padding: 0,
          overflow: 'none',
        }}
        trackStyle={{
          backgroundColor: '#FA2E6A',
          padding: 0,
          overflow: 'none',
        }}
        handleStyle={{
          backgroundColor: '#F15377',
          borderColor: '#F15377',
          cursor: 'pointer',
          overflow: 'none'
        }}
        value={context.volume * 100}
        onChange={e => context.setVolume(e / 100)}
        min={0}
        max={100}
      />
    </Wrapper>
  );
};

export default VolumeSlider;
