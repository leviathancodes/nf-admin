import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Rows = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-left: 3em;
`;

const LandingImage = styled.img`
  width: 400px;
  margin-right: 3em;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2em;
`;

const RowIcon = styled.img`
  height: 75px;
  margin-right: 1em;
`;

const RowBody = styled.div``;

const RowTitle = styled.h3`
  font-size: 32px;
`;

const RowParagraph = styled.p`
  width: 80%;
`;

const Row = props => {
  return (
    <RowContainer>
      <RowIcon src={props.iconSrc} />
      <RowBody>
        <RowTitle>{props.title}</RowTitle>
        <RowParagraph>{props.body}</RowParagraph>
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
