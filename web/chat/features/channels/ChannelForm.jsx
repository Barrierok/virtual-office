import React from 'react';
import { Formik, Field, Form } from 'formik';

import { addChannel } from '../../handlers';

const ChannelForm = (props) => {
  const handleSubmit = async (values) => {
    const { closeForm } = props;
    await addChannel({ name: values.text });
    closeForm();
  };

  return (
    <Formik initialValues={{ text: '' }} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className="channelForm w-100">
          <Field
            name="text"
            required
            disabled={isSubmitting}
            type="text"
            className="w-100"
          />
        </Form>
      )}
    </Formik>
  );
};

export default ChannelForm;
