import React from 'react';
import {
  Router, Route, IndexRoute, hashHistory
} from 'react-router';

import IntroPage from './auth/components/IntroPage';
import HomePage from './content/components/HomePage';
import DnsPage from './dns/components/DnsPage';

const Routes = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={IntroPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/dns" component={DnsPage} />
    </Router>
  );
};

export default Routes;
