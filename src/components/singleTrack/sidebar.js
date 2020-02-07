import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.color.primaryGrey};
  background-color: #efefef;
  padding: 1em;
  overflow: scroll;
  height: inherit;
`;

const Paragraph = styled.p`
  font-size: 1em;
`;

const Subheading = styled.h3`
  color: ${props => props.theme.color.black};
  font-size: 1.5em;
  font-weight: 500;
`;

const PriceText = styled.span`
  color: ${props => props.theme.color.primaryBlue};
  font-weight: 500;
`;

const PriceList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
`;

const PriceListItem = styled.li`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const Bullet = styled.div`
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  background: ${props => props.theme.color.primaryBlue};
  margin: 0 0.25em 0 0.25em;
`;

const TrackInformation = ({
  title,
  genre,
  similarArtists,
  price,
  bpm,
  release
}) => {
  return (
    <Container>
      <Subheading>Title</Subheading>
      <Paragraph>{title}</Paragraph>
      <Subheading>Genre</Subheading>
      <Paragraph>{genre}</Paragraph>
      <Subheading>Similar Artists</Subheading>
      <Paragraph>{similarArtists}</Paragraph>
      <Subheading>Price</Subheading>
      <Paragraph>
        Starting from <PriceText>${price}</PriceText>
      </Paragraph>
      <PriceList>
        <PriceListItem>
          <Bullet />
          <Paragraph>
            Basic MP3: <PriceText>${price}</PriceText>
          </Paragraph>
        </PriceListItem>
        <PriceListItem>
          <Bullet />
          <Paragraph>
            Basic WAV: <PriceText>${(price + 25).toFixed(2)}</PriceText>
          </Paragraph>
        </PriceListItem>
        <PriceListItem>
          <Bullet />
          <Paragraph>
            Premium: <PriceText>${(price + 50).toFixed(2)}</PriceText>
          </Paragraph>
        </PriceListItem>
      </PriceList>
      <Subheading>BPM</Subheading>
      <Paragraph>{bpm}</Paragraph>
      <Subheading>Release Date</Subheading>
      <Paragraph>{release}</Paragraph>
    </Container>
  );
};

export default TrackInformation;
