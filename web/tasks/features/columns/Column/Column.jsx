import React from 'react';
import './column.css';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as columnsActions from '../columnsSlice';

function Column(props) {
  const {
    column, tasks, newItem, postColumn,
    removeNullColumns,
  } = props;

  const formik = useFormik({
    initialValues: {
      columnName: '',
    },
    onSubmit({ columnName }) {
      postColumn({ title: columnName })
        .then(() => {
          removeNullColumns();
        });
    },
  });

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
              <button type="submit" className="btn btn-primary btn-sm w-100">Сохранить</button>
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
}

const mapStateToProps = (state) => ({
  tasks: state.tasks.data,
});

const actionCreators = {
  postColumn: columnsActions.postColumn,
  removeNullColumns: columnsActions.removeNullColumns,
};

export default connect(mapStateToProps, actionCreators)(Column);
