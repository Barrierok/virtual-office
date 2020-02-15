import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Header from '../shared/Header';

function App() {
  return (
    <>
      <Header active="tasks" />
      <Container fluid as="main" className="h-100">
        <Row as="article" className="h-100">
          <h1>Иди нахуй!</h1>
        </Row>
      </Container>
    </>
  );
}

export default App;
