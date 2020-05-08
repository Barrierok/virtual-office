import React from 'react';
import './column.css';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { postColumn, removeNullColumns } from './columnsSlice';
import { tasksSelectors } from '../tasks/tasksSlice';
import { IoMdAdd } from 'react-icons/io';
import Task from '../tasks/Task';
import { showModal } from '../modal/modalSlice';
import { modalTypes } from '../../utils/constants';

const Column = (props) => {
  const dispatch = useDispatch();
  const tasks = useSelector(tasksSelectors.tasks);

  const { column, newItem } = props;

  const formik = useFormik({
    initialValues: {
      columnName: '',
    },
    onSubmit: async ({ columnName }) => {
      await dispatch(postColumn({ title: columnName }));
      await dispatch(removeNullColumns());
    },
  });

  const addCard = (id) => () => {
    dispatch(
      showModal({ modalType: modalTypes.addTask, modalProps: { columnId: id } })
    );
  };

  const isFetching = formik.isSubmitting && !formik.isValidating;

  if (newItem) {
    return (
      <div className="column-cnt">
        <div className="column-content">
          <div className="column-header">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={formik.values.columnName}
                  name="columnName"
                  onChange={formik.handleChange}
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={isFetching}
                className="btn btn-primary btn-sm w-100"
              >
                Сохранить
              </button>
            </form>
          </div>
          <hr />
        </div>
      </div>
    );
  }

  const columnTasks = tasks.filter((i) => i.columnId === column.id);

  return (
    <div className="column-cnt">
      <div className="column-content">
        <h6 className="column-header ml-2">{column.title}</h6>
        <div className="column-tasks">
          {columnTasks.map((i) => (
            <Task task={i} key={i.id} />
          ))}
        </div>
        <hr />
        <div className="column-footer ml-2" onClick={addCard(column.id)}>
          <span>
            <IoMdAdd />
          </span>{' '}
          <span className="add-task">Добавить еще карточку</span>
        </div>
      </div>
    </div>
  );
};

export default Column;
