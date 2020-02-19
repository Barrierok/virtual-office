import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/application.css';
import gon from 'gon';
import React from 'react';
import ReactDOM from 'react-dom';
import 'moment/locale/ru';

import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
import UsernameContext from '../shared/UsernameContext';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
  },
  typography: {
    fontSize: '1rem',
  },
});

const { username } = gon;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <UsernameContext.Provider value={username}>
      <App />
    </UsernameContext.Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);
