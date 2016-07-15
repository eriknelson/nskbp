import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import initLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { configure, authStateReducer } from 'redux-auth';
import cookies from 'browser-cookies';

import clientConfig from '../config/client.dev'
import initRoutes from './Routes';

import dnsPod from './dns';

export function initialize() {
  // General application initialization
  const reducer = combineReducers({
    auth: authStateReducer,
    dns: dnsPod.reducer
  })

  const store = createStore(
    reducer,
    {},
    compose(
      applyMiddleware(thunk, promiseMiddleware(), initLogger()),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  const Routes = initRoutes(store);

  const reduxAuthConfig = configure(
    { apiUrl: clientConfig.api_url },
    { clientOnly: true, cleanSession: false }
  );

  return store.dispatch(reduxAuthConfig).then(() => {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  })
}
