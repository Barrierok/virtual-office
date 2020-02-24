import React from 'react';
import { connect } from 'react-redux';
import Column from '../columns/Column/Column';

function Board(props) {
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
    </main>
  );
}

const mapStateToProps = (state) => ({
  columns: state.columns.data,
});

export default connect(mapStateToProps)(Board);
