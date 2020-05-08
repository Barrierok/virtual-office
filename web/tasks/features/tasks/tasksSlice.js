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
    addTask(state, action) {
      const { data } = action.payload;
      state.data.push(data);
    },
  },
});

const { actions, reducer } = tasks;

export const tasksSelectors = {
  tasks: (state) => state.tasks.data,
};

export const { addTasks } = actions;

export default reducer;
