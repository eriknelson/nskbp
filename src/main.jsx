import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initialize } from './app';

const mountPoint = document.getElementById('main');

initialize().then(provider => ReactDOM.render(provider, mountPoint));
