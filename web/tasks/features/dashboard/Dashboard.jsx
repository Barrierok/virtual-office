import React from 'react';
import { useSelector } from 'react-redux';
import Column from '../columns/Column';
import { columnsSelectors } from '../columns/columnsSlice';

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
          <div key={`column-${i.id}`} className="board-item">
            <Column column={i} />
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
