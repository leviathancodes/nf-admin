import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding: 4em;
`;

const Title = styled.h1`
  font-size: 32px;
  color: ${props => props.theme.color.primaryPink};
  font-weight: 500;
  border-bottom: 5px solid ${props => props.theme.color.primaryBlue};
  display: inline-block;
`;

const ContentSection = styled.div`
  margin-top: 3em;
  display: flex;
  flex-direction: column;
`;

const SectionHeading = styled.h4`
  font-size: 24px;
  color: ${props => props.theme.color.primaryPink};
  font-weight: 500;
`;

const SectionLink = styled.p`
  font-weight: 500;
`;

const ProfileSidebar = () => {
  return (
    <Container>
      <Title>Overview</Title>
      <ContentSection>
        <SectionHeading>Account</SectionHeading>
        <SectionLink>Sign In Settings</SectionLink>
        <SectionLink>Manage email newsletters</SectionLink>
      </ContentSection>
      <ContentSection>
        <SectionHeading>Music</SectionHeading>
        <SectionLink>Liked tracks</SectionLink>
        <SectionLink>Purchased tracks</SectionLink>
      </ContentSection>
      <ContentSection>
        <SectionHeading>More</SectionHeading>
        <SectionLink>Privacy Policy</SectionLink>
        <SectionLink>Terms of Service</SectionLink>
        <SectionLink>Contact</SectionLink>
      </ContentSection>
    </Container>
  );
};

export default ProfileSidebar;
