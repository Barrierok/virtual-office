import React from 'react';
import { Formik, Field } from 'formik';
import {
  Button, Form, Row, Col,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { addMessage } from '../../handlers';

const MessageForm = () => {
  const activeChannel = useSelector(({ channels }) => channels.activeChannel);

  const onSubmit = async (values, actions) => {
    await addMessage({ activeChannel, ...values });
    actions.resetForm();
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={{ text: '' }}>
      {({ dirty, isSubmitting, handleSubmit }) => (
        <Form className="form d-flex justify-content-around w-100" onSubmit={handleSubmit}>
          <Row className="w-100">
            <Col sm={12} md={8} lg={10}>
              <Field
                autoFocus
                name="text"
                required
                disabled={isSubmitting}
                type="text"
                className="rounded border w-100 mt-3"
              />
            </Col>
            <Col sm={12} md={4} lg={2}>
              <Button
                type="submit"
                variant="primary"
                className="w-100 mt-3"
                disabled={!dirty || isSubmitting}
              >
                Отправить
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
