import React, { useContext } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AudioContext } from './context/audioContext';
import { NavigationContext } from './context/navigationContext';
import { ShoppingCartContext } from './context/shoppingCartContext';
import Landing2 from './pages/landing2';
import Nav from './components/navigation/navigation';
import MobileMenu from './components/navigation/mobileMenu';
import FooterPlayer from './components/audio-player/footerPlayer/footerPlayer2';
import Upload from './pages/upload';
import Music from './pages/music';
import SearchResults from './pages/search';
import Error404 from './pages/404';
import SignUp from './pages/signup';
import Login from './pages/login';
import Profile from './pages/profile';
import Playlist from './components/playlist/playlist';
import Checkout from './pages/checkout';
import SingleTrack from './pages/singleTrack';
import PurchaseModal from './components/modal/purchaseModal';

const PageWrapper = styled.div`
  filter: ${props => (props.blurred ? 'blur(4px)' : 'none')};
  transition: all 0.2s ease-in;
  pointer-events: ${props => (props.blurred ? 'none' : 'auto')};
  position: ${props => (props.blurred ? 'fixed' : 'auto')};
  display: inline;
`;

const Wrapper = () => {
  const audioContext = useContext(AudioContext);
  const navigationContext = useContext(NavigationContext);
  const { licenseModal } = useContext(ShoppingCartContext);

  return (
    <Router>
      <PurchaseModal />
      <Playlist />
      <MobileMenu />
      <PageWrapper
        blurred={
          audioContext.playlistActive ||
          licenseModal ||
          navigationContext.mobileMenu
        }
      >
        {navigationContext.visibility ? (
          <Nav
            visibility={navigationContext.visibility}
            color={navigationContext.backgroundColor}
            fontColor="black"
          />
        ) : (
          <div />
        )}
        <Switch>
          <Route path="/" exact component={Landing2} />
          <Route path="/upload" exact component={Upload} />
          <Route path="/music" exact component={Music} />
          <Route path="/music/:track" exact component={SingleTrack} />
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
