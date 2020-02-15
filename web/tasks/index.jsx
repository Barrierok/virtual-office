import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/application.css';
import gon from 'gon';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';

import App from './App';
import UsernameContext from '../shared/UsernameContext';

console.log(window.gon);

ReactDOM.render(
  <UsernameContext.Provider>
    <App />
  </UsernameContext.Provider>,
  document.getElementById('tasks'),
);
