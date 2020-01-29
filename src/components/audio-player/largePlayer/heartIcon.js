import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../../context/userContext';
import { AudioContext } from '../../../context/audioContext';

const Icon = styled.svg`
  cursor: pointer;
  &:hover {
    fill: #ffa7a6;
  }
  transition: all 0.2s;
`;

const Path = styled.path`
  &:hover {
    fill: #ffa7a6;
  }
  transition: all 0.2s;
`;

const HeartIcon = props => {
  const userContext = useContext(UserContext);

  const Child = (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 124 108.5"
      onClick={() => props.handleLike()}
    >
      <Path
        id="heart-solid"
        d="M111.952,39.386c-13.272-11.31-33.01-9.276-45.192,3.294L61.99,47.6l-4.771-4.916C45.061,30.11,25.3,28.076,12.027,39.386a34.775,34.775,0,0,0-2.4,50.35l46.863,48.388a7.593,7.593,0,0,0,10.971,0l46.863-48.388a34.754,34.754,0,0,0-2.373-50.35Z"
        transform="translate(0.012 -31.967)"
        fill={props.liked ? 'red' : 'grey'}
      />
    </Icon>
  );

  if (!userContext.user) {
    return <Link to="/login">{Child}</Link>;
  }
  return <div>{Child}</div>;
};
export default HeartIcon;
