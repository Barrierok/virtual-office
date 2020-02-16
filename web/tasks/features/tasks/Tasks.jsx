import React from 'react';
import TasksItem from './TasksItem';

function Tasks(props) {
  const { tasks } = props;

  return (
    <main id="tasks-grid">
      {tasks.map((i) => (
        <div key={`task-grid-item-${i.id}`} className="tasks-grid-item">
          <TasksItem task={i} />
        </div>
      ))}
    </main>
  );
}

export default Tasks;
