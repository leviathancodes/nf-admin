import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
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
  height: 125px;
  border: ${props => props.theme.color.smallBorderGradient};
  display: flex;
  transition: all 0.1s ease-in;
  &:hover {
    background-color: #ededed;
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

const SmallPlayer = props => {
  const context = useContext(AudioContext);
  const { user } = useContext(UserContext);
  const [active, setActive] = useState(false);
  const [liked, setLiked] = useState(false);

  const { addItemToCart, removeItemFromCart } = useContext(ShoppingCartContext);

  useEffect(() => {
    if (context.currentTrack === props.trackTitle) {
      return setActive(true);
    }
    setActive(false);
  }, [context, props.trackTitle]);

  useEffect(() => {
    if (user) {
      if (user.likedTracks.includes(props.id)) {
        return setLiked(true);
      }
    }
  }, [props.id, user]);

  const tags = () => {
    return (
      <MoodContainer>
        {props.moods.map(mood => {
          return <MoodTag key={mood} mood={mood} />;
        })}
      </MoodContainer>
    );
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

  const handleLike = async () => {
    if (user) {
      const res = await context.handleLiking(props.id);
      return res[1] === 'remove' ? setLiked(false) : setLiked(true);
    }
  };
  return (
    <Container id="smallPlayerContainer">
      <ThumbnailContainer onClick={handlePlaying}>
        <ThumbnailBorder height="100px" width="100px">
          <ThumbnailImage
            id="trackThumbnail"
            active={active}
            imageUrl={props.cover}
          >
            <SmallPlayIcon
              active={active}
              className="playIcon"
              id={
                context.playing && props.trackTitle === context.currentTrack
                  ? 'pause'
                  : 'play'
              }
              icon={
                context.playing && props.trackTitle === context.currentTrack
                  ? faPause
                  : faPlay
              }
            />
          </ThumbnailImage>
        </ThumbnailBorder>
      </ThumbnailContainer>
      <TrackInfo>
        <Title>{props.trackTitle}</Title>
        <TrackDetail>{props.genre}</TrackDetail>
        <TrackDetail>Similar Artists: {props.similarArtists}</TrackDetail>
      </TrackInfo>
      {tags()}
      <PriceContainer>
        <Heart>
          <HeartIcon id={props.id} liked={liked} handleLike={handleLike} />
        </Heart>
        <PriceButton price={props.price} id={props.id} />
      </PriceContainer>
    </Container>
  );
};

export default SmallPlayer;
