import React, { useContext } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AudioContext } from './context/audioContext';
import Nav from './components/navigation/navigation';
import FooterPlayer from './components/audio-player/footerPlayer/footerPlayer';
import Upload from './pages/upload';
import Music from './pages/music';
import SearchResults from './pages/search';
import Error404 from './pages/404';
import TrackEdit from './pages/trackEdit';
import Playlist from './components/playlist/playlist';

const PageWrapper = styled.div`
  filter: ${props => (props.blurred ? 'blur(4px)' : 'none')};
  transition: all 0.2s ease-in;
  pointer-events: ${props => (props.blurred ? 'none' : 'auto')};
  position: ${props => (props.blurred ? 'fixed' : 'auto')};
`;

const Wrapper = () => {
  const context = useContext(AudioContext);
  return (
    <Router>
      <Playlist />
      <PageWrapper blurred={context.playlistActive}>
        <Nav />
        <Switch>
          <Route path="/upload" exact component={Upload} />
          <Route path="/music" exact component={Music} />
          <Route path="/music/:track" exact component={TrackEdit} />
          <Route path="/search/:term" exact component={SearchResults} />
          <Route component={Error404} />
        </Switch>
        <FooterPlayer />
      </PageWrapper>
    </Router>
  );
};

export default Wrapper;
