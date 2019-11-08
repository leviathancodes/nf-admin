import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/navigation';
import Upload from './pages/upload';
import Music from './pages/music';
import SearchResults from './pages/search';
import Error404 from './pages/404';

const Wrapper = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/upload" exact component={Upload} />
        <Route path="/music" exact component={Music} />
        <Route path="/search/:term" exact component={SearchResults} />
        <Route component={Error404} />
      </Switch>
    </Router>
  );
};

export default Wrapper;
