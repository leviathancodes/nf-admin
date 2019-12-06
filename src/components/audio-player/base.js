import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SmallPlayIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 36px;
  display: ${props => (props.active ? 'flex' : 'none')};
`;

export const ThumbnailBorder = styled.div`
  background: ${props => props.theme.color.largeBorderGradient};
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 1em;
`;

export const ThumbnailImage = styled.div`
  width: 95%;
  height: 95%;
  overflow: none;
  background-image: url(${props => props.imageUrl})};
  box-shadow: ${props => (props.active ? props.theme.color.darkHover : 'none')};
  background-size: cover;
  background-position: 50% 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  transition: all 0.3s ease-in;

  &:hover {
    box-shadow: ${props => props.theme.color.darkHover};
  }

  &:hover ${SmallPlayIcon} {
    display: flex;
  }
`;

export const ThumbnailContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in;
  margin-left: 16px;
`;
