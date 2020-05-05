import { combineReducers } from '@reduxjs/toolkit';

import modal from '../features/modal/modalSlice';
import collections from '../features/collections/collectionsSlice';
import feeds from '../features/feeds/feedsSlice';

export default combineReducers({
  collections,
  modal,
  feeds,
});
