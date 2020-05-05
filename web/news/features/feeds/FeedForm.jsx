import React from 'react';
import { useSelector } from 'react-redux';

import { Formik, Field, ErrorMessage } from 'formik';
import { Form, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { addFeed } from '../../handlers';
import { modules, formats } from '../../utils/quillConfig';

const Feedform = () => {
  const activeCollection = useSelector(({ collections }) => collections.activeCollection);

  const onSubmit = async (values, actions) => {
    await addFeed({ activeCollection, ...values });
    actions.resetForm();
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={{ title: '', body: '' }}>
      {({ dirty, isSubmitting, handleSubmit }) => (
        <Form className="d-flex flex-column w-25" onSubmit={handleSubmit}>
          <span>
            Создайте свою новость:
          </span>
          <Field name="title" className="form-control mt-3" placeholder="Заголовок" disabled={isSubmitting} required />
          <ErrorMessage name="title" />
          <Field name="body" disabled={isSubmitting} required>
            {({ field }) => <ReactQuill modules={modules} formats={formats} value={field.value} onChange={field.onChange(field.name)} className="mt-3" /> }
          </Field>
          <ErrorMessage name="body" />
          <div className="d-flex justify-content-end">
            <Button
              type="submit"
              variant="primary"
              disabled={!dirty || isSubmitting}
              className="mt-4"
            >
              Добавить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Feedform;
