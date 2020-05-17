import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  modalProps: {},
};

const modal = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, { payload: { modalType, modalProps } }) => {
      state.modalType = modalType;
      state.modalProps = modalProps;
    },
    hideModal: (state) => {
      state.modalType = null;
      state.modalProps = {};
    },
  },
});

const { actions, reducer } = modal;

export const { showModal, hideModal } = actions;

export default reducer;
