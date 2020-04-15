import React from 'react';
import { Container, Row } from 'react-bootstrap';
import './tasks.css';

import Header from '../shared/Header';
import Tasks from './features/board/Board';
import AppBar from './features/appBar/AppBar';

const App = (props) => {
  const { tasks } = props;

  return (
    <>
      <Header active="tasks" bg="primary" />
      <Container fluid as="main" className="h-100">
        <Row as="article" className="w-100">
          <AppBar />
        </Row>
        <Row as="article" className="h-100">
          <Tasks tasks={tasks} />
        </Row>
      </Container>
    </>
  );
};

export default App;
