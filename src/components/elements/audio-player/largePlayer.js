/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const LargePlayer = props => {
  const [playing, isPlaying] = useState(false);
  const [audio, setAudio] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [similarArtists, setSimilarArtists] = useState('');
  const [cover, setCover] = useState('');
  const [price, setPrice] = useState('');

  const Heading = styled.h3`
    font-size: 3em;
    color: #fa2e6a;
    font-family: futura-pt, sans-serif;
    font-weight: 500;
    font-style: normal;
  `;

  const Paragraph = styled.p`
    color: #1d1d1d;
  `;

  const PriceText = styled.span`
    color: #7799fc;
  `;

  const Container = styled.div`
    display: grid;
    width: 1000px;
    height: 200px;
    grid-template-columns: 20% 60% 20%;
    box-shadow: 0 4px 6px 0 #0000004b;
    margin-bottom: 25px;
  `;

  const CoverContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 5px;
  `;

  const LargePlayContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const Image = styled.img`
    display: block;
  `;

  const BorderWrap = styled.div`
  `

  const LargePlayCircle = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
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
  `;

  useEffect(() => {
    setAudio(props.trackUrl);
    setGenre(props.genre);
    setTitle(props.trackTitle);
    setSimilarArtists(props.similarArtists);
    setPrice(props.price);
    setCover(props.cover);
  }, props);

  return (
    <Container>
      <LargePlayContainer>
        <LargePlayCircle className="play">
          <audio src={audio} />
        </LargePlayCircle>
      </LargePlayContainer>
      <div className="trackData">
        <Heading>{title}</Heading>
        <Paragraph>
          {genre} | {similarArtists} Type Beat
        </Paragraph>
        <Paragraph>
          Starting from <PriceText>${price}</PriceText>
        </Paragraph>
      </div>
      <CoverContainer className="trackCover">
        <Image src={cover} alt={`${title}-cover`} />
      </CoverContainer>
    </Container>
  );
};

export default LargePlayer;
