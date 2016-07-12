import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import { Provider } from 'react-redux';
import Layout from './base/components/Layout';
import rootReducer from './rootReducer';
import Routes from './Routes';

const store = createStore(
  rootReducer,
  applyMiddleware(promiseMiddleware(), loggerMiddleware())
);

const mountPoint = document.getElementById('main');

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  mountPoint
);
