import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fetchingState: 'none',
  data: [],
  error: null,
};

const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTasks(state, action) {
      const { data } = action.payload;
      state.data = data;
    },
  },
});

const { actions, reducer } = tasks;

export const { addTasks } = actions;

export default reducer;
