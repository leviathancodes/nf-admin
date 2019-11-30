import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/navigation/navigation';
import FooterPlayer from './components/audio-player/footerPlayer/footerPlayer';
import Upload from './pages/upload';
import Music from './pages/music';
import SearchResults from './pages/search';
import Error404 from './pages/404';
import TrackEdit from './pages/trackEdit';

const Wrapper = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/upload" exact component={Upload} />
        <Route path="/music" exact component={Music} />
        <Route path="/music/:track" exact component={TrackEdit} />
        <Route path="/search/:term" exact component={SearchResults} />
        <Route component={Error404} />
      </Switch>
      <FooterPlayer />
    </Router>
  );
};

export default Wrapper;
