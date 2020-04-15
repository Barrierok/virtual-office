import React from 'react';
import './column.css';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { postColumn, removeNullColumns } from '../columnsSlice';
import { tasksSelectors } from '../../../store/tasksSlice';

const Column = (props) => {
  const dispatch = useDispatch();
  const tasks = useSelector(tasksSelectors.tasks);

  const {
    column, newItem,
  } = props;

  const formik = useFormik({
    initialValues: {
      columnName: '',
    },
    onSubmit({ columnName }) {
      dispatch(postColumn({ title: columnName })
        .then(() => {
          dispatch(removeNullColumns());
        }));
    },
  });

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
              <button type="submit" disabled={isFetching} className="btn btn-primary btn-sm w-100">
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
        <div className="column-header">
          {column.title}
        </div>
        <div className="column-tasks">
          {columnTasks.map((i) => {
            const { id, title, description } = i;
            return (
              <div key={`task-${id}`}>
                <h4>{title}</h4>
                <span>{description}</span>
              </div>
            );
          })}
        </div>
        <hr />
        <div className="column-footer">
          Добавить еще карточку
        </div>
      </div>
    </div>
  );
};

export default Column;
