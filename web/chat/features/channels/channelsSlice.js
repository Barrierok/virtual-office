/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  channels: [],
};

const channels = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActiveChannel: (state, { payload: { activeChannel } }) => {
      state.activeChannel = activeChannel;
    },
    addChannel: (state, { payload: { channel } }) => {
      state.channels.push(channel);
    },
    removeChannel: (state, { payload: { id } }) => {
      const { activeChannel, generalId } = state;
      state.activeChannel = activeChannel === id ? generalId : activeChannel;
      _.remove(state.channels, (c) => c.id === id);
    },
    renameChannel: (state, { payload: { channel } }) => {
      const index = state.channels.findIndex((c) => c.id === channel.id);
      state.channels[index] = channel;
    },
  },
});

const { actions, reducer } = channels;

export const {
  addChannel,
  renameChannel,
  removeChannel,
  setActiveChannel,
} = actions;

export default reducer;
