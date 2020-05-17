import React from 'react';
import { Row } from 'react-bootstrap';
import '../tasks.css';

import Header from '../../shared/Header';
import Dashboard from '../features/dashboard/Dashboard';
import AppBar from '../features/appBar/AppBar';
import ModalRoot from '../features/modal/ModalRoot';

const App = (props) => {
  const { tasks } = props;

  return (
    <>
      <div className="h-100 overflow-hidden">
        <Header active="tasks" bg="primary" />
        <div className="py-1 px-3 h-100">
          <Row as="article" className="w-100">
            <AppBar />
          </Row>
          <Row as="article" className="h-100">
            <Dashboard tasks={tasks} />
          </Row>
        </div>
      </div>
      <ModalRoot />
    </>
  );
};

export default App;
