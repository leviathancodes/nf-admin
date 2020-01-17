import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 500px;
  height: 225px;
  box-shadow: 0 4px 6px 0 #0000004b;
  display: flex;
  padding: 1.25em;
  flex-direction: column;
  margin: 5em 0 5em 0;
`;

const Title = styled.h4`
  color: ${props => props.theme.color.primaryPink};
  font-weight: 500;
  display: flex;
`;

const StaticData = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2em;
  font-weight: 500;
  color: ${props => props.theme.color.secondaryGrey};
`;

const Links = styled(StaticData)`
  color: auto;
  font-weight: 400;
`;

const Icon = styled.span`
  margin-right: 1em;
`;

const InfoPanel = props => {
  return (
    <Container>
      <Title>
        <Icon>
          <img alt={props.iconAlt} src={props.src} />
        </Icon>
        {props.title}
      </Title>
      <StaticData>
        <p>{props.staticData.a}</p>
        <p>{props.staticData.b}</p>
      </StaticData>
      <Links>
        <a href={props.firstLink.route}>{props.firstLink.title}</a>
        <a href={props.secondLink.route}>{props.secondLink.title}</a>
      </Links>
    </Container>
  );
};

export default InfoPanel;
