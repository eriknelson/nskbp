import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Container from './base/components/Container';
import IntroPage from './auth/components/IntroPage';
import HomePage from './content/components/HomePage';
import AboutPage from './content/components/AboutPage';
import DnsPage from './dns/components/DnsPage';

const App = ({children}) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

const initRoutes = (store) => {
  // Access control method
  const requireAuth = (nextState, transition, done) => {
    if(!store.getState().auth.getIn(['user', 'isSignedIn'])) {
      transition(null, '/');
    }
    done();
  };

  const transitionIfLoggedIn = (nextState, transition, done) => {
    if(store.getState().auth.getIn(['user', 'isSignedIn'])) {
      transition(null, '/home');
    }
    done();
  }

  const Routes = () => {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={IntroPage} onEnter={transitionIfLoggedIn}/>
          <Route path="/about" component={AboutPage} />
          <Route path="/home" component={HomePage} onEnter={requireAuth} />
          <Route path="/dns" component={DnsPage} onEnter={requireAuth} />
        </Route>
      </Router>
    );
  };

  return Routes;
};

export default initRoutes;
