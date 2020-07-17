import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 992px) {
    margin-top: 3em;
    flex-wrap: wrap-reverse;
    height: auto;
  }
  position: static;
  overflow: hidden;
`;

const Rows = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-left: 3em;
`;

const LandingImage = styled.img`
  width: 400px;
  position: relative;
  margin-right: 3em;
  @media (max-width: 992px) {
    width: 200px;
    margin: 0;
  }
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2em;
  position: relative;
`;

const RowIcon = styled.img`
  height: 75px;
  margin-right: 1em;
`;

const RowBody = styled.div`
  position: relative;
`;

const RowTitle = styled.h3`
  font-size: 32px;
`;

const RowParagraph = styled.p`
  width: 80%;
`;

const Row = ({ iconSrc, title, body }) => {
  return (
    <RowContainer>
      <RowIcon src={iconSrc} />
      <RowBody>
        <RowTitle>{title}</RowTitle>
        <RowParagraph>{body}</RowParagraph>
      </RowBody>
    </RowContainer>
  );
};

const Features = () => {
  return (
    <Container>
      <Rows>
        <Row
          iconSrc={`${process.env.REACT_APP_NOMAD_MUSIC_S3}/icon_assets/landing/landing_features_ear_icon.svg`}
          title="Versatility Counts."
          body="Boom-bap, Atlanta trap, ambient trap, lo-fi and many more hip hop sub-genres
          are available on my beats store.  Whether for your own song, your YouTube
          channel, film or television, there is something for everyone."
        />
        <Row
          iconSrc={`${process.env.REACT_APP_NOMAD_MUSIC_S3}/icon_assets/landing/landing_features_volume_icon.svg`}
          title="Packs For Producers."
          body="Are you a producer in need of a little inspiration?  Not only is there a beats
          store, but also a range of free and premium sample packs, drum loops, and
          MIDI arrangements available!  Let your productivity skyrocket with a one of
          these packs today."
        />
        <Row
          iconSrc={`${process.env.REACT_APP_NOMAD_MUSIC_S3}/icon_assets/landing/landing_features_king_icon.svg`}
          title="Custom Made."
          body="Have something specific in mind that you can’t find?  You can contact me with
        a request of the type of music you want made so we can try and work together
        to get it done."
        />
      </Rows>
      <LandingImage
        src={`${process.env.REACT_APP_NOMAD_MUSIC_S3}/icon_assets/landing/landing_feature_studio.svg`}
      />
    </Container>
  );
};

export default Features;
