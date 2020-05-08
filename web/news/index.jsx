import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/application.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import gon from 'gon';
import io from 'socket.io-client';

import App from './app/App';
import UsernameContext from '../shared/UsernameContext';
import { addFeed, updateFeed, removeFeed } from './features/feeds/feedsSlice';
import { addCollection, removeCollection, renameCollection } from './features/collections/collectionsSlice';
import { events } from './utils/constants';
import store from './app/store';

const { username } = gon;

io()
  .on(events.newCollection, ({ data: { attributes } }) => (
    store.dispatch(addCollection({ collection: attributes }))
  ))
  .on(events.removeCollection, ({ data: { id } }) => (
    store.dispatch(removeCollection({ id }))
  ))
  .on(events.renameCollection, ({ data: { attributes } }) => (
    store.dispatch(renameCollection({ collection: attributes }))
  ))
  .on(events.addFeed, ({ data: { attributes } }) => (
    store.dispatch(addFeed({ feed: attributes }))
  ))
  .on(events.removeFeed, ({ data: { id } }) => (
    store.dispatch(removeFeed({ id }))
  ))
  .on(events.updateFeed, ({ data: { attributes } }) => (
    store.dispatch(updateFeed({ feed: attributes }))
  ));

ReactDOM.render(
  <Provider store={store}>
    <UsernameContext.Provider value={username}>
      <App />
    </UsernameContext.Provider>
  </Provider>,
  document.getElementById('news'),
);
