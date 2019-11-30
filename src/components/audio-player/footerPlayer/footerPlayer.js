import React, { useContext } from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { AudioContext } from '../../../context/audioContext';

const greyMain = '#818181';

const Nav = styled.nav`
  box-shadow: 0 -4px 5px 0 #0000004b;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
`;
const SVGStyles = styled.svg`
  margin-left: 40px;
  margin-right: 40px;
  cursor: pointer;
`;

const Shuffle = styled(FontAwesomeIcon)`
  font-size: 2em;
  margin-left: 40px;
  color: ${greyMain};
`;

const secondsToMinutes = seconds =>
  `${Math.floor(seconds / 60)}:${`0${Math.floor(seconds % 60)}`.slice(-2)}`;

const FooterPlayer = () => {
  const context = useContext(AudioContext);

  const playIcon = (height, width, fill) => {
    return (
      <SVGStyles
        onClick={e => context.handlePlaying()}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 29.267 33.84"
      >
        <path
          id="Path_69"
          data-name="Path 69"
          d="M16.92,0,33.84,29.267H0L8.772,14.094l1.833-3.171L12.613,7.45Z"
          transform="translate(29.267) rotate(90)"
          fill={fill}
        />
      </SVGStyles>
    );
  };

  const pauseIcon = (height, width) => {
    return (
      <SVGStyles
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 29 34"
        onClick={e => context.handlePausing()}
      >
        <g id="Group_78" data-name="Group 78" transform="translate(-562 -310)">
          <rect
            id="Rectangle_89"
            data-name="Rectangle 89"
            width="8"
            height="34"
            transform="translate(562 310)"
            fill="#8c8c8c"
          />
          <rect
            id="Rectangle_90"
            data-name="Rectangle 90"
            width="8"
            height="34"
            transform="translate(586 310)"
            fill="#8c8c8c"
          />
        </g>
      </SVGStyles>
    );
  };

  const prevTrackIcon = (triangleFill, rectangleFill) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32.635"
        height="33.84"
        viewBox="0 0 32.635 33.84"
      >
        <g
          id="Group_79"
          data-name="Group 79"
          transform="translate(-102.5 -1018.5)"
        >
          <g id="Group_74" data-name="Group 74">
            <g id="Group_73" data-name="Group 73">
              <path
                id="Path_69"
                fill={triangleFill}
                data-name="Path 69"
                d="M16.92,29.267,33.84,0,16.92,6.939,0,0,8.772,15.174l1.833,3.171,2.008,3.473Z"
                transform="translate(135.135 1018.5) rotate(90)"
              />
              <rect
                id="Rectangle_16"
                fill={rectangleFill}
                data-name="Rectangle 16"
                width="3.784"
                height="33.053"
                transform="translate(102.5 1018.973)"
              />
            </g>
          </g>
        </g>
      </svg>
    );
  };

  const nextTrackIcon = (rectangleFill, triangleFill) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32.368"
        height="34.5"
        viewBox="0 0 32.368 34.5"
      >
        <g
          id="Group_75"
          data-name="Group 75"
          transform="translate(-285.632 -1017.5)"
        >
          <path
            id="Path_69"
            fill={triangleFill}
            data-name="Path 69"
            d="M16.92,0,33.84,29.267,16.92,22.328,0,29.267,8.772,14.094l1.833-3.171L12.613,7.45Z"
            transform="translate(314.899 1017.5) rotate(90)"
          />
          <rect
            id="Rectangle_16"
            fill={rectangleFill}
            data-name="Rectangle 16"
            width="4"
            height="34"
            transform="translate(314 1018)"
          />
        </g>
      </svg>
    );
  };

  const volumeIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 63.997 53.762"
      >
        <g
          id="Group_81"
          data-name="Group 81"
          transform="translate(-1787 -1007.735)"
        >
          <path
            id="Path_71"
            data-name="Path 71"
            fill="#d3d3d3"
            d="M0,0H4.868S9.6,7.027,9.6,14.542,4.868,30.061,4.868,30.061H0s4.868-8,4.868-15.519S0,0,0,0Z"
            transform="translate(1822.931 1019.65)"
          />
          <path
            id="Path_72"
            data-name="Path 72"
            fill="#aaa8a8"
            d="M0,0H4.868s7.2,9.9,7.2,20.486-7.2,21.862-7.2,21.862H0S7.354,31.073,7.354,20.486,0,0,0,0Z"
            transform="translate(1829.548 1013.442)"
          />
          <path
            id="Path_73"
            data-name="Path 73"
            fill="#818181"
            d="M0,0H4.868S15.66,12.567,15.66,26.008,4.868,53.762,4.868,53.762H0S11,39.448,11,26.008,0,0,0,0Z"
            transform="translate(1835.337 1007.735)"
          />
          <path
            id="Path_74"
            data-name="Path 74"
            fill="#818181"
            d="M7.6,0H27.3a10.616,10.616,0,0,0-3.619,11.24c1.79,7.5,10.779,18.777,10.779,18.777H0S8.88,18.745,10.779,11.24,7.6,0,7.6,0Z"
            transform="translate(1787 1051.684) rotate(-90)"
          />
        </g>
      </svg>
    );
  };

  return (
    <Nav
      className="navbar is-fixed-bottom is-spaced"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-menu">
        <div
          className="navbar-start"
          style={{ 'flex-grow': '1', 'justify-content': 'center' }}
        >
          <div class="navbar-item">
            {prevTrackIcon('#818181', '#d3d3d3')}
            {context.playing
              ? pauseIcon('29', '34')
              : playIcon('30', '34', '#818181')}
            {nextTrackIcon('#d3d3d3', '#818181')}
            <Shuffle icon={faRandom} />
          </div>
          <div className="navbar-item">
            <p>{secondsToMinutes(context.progress)}</p>
          </div>
          <div className="navbar-item">
            <Slider
              railStyle={{
                backgroundColor: '#707070',
                width: '50vw',
                position: 'relative',
                cursor: 'pointer'
              }}
              trackStyle={{
                backgroundColor: '#FA2E6A',
                width: '50vw',
                position: 'absolute',
                top: 5,
                cursor: 'pointer'
              }}
              handleStyle={{
                backgroundColor: '#F15377',
                borderColor: '#F15377',
                cursor: 'grab',
                top: 5
              }}
              value={context.progress}
              max={Math.round(context.duration)}
              onChange={e => {
                context.handleSeeking(e);
              }}
            />
          </div>
          <div className="navbar-item">
            <p>{secondsToMinutes(context.duration)}</p>
          </div>
          <div className="navbar-item">{volumeIcon()}</div>
        </div>
      </div>
    </Nav>
  );
};

export default FooterPlayer;
