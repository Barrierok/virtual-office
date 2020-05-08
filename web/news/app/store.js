import { configureStore } from '@reduxjs/toolkit';
import gon from 'gon';

import reducer from './rootReducer';

const { collections, currentCollectionId, feeds } = gon;

const preloadedState = {
  collections: {
    activeCollection: currentCollectionId,
    collections,
    mainId: currentCollectionId,
  },
  feeds: {
    feeds,
  },
};

export default configureStore({
  reducer, preloadedState, devTools: process.env.NODE_ENV !== 'production',
});
