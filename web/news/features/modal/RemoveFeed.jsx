import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import useActions from '../../utils/useActions';
import { hideModal } from './modalSlice';
import { removeFeed } from '../../handlers';

const ConfirmDelete = (props) => {
  const dispatchHideModal = useActions(hideModal);

  const handleRemove = () => {
    const { data: { collectionId, id } } = props;
    removeFeed({ collectionId, id });
    dispatchHideModal();
  };

  const handleHideModal = () => dispatchHideModal();

  return (
    <Modal
      show
      onHide={handleHideModal}
      className="confirm"
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Подтвердите удаление новости</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-between">
        <Button variant="danger" onClick={handleRemove}>Удалить</Button>
        <Button onClick={handleHideModal}>Закрыть</Button>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmDelete;
