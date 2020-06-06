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
import {
  tasksSelectors,
  updateTask as reduxUpdateTask,
} from '../features/tasks/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
/* eslint-disable react/prop-types*/
const App = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(tasksSelectors.tasks);

  const onDragEnd = useCallback(
    (data) => {
      if (!data?.destination) return;
      const destinationColumnId = toNumber(data.destination.droppableId);
      const draggableTaskId = toNumber(data.draggableId);

      // const destinationIndex = data.destination.index;

      const update = async () => {
        await updateTask(draggableTaskId, { columnId: destinationColumnId });
      };

      const task = tasks.filter((i) => i.id === draggableTaskId)[0];
      dispatch(
        reduxUpdateTask({
          data: {
            ...task,
            columnId: destinationColumnId,
          },
        })
      );
      update();
    },
    [tasks, dispatch]
  );

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
              <Dashboard />
            </DragDropContext>
          </Row>
        </div>
      </div>
      <ModalRoot />
    </>
  );
};

export default App;
