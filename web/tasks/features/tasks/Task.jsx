import React from 'react';
import { FiEdit3 } from 'react-icons/fi';
import './task.css';
import { useDispatch } from 'react-redux';
import { showModal } from '../modal/modalSlice';
import { modalTypes } from '../../utils/constants';
/* eslint react/prop-types: 0 */

const Task = (props) => {
  const dispatch = useDispatch();
  const { title, description } = props.task;

  const handleUpdate = () => {
    dispatch(
      showModal({
        modalType: modalTypes.updateTask,
        modalProps: props.task,
      })
    );
  };

  return (
    <div className="task">
      <div className="d-flex justify-content-between overflow-hidden">
        <div className="overflow-hidden">
          <h6>{title}</h6>
        </div>
        <div className="cursor-pointer" onClick={handleUpdate}>
          <FiEdit3 size={15} />
        </div>
      </div>
      <span>{description}</span>
    </div>
  );
};

export default Task;
