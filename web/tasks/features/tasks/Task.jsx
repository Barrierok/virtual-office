import React from 'react';
import './task.css';

const Task = (props) => {
  const { title, description } = props.task;

  return (
    <div className="task">
      <h6>{title}</h6>
      <span>{description}</span>
    </div>
  );
};

export default Task;
