import React from 'react';
import { useSelector } from 'react-redux';
import Column from '../columns/Column';
import { columnsSelectors } from '../columns/columnsSlice';
import { Droppable } from 'react-beautiful-dnd';

const Dashboard = () => {
  const columns = useSelector(columnsSelectors.columns);

  const handleScroll = (e) => {
    const container = document.getElementById('board');
    const containerScrollPosition = container.scrollLeft;
    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY,
    });
  };

  return (
    <div id="board" onWheel={handleScroll}>
      {columns.map((i) => {
        if (i === null) {
          return (
            <div key="column-new" className="board-item">
              <Column newItem />
            </div>
          );
        }
        return (
          <Droppable
            key={`column-${i.id}`}
            droppableId={`${i.id}`}
            type="COLUMN"
          >
            {(provided) => (
              <div
                className="board-item h-100"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Column column={i} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        );
      })}
    </div>
  );
};

export default Dashboard;
