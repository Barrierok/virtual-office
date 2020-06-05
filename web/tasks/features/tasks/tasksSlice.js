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
    updateTask(state, action) {
      const { data } = action.payload;
      state.data = state.data.filter((i) => i.id !== data.id);
      state.data.push(data);
    },
    removeTask(state, action) {
      const { data } = action.payload;
      state.data = state.data.filter((i) => i.id !== data.id);
    },
  },
});

const { actions, reducer } = tasks;

export const tasksSelectors = {
  tasks: (state) => state.tasks.data,
};

export const { addTask, updateTask, removeTask } = actions;

export default reducer;
