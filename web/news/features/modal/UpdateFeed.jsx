import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import useActions from '../../utils/useActions';
import { hideModal } from './modalSlice';
import { updateFeed } from '../../handlers';
import { modules, formats } from '../../utils/quillConfig';

const UpdateFeed = (props) => {
  const dispatchHideModal = useActions(hideModal);
  const { data: { collectionId, id, initialValues } } = props;

  const onSubmit = async (values, actions) => {
    await updateFeed({
      collectionId, id, title: values.title, body: values.body,
    });
    actions.setSubmitting(false);
    dispatchHideModal();
  };

  const handleHideModal = () => dispatchHideModal();

  const renderForm = () => (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {({ dirty, isSubmitting, handleSubmit }) => (
        <Form className="d-flex flex-column" onSubmit={handleSubmit}>
          <Field
            name="title"
            required
            disabled={isSubmitting}
            component="input"
            type="text"
            className="w-100 form-control"
          />
          <ErrorMessage name="title" />
          <Field name="body" disabled={isSubmitting} required className="mt-3">
            {({ field }) => <ReactQuill modules={modules} formats={formats} value={field.value} onChange={field.onChange(field.name)} className="mt-3" /> }
          </Field>
          <ErrorMessage name="body" className="mt-3" />
          <div className="d-flex">
            <Button
              type="submit"
              variant="success"
              disabled={!dirty || isSubmitting}
              className="mt-4"
            >
              Изменить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );

  return (
    <Modal show onHide={handleHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Изменить новость</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderForm()}
      </Modal.Body>
    </Modal>
  );
};

export default UpdateFeed;
