import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { removeChannel } from '../../handlers';
import { hideModal } from './modalSlice';
import useActions from '../../utils/useActions';

const ConfirmDelete = (props) => {
  const dispatchHideModal = useActions(hideModal);

  const handleRemove = () => {
    const { data: { id } } = props;
    removeChannel({ id });
    dispatchHideModal();
  };

  const handleHideModal = () => dispatchHideModal();

  return (
    <Modal
      size="sm"
      show
      onHide={handleHideModal}
      className="confirm"
    >
      <Modal.Header closeButton>
        <Modal.Title>Вы уверены?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-around">
        <Button onClick={handleHideModal}>Закрыть</Button>
        <Button variant="danger" onClick={handleRemove}>Удалить</Button>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmDelete;
