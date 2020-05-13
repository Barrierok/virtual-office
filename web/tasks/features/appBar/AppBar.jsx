import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import AppBarFeaturesButton from './AppBarFeaturesButton';
import { addColumn, removeNullColumns } from '../columns/columnsSlice';

const navItems = [
  {
    id: 1,
    title: 'Добавить ещё колонку',
    icon: <IoMdAdd />,
    handler: 'addNewColumn',
  },
];

const AppBar = () => {
  const dispatch = useDispatch();

  const handlersMapping = {
    addNewColumn: () => {
      dispatch(removeNullColumns());
      dispatch(addColumn({ data: null }));
    },
  };

  return (
    <div className="d-flex flex-grow-1">
      {navItems.map((i) => {
        const { id, title, icon, handler } = i;
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

export default AppBar;
