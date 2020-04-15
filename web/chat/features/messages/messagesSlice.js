import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

import { removeChannel } from '../channels/channelsSlice';

const initialState = {
  messages: [],
};

const messages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload: { message } }) => {
      state.messages.push(message);
    },
  },
  extraReducers: {
    [removeChannel]: (state, { payload: { id } }) => {
      _.remove(state.messages, (m) => m.channelId === id);
    },
  },
});

const { actions, reducer } = messages;

export const { addMessage } = actions;

export default reducer;
