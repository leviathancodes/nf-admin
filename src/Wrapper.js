import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/navigation';
import Upload from './pages/upload';

const Wrapper = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/upload" exact component={Upload} />
      </Switch>
    </Router>
  );
};

export default Wrapper;
