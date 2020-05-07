import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/application.css';
import gon from 'gon';
import React from 'react';
import ReactDOM from 'react-dom';
import 'moment/locale/ru';
import io from 'socket.io-client';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
import UsernameContext from '../shared/UsernameContext';
import { socketEvents } from './utils/constants';
import reducer from './store';
import { addColumn } from './features/columns/columnsSlice';

const { username, tasks, columns } = gon;

const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer,
  preloadedState: {
    tasks: {
      fetchingState: 'none',
      data: tasks,
      error: null,
    },
    columns: {
      fetchingState: 'none',
      data: columns,
      error: null,
    },
  },
});

io()
  .on(socketEvents.newColumn, ({ data }) => {
    store.dispatch(addColumn({ data: data.attributes }));
  });


ReactDOM.render(
  <Provider store={store}>
    <UsernameContext.Provider value={username}>
      <App />
    </UsernameContext.Provider>
  </Provider>,
  document.getElementById('tasks'),
);
