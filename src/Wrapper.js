import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/navigation';
import Upload from './pages/upload';
import Music from './pages/music';

const Wrapper = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/upload" exact component={Upload} />
        <Route path="/music" exact component={Music} />
      </Switch>
    </Router>
  );
};

export default Wrapper;
