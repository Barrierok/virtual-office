import React from 'react';
import './task.css';

const Task = (props) => {
  const { title, description } = props.task;

  return (
    <div className="task">
      <h5>{title}</h5>
      <span>{description}</span>
    </div>
  );
};

export default Task;
