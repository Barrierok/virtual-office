import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fetchingState: 'none',
  data: [],
  error: null,
};

const columns = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addColumns(state, action) {
      const { data } = action.payload;
      state.data = data;
    },
  },
});

const { actions, reducer } = columns;

export const { addColumns } = actions;

export default reducer;
