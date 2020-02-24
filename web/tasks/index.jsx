import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/application.css';
import gon from 'gon';
import React from 'react';
import ReactDOM from 'react-dom';
import 'moment/locale/ru';

import App from './App';
import UsernameContext from '../shared/UsernameContext';

const { username, tasks, columns } = gon;
console.log(gon);

ReactDOM.render(
  <UsernameContext.Provider value={username}>
    <App tasks={tasks} />
  </UsernameContext.Provider>,
  document.getElementById('tasks'),
);
