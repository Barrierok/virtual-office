import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import useActions from '../../utils/useActions';
import { hideModal } from './modalSlice';
import { removeCollection } from '../../handlers';

const ConfirmDelete = (props) => {
  const dispatchHideModal = useActions(hideModal);

  const handleRemove = () => {
    const { data: { id } } = props;
    removeCollection({ id });
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
        <Modal.Title className="text-center">Подтвердите удаление коллекции</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-between">
        <Button variant="danger" onClick={handleRemove}>Да, удалить</Button>
        <Button onClick={handleHideModal}>Закрыть</Button>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmDelete;
