import React from 'react';
import {
  Router, Route, IndexRoute, hashHistory
} from 'react-router';
import Layout from './base/components/Layout';

const Routes = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={Layout} />
    </Router>
  );
};

export default Routes;
