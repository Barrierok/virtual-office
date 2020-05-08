/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  feeds: [],
};

const feeds = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    addFeed: (state, { payload: { feed } }) => {
      state.feeds = [feed, ...state.feeds];
    },
    removeFeed: (state, { payload: { id } }) => {
      _.remove(state.feeds, ((f) => f.id === id));
    },
    updateFeed: (state, { payload: { feed } }) => {
      const index = state.feeds.findIndex((f) => f.id === feed.id);
      state.feeds[index] = feed;
    },
  },
});

const { actions, reducer } = feeds;

export const { addFeed, removeFeed, updateFeed } = actions;

export default reducer;
