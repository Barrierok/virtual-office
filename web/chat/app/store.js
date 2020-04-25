import { configureStore } from '@reduxjs/toolkit';
import gon from 'gon';
import reducer from './rootReducer';

const { channels, currentChannelId, messages } = gon;

const preloadedState = {
  channels: {
    activeChannel: currentChannelId,
    channels,
    generalId: currentChannelId,
  },
  messages: {
    messages,
  },
};

export default configureStore({
  reducer,
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production',
});
