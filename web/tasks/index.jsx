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
import App from './app/App';
import UsernameContext from '../shared/UsernameContext';
import { socketEvents } from './utils/constants';
import reducer from './app/rootReducer';
import {
  addColumn,
  updateColumn,
  removeColumn,
} from './features/columns/columnsSlice';
import { addTask, removeTask, updateTask } from './features/tasks/tasksSlice';

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
  })
  .on(socketEvents.addTask, ({ data }) => {
    store.dispatch(addTask({ data: data.attributes }));
  })
  .on(socketEvents.updateColumn, ({ data }) => {
    store.dispatch(updateColumn({ data: data.attributes }));
  })
  .on(socketEvents.updateTask, ({ data }) => {
    store.dispatch(updateTask({ data: data.attributes }));
  })
  .on(socketEvents.removeTask, ({ data }) => {
    store.dispatch(removeTask({ data: data.attributes }));
  })
  .on(socketEvents.removeColumn, ({ data }) => {
    store.dispatch(removeColumn({ data: data.attributes }));
  });

ReactDOM.render(
  <Provider store={store}>
    <UsernameContext.Provider value={username}>
      <App />
    </UsernameContext.Provider>
  </Provider>,
  document.getElementById('tasks')
);
