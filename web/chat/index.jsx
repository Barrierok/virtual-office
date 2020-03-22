import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/application.css';

import gon from 'gon';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';

import App from './app/App.jsx';
import UsernameContext from '../shared/UsernameContext';
import { addMessage } from './features/messages/messagesSlice';
import { addChannel, removeChannel, renameChannel } from './features/channels/channelsSlice';
import { events } from './utils/constants';
import store from './app/store';

const { username } = gon;

io()
  .on(events.newMessage, ({ data: { attributes } }) => (
    store.dispatch(addMessage({ message: attributes }))
  ))
  .on(events.newChannel, ({ data: { attributes } }) => (
    store.dispatch(addChannel({ channel: attributes }))
  ))
  .on(events.removeChannel, ({ data: { id } }) => (
    store.dispatch(removeChannel({ id }))
  ))
  .on(events.renameChannel, ({ data: { attributes } }) => (
    store.dispatch(renameChannel({ channel: attributes }))
  ));

ReactDOM.render(
  <Provider store={store}>
    <UsernameContext.Provider value={username}>
      <App />
    </UsernameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
