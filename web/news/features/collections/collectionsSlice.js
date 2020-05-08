/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  collections: [],
};

const collections = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setActiveCollection: (state, { payload: { activeCollection } }) => {
      state.activeCollection = activeCollection;
    },
    addCollection: (state, { payload: { collection } }) => {
      state.collections.push(collection);
    },
    removeCollection: (state, { payload: { id } }) => {
      const { activeCollection, mainId } = state;
      state.activeCollection = (activeCollection === id ? mainId : activeCollection);
      _.remove(state.collections, ((c) => c.id === id));
    },
    renameCollection: (state, { payload: { collection } }) => {
      const index = state.collections.findIndex((c) => c.id === collection.id);
      state.collections[index] = collection;
    },
  },
});

const { actions, reducer } = collections;

export const {
  addCollection,
  setActiveCollection,
  renameCollection,
  removeCollection,
} = actions;

export default reducer;
