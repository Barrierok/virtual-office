import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import { connect } from 'react-redux';
import AppBarFeaturesButton from '../common/AppBarFeaturesButton';
import * as columnsActions from '../columns/columnsSlice';

const navItems = [
  {
    id: 1,
    title: 'Добавить ещё колонку',
    icon: <IoMdAdd />,
    handler: 'addNewColumn',
  },
];

const AppBar = (props) => {
  const { addColumn } = props;

  const handlersMapping = {
    addNewColumn: () => {
      addColumn({ data: null });
    },
  };

  return (
    <div className="d-flex flex-grow-1">
      {navItems.map((i) => {
        const {
          id, title, icon, handler,
        } = i;
        return (
          <AppBarFeaturesButton key={id} onClick={handlersMapping[handler]}>
            {icon}
            <span>{title}</span>
          </AppBarFeaturesButton>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasks.data,
});

const actionCreators = {
  addColumn: columnsActions.addColumn,
};

export default connect(mapStateToProps, actionCreators)(AppBar);
