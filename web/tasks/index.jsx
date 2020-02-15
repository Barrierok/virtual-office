import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/application.css';
import gon from 'gon';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import UsernameContext from '../shared/UsernameContext';

const { username } = gon;

ReactDOM.render(
  <UsernameContext.Provider value={username}>
    <App />
  </UsernameContext.Provider>,
  document.getElementById('tasks'),
);
