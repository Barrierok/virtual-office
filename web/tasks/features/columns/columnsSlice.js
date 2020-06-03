import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as service from '../../service';

const initialState = {
  fetchingState: 'none',
  data: [],
  error: null,
};

const columns = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addColumn(state, action) {
      const { data } = action.payload;
      state.data.push(data);
    },
    removeNullColumns(state) {
      state.data = state.data.filter((i) => i !== null);
    },
    updateColumn(state, action) {
      const { data } = action.payload;
      state.data = state.data.filter((i) => data.id !== i.id);
      state.data.push(data);
    },
  },
});

const { actions, reducer } = columns;

export const { addColumn, removeNullColumns, updateColumn } = actions;

export const columnsSelectors = {
  columns: (state) => state.columns.data,
};

export const postColumn = createAsyncThunk(
  'columns/post',
  async (attributes = {}) => {
    const response = await service.postColumn(attributes);
    return response.data;
  }
);
export const patchColumn = createAsyncThunk(
  'columns/update',
  async ({ id, attributes = {} }) => {
    const response = await service.updateColumn(id, attributes);
    return response.data;
  }
);

export default reducer;
