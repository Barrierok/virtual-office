import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import Header from '../shared/Header';
import Tasks from './features/tasks/Tasks';
import SideBar from './features/sideBar/SideBar';

function App(props) {
  const { tasks } = props;

  return (
    <>
      <Header active="tasks" bg="dark" />
      <Container fluid as="main" className="h-100">
        <Row as="article" className="h-100">
          <Col sl={12} md={2} lg={2} className="m-0 p-0">
            <SideBar />
          </Col>
          <Col sl={12} md={10} lg={10} className="m-0 p-0 h-100 w-100 border-top border-left">
            <Tasks tasks={tasks} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
