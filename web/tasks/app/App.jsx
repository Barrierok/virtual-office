import React, { useCallback } from 'react';
import { Row } from 'react-bootstrap';
import '../tasks.css';

import Header from '../../shared/Header';
import Dashboard from '../features/dashboard/Dashboard';
import AppBar from '../features/appBar/AppBar';
import ModalRoot from '../features/modal/ModalRoot';
import { DragDropContext } from 'react-beautiful-dnd';
import { toNumber } from 'lodash';
import { updateTask } from '../service';
/* eslint-disable react/prop-types*/
const App = (props) => {
  const { tasks } = props;

  const onDragEnd = useCallback((data) => {
    console.log(data);
    const destinationColumnId = toNumber(data.destination.droppableId);
    const draggableTaskId = toNumber(data.draggableId);

    const update = async () => {
      await updateTask(draggableTaskId, { columnId: destinationColumnId });
    };

    update();
  }, []);

  return (
    <>
      <div className="h-100 overflow-hidden">
        <Header active="tasks" bg="primary" />
        <div className="py-1 px-3 h-100">
          <Row as="article" className="w-100">
            <AppBar />
          </Row>
          <Row as="article" className="h-100">
            <DragDropContext onDragEnd={onDragEnd}>
              <Dashboard tasks={tasks} />
            </DragDropContext>
          </Row>
        </div>
      </div>
      <ModalRoot />
    </>
  );
};

export default App;
