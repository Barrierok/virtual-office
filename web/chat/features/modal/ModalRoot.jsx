import React from 'react';

import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';
import { renameChannelType, removeChannelType } from '../../utils/constants';

const types = {
  [renameChannelType]: RenameChannel,
  [removeChannelType]: RemoveChannel,
};

const getModalData = createSelector(
  [
    ({ modal }) => modal.modalType,
    ({ modal }) => modal.modalProps,
  ],
  (modalType, modalProps) => ({ modalType, modalProps }),
);

const ModalRoot = () => {
  const { modalType, modalProps } = useSelector(getModalData);
  if (!modalType) {
    return null;
  }
  const Modal = types[modalType];
  return (
    <Modal data={modalProps} />
  );
};

export default ModalRoot;
