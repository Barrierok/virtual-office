import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';

import useActions from '../../utils/useActions';
import { hideModal } from './modalSlice';
import { renameCollection } from '../../handlers';

const RenameCollection = (props) => {
  const dispatchHideModal = useActions(hideModal);
  const { data: { id, initialValues } } = props;

  const onSubmit = async (values, actions) => {
    await renameCollection({ id, name: values.text });
    actions.setSubmitting(false);
    dispatchHideModal();
  };

  const handleHideModal = () => dispatchHideModal();

  const renderForm = () => (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {({ dirty, isSubmitting, handleSubmit }) => (
        <Form className="d-flex flex-column" onSubmit={handleSubmit}>
          <Field
            name="text"
            required
            disabled={isSubmitting}
            component="input"
            type="text"
            className="form-control w-100"
          />
          <ErrorMessage name="text" />
          <div className="d-flex mt-4">
            <Button
              type="submit"
              variant="success"
              disabled={!dirty || isSubmitting}
            >
              Переименовать
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );

  return (
    <Modal show onHide={handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать коллекцию</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderForm()}
      </Modal.Body>
    </Modal>
  );
};

export default RenameCollection;
