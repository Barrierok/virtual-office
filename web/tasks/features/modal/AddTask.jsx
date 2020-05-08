import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { hideModal } from './modalSlice';
import { useFormik } from 'formik';

const AddTask = (props) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      users: '',
    },
  });

  const handleHideModal = () => {
    dispatch(hideModal());
  };

  return (
    <Modal size="md" show onHide={handleHideModal} className="confirm">
      <Modal.Header closeButton>Добавление новой задачи</Modal.Header>
      <Modal.Body className="d-flex justify-content-around">
        <Button variant="danger">Удалить</Button>
      </Modal.Body>
    </Modal>
  );
};

export default AddTask;
