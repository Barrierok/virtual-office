import React from 'react';

import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { modalTypes } from '../../utils/constants';
import AddTask from './AddTask';

const types = {
  [modalTypes.addTask]: AddTask,
};

const getModalData = createSelector(
  [({ modal }) => modal.modalType, ({ modal }) => modal.modalProps],
  (modalType, modalProps) => ({ modalType, modalProps })
);

const ModalRoot = () => {
  const { modalType, modalProps } = useSelector(getModalData);
  if (!modalType) {
    return null;
  }
  const Modal = types[modalType];
  return <Modal data={modalProps} />;
};

export default ModalRoot;
