import React from 'react';
import TasksItem from './TasksItem';

function Tasks(props) {
  const { tasks } = props;

  return tasks.map((i) => <TasksItem task={i} key={`task-list-item-${i.id}`} />);
}

export default Tasks;
