import React from 'react';
import './column.css';

function Column() {
  return (
    <div className="column-cnt">
      <div className="column-content">
        <div className="column-header">
          Активный
        </div>
        <div className="column-tasks">
          Задача
        </div>
        <div className="column-footer">
          Добавить еще карточку
        </div>
      </div>
    </div>
  );
}

export default Column;
