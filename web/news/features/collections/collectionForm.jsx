import React from 'react';
import { Formik, Field, Form } from 'formik';

import { addCollection } from '../../handlers';

const CollectionForm = (props) => {
  const handleSubmit = async (values) => {
    const { closeForm } = props;
    await addCollection({ name: values.text });
    closeForm();
  };

  return (
    <Formik initialValues={{ text: '' }} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className="collectionForm pb-2">
          <Field
            name="text"
            required
            disabled={isSubmitting}
            type="text"
            className="form-control"
            placeholder="Введите имя"
          />
        </Form>
      )}
    </Formik>
  );
};

export default CollectionForm;
