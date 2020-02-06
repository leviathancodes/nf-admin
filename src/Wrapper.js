import React, { useContext } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AudioContext } from './context/audioContext';
import { NavigationContext } from './context/navigationContext';
import { userContext, UserContext } from './context/userContext';
import Landing from './pages/landing';
import Landing2 from './pages/landing2';
import Nav from './components/navigation/navigation';
import FooterPlayer from './components/audio-player/footerPlayer/footerPlayer';
import Upload from './pages/upload';
import Music from './pages/music';
import SearchResults from './pages/search';
import Error404 from './pages/404';
import TrackEdit from './pages/trackEdit';
import SignUp from './pages/signup';
import Login from './pages/login';
import Profile from './pages/profile';
import Playlist from './components/playlist/playlist';
import Checkout from './pages/checkout';

const PageWrapper = styled.div`
  filter: ${props => (props.blurred ? 'blur(4px)' : 'none')};
  transition: all 0.2s ease-in;
  pointer-events: ${props => (props.blurred ? 'none' : 'auto')};
  position: ${props => (props.blurred ? 'fixed' : 'auto')};
`;

const Wrapper = () => {
  const audioContext = useContext(AudioContext);
  const navigationContext = useContext(NavigationContext);
  return (
    <Router>
      <Playlist />
      <PageWrapper blurred={audioContext.playlistActive}>
        {navigationContext.visibility ? (
          <Nav
            visibility={navigationContext.visibility}
            color={navigationContext.backgroundColor}
          />
        ) : (
          <div />
        )}
        <Switch>
          <Route path="/" exact component={Landing2} />
          <Route path="/upload" exact component={Upload} />
          <Route path="/music" exact component={Music} />
          <Route path="/music/:track" exact component={TrackEdit} />
          <Route path="/search/:term" exact component={SearchResults} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/checkout" exact component={Checkout} />
          <Route component={Error404} />
        </Switch>
        <FooterPlayer visibility={audioContext.footerVisibility} />
      </PageWrapper>
    </Router>
  );
};

export default Wrapper;
