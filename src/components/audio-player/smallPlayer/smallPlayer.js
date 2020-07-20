import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import { AudioContext } from '../../../context/audioContext';
import { UserContext } from '../../../context/userContext';
import { ShoppingCartContext } from '../../../context/shoppingCartContext';
import {
  SmallPlayIcon,
  ThumbnailBorder,
  ThumbnailImage,
  ThumbnailContainer
} from '../base';
import HeartIcon from '../largePlayer/heartIcon';
import PriceButton from '../../../elements/buttons/priceButton';
import MoodTag from '../../../elements/moodTag/moodTag';

const Container = styled.div`
  width: 100%;
  padding: 1em;
  border: ${props => props.theme.color.smallBorderGradient};
  display: flex;
  align-items: center;
  transition: all 0.1s ease-in;
  &:hover {
    background-color: #ededed;
  }
  cursor: pointer;
  overflow: none;

  @media (max-width: 956px) {
    padding: 0.5em;
  }
`;

const PriceContainer = styled(ThumbnailContainer)`
  margin-left: auto;
  padding-right: 16px;
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

const Heart = styled.div`
  margin-right: 2em;
`;

const SmallPlayer = ({
  trackTitle,
  id,
  moods,
  cover,
  genre,
  similarArtists,
  price,
  trackUrl,
  duration,
  route
}) => {
  const context = useContext(AudioContext);
  const { user } = useContext(UserContext);
  const [active, setActive] = useState(false);
  const [liked, setLiked] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { addItemToCart, removeItemFromCart } = useContext(ShoppingCartContext);

  const biggerThanMobileWidth = useMediaQuery({ query: '(min-width: 956px)' });

  useEffect(() => {
    if (context.currentTrack === trackTitle) {
      return setActive(true);
    }
    setActive(false);
  }, [context, trackTitle]);

  useEffect(() => {
    if (user) {
      if (user.likedTracks && user.likedTracks.includes(id)) {
        return setLiked(true);
      }
    }
  }, [id, user]);

  const tags = () => {
    return (
      <MoodContainer>
        {moods.map(mood => {
          return <MoodTag key={mood} mood={mood} />;
        })}
      </MoodContainer>
    );
  };

  const handlePlaying = () => {
    if (!context.currentTrack) {
      return context.handlePlaying(trackTitle, trackUrl, duration);
    }
    if (context.playing && context.currentTrack !== trackTitle) {
      context.handleStopping();
      return context.handlePlaying(trackTitle, trackUrl, duration);
    }

    if (context.playing) {
      return context.handlePausing(trackTitle, trackUrl);
    }
    if (context.currentTrack !== trackTitle) {
      context.handleStopping();
      return context.handlePlaying(trackTitle, trackUrl, duration);
    }
    return context.handlePlaying(trackTitle, trackUrl, duration);
  };

  const handleLike = async () => {
    if (user) {
      const res = await context.handleLiking(id);
      console.log(res);
      return res[1] === 'remove' ? setLiked(false) : setLiked(true);
    }
  };

  const handleRedirect = e => {
    if (e.target.id === 'smallPlayerContainer') {
      setRedirect(true);
    }
  };
  if (redirect) {
    return <Redirect to={`/music/${route}`} />;
  }
  return (
    <Container onClick={handleRedirect} id="smallPlayerContainer">
      <ThumbnailContainer onClick={handlePlaying}>
        <ThumbnailBorder
          height={biggerThanMobileWidth ? '100px' : '75px'}
          width={biggerThanMobileWidth ? '100px' : '75px'}
        >
          <ThumbnailImage id="trackThumbnail" active={active} imageUrl={cover}>
            <SmallPlayIcon
              active={active}
              className="playIcon"
              id={
                context.playing && trackTitle === context.currentTrack
                  ? 'pause'
                  : 'play'
              }
              icon={
                context.playing && trackTitle === context.currentTrack
                  ? faPause
                  : faPlay
              }
            />
          </ThumbnailImage>
        </ThumbnailBorder>
      </ThumbnailContainer>
      <TrackInfo>
        <Title>{trackTitle}</Title>
        <TrackDetail>{genre}</TrackDetail>
        {biggerThanMobileWidth && (
          <TrackDetail>Similar Artists: {similarArtists}</TrackDetail>
        )}
      </TrackInfo>
      {biggerThanMobileWidth && tags()}
      <PriceContainer>
        {biggerThanMobileWidth && (
          <Heart>
            <HeartIcon id={id} liked={liked} handleLike={handleLike} />
          </Heart>
        )}
        <PriceButton price={price} id={id} />
      </PriceContainer>
    </Container>
  );
};

export default SmallPlayer;
