import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import RemoveCollection from './RemoveCollection';
import RenameCollection from './RenameCollection';

import RemoveFeed from './RemoveFeed';
import UpdateFeed from './UpdateFeed';

import {
  renameCollectionType,
  removeCollectionType,
  removeFeedType,
  updateFeedType,
} from '../../utils/constants';

const types = {
  [renameCollectionType]: RenameCollection,
  [removeCollectionType]: RemoveCollection,
  [removeFeedType]: RemoveFeed,
  [updateFeedType]: UpdateFeed,
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
