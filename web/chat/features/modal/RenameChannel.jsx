import React from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';

import { renameChannel } from '../../handlers';
import { hideModal } from './modalSlice';
import useActions from '../../utils/useActions';

const RenameChannel = (props) => {
  const dispatchHideModal = useActions(hideModal);
  const { data: { id, initialValues } } = props;

  const onSubmit = async (values, actions) => {
    await renameChannel({ id, name: values.text });
    actions.setSubmitting(false);
    dispatchHideModal();
  };

  const handleHideModal = () => dispatchHideModal();

  const renderForm = () => (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {({ dirty, isSubmitting, handleSubmit }) => (
        <Form className="d-flex" onSubmit={handleSubmit}>
          <Field
            name="text"
            required
            disabled={isSubmitting}
            component="input"
            type="text"
            className="w-100"
          />
          <ErrorMessage name="text" />
          <Button
            type="submit"
            variant="success"
            disabled={!dirty || isSubmitting}
          >
            Переименовать
          </Button>
        </Form>
      )}
    </Formik>
  );

  return (
    <Modal show onHide={handleHideModal}>
      <Modal.Header closeButton>Переименовать канал</Modal.Header>
      <Modal.Body>
        {renderForm()}
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
