import React from 'react';
import Column from './Column/Column';

function Tasks(props) {
  const { tasks } = props;

  const handleScroll = (e) => {
    const container = document.getElementById('board');
    const containerScrollPosition = container.scrollLeft;
    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY,
    });
  };

  return (
    <main id="board" onWheel={handleScroll} className="h-100">
      {tasks.map((i) => (
        <div key={`task-grid-item-${i.id}`} className="tasks-grid-item">
          <Column task={i} />
        </div>
      ))}
    </main>
  );
}

export default Tasks;
