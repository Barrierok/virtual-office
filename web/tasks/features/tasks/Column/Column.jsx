import React from 'react';
import './column.css';
import { connect } from 'react-redux';

function Column(props) {
  const { column, tasks } = props;

  const columnTasks = tasks.filter((i) => i.columnId === column.id);

  return (
    <div className="column-cnt">
      <div className="column-content">
        <div className="column-header">
          {column.title}
        </div>
        <div className="column-tasks">
          {columnTasks.map((i) => {
            console.log(i);
            const { id, title, description } = i;
            return (
              <div key={`task-${id}`}>
                <h3>{title}</h3>
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

export default connect(mapStateToProps)(Column);
