import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/application.css';
import gon from 'gon';
import React from 'react';
import ReactDOM from 'react-dom';
import 'moment/locale/ru';

import App from './App';
import UsernameContext from '../shared/UsernameContext';

const { username, news } = gon;

ReactDOM.render(
  <UsernameContext.Provider value={username}>
    <App news={news} />
  </UsernameContext.Provider>,
  document.getElementById('news'),
);
