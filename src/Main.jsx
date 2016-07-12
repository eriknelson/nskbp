import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import { Provider } from 'react-redux';
import Layout from './base/components/Layout';
import rootReducer from './rootReducer';

const store = createStore(
  rootReducer,
  applyMiddleware(promiseMiddleware(), loggerMiddleware())
);

const app =
  <Provider store={store}>
    <Layout />
  </Provider>

const mountPoint = document.getElementById('main');


ReactDOM.render(app, mountPoint);
