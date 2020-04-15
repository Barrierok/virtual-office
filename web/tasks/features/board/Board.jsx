import React from 'react';
import { useSelector } from 'react-redux';
import Column from '../columns/Column/Column';
import { columnsSelectors } from '../columns/columnsSlice';

const Board = () => {
  const columns = useSelector(columnsSelectors.columns);

  return (
    <div id="board">
      {columns.map((i) => {
        if (i === null) {
          return (
            <div key="column-new" className="board-item">
              <Column newItem />
            </div>
          );
        }

        return (
          <div key={`column-${i.id}`} className="board-item">
            <Column column={i} />
          </div>
        );
      })}
    </div>
  );
};

export default Board;
