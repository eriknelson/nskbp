import React from 'react';
import {
  Router, Route, IndexRoute, hashHistory
} from 'react-router';
import IntroPage from './auth/components/IntroPage';
import Layout from './base/components/Layout';

const Routes = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={IntroPage} />
      <Route path="/home" component={Layout} />
    </Router>
  );
};

export default Routes;
