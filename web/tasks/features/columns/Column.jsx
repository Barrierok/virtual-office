import React, { useState } from 'react';
import './column.css';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { postColumn, removeNullColumns, patchColumn } from './columnsSlice';
import { tasksSelectors } from '../tasks/tasksSlice';
import { IoMdAdd } from 'react-icons/io';
import Task from '../tasks/Task';
import { showModal } from '../modal/modalSlice';
import { modalTypes } from '../../utils/constants';
import { removeColumn } from '../../service';
/* eslint react/prop-types: 0 */
const Column = (props) => {
  const dispatch = useDispatch();
  const tasks = useSelector(tasksSelectors.tasks);
  const [isUpdateState, setUpdateState] = useState(false);

  const { column, newItem } = props;

  const dispatchedUpdateColumn = (args) => dispatch(patchColumn(args));

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

  const handleUpdate = () => {
    setUpdateState(true);
  };

  const isFetching = formik.isSubmitting && !formik.isValidating;

  const stopWheelX = (e) => e.stopPropagation();

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
        {isUpdateState ? (
          <UpdateForm
            column={column}
            setUpdateState={setUpdateState}
            callback={dispatchedUpdateColumn}
          />
        ) : (
          <div
            className="column-header d-flex justify-content-between overflow-hidden"
            onClick={handleUpdate}
          >
            <h6 className="ml-2">{column.title}</h6>
          </div>
        )}
        <div className="column-tasks" onWheel={stopWheelX}>
          {columnTasks.map((i) => (
            <Task task={i} key={i.id} />
          ))}
        </div>
        <hr />
        <div className="column-footer ml-2" onClick={addCard(column.id)}>
          <span>
            <IoMdAdd />
          </span>{' '}
          <span className="cursor-pointer">Добавить карточку</span>
        </div>
      </div>
    </div>
  );
};

const UpdateForm = (props) => {
  const { column, setUpdateState, callback } = props;

  const formik = useFormik({
    initialValues: {
      columnName: column.title,
    },
    onSubmit: async ({ columnName }) => {
      const { id, ...attributes } = column;
      const newAttributes = {
        ...attributes,
        title: columnName,
      };
      await callback({ id, attributes: newAttributes });
      setUpdateState(false);
    },
  });

  const handleCloseUpdate = () => {
    setUpdateState(false);
  };

  const handleDelete = async () => {
    await removeColumn(column.id);
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      formik.handleSubmit(e);
    }
  };

  return (
    <div className="position-relative">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <textarea
            className="form-control"
            value={formik.values.columnName}
            name="columnName"
            onChange={formik.handleChange}
            autoFocus
            onKeyDown={onEnterPress}
          />
        </div>
        <button onClick={formik.handleSubmit} type="submit" hidden />
      </form>
      <div
        className="d-flex justify-content-around mb-4"
        style={{ marginTop: '-5px' }}
      >
        <button onClick={handleCloseUpdate} className="btn btn-secondary">
          Отменить
        </button>
        <button onClick={handleDelete} className="btn btn-danger">
          Удалить
        </button>
      </div>
    </div>
  );
};

export default Column;
