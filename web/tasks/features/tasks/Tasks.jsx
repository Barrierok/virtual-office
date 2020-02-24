import React from 'react';
import { connect } from 'react-redux';
import Column from './Column/Column';

function Tasks(props) {
  const { columns } = props;

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
      {columns.map((i) => (
        <div key={`column-${i.id}`} className="board-item">
          <Column column={i} />
        </div>
      ))}
    </main>
  );
}

const mapStateToProps = (state) => ({
  columns: state.columns.data,
});

export default connect(mapStateToProps)(Tasks);
