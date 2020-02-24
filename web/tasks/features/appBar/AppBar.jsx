import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import AppBarFeaturesButton from '../common/AppBarFeaturesButton';

const navItems = [
  {
    id: 1,
    title: 'Добавить ещё колонку',
    icon: <IoMdAdd />,
  },
];

function AppBar() {
  return (
    <div className="d-flex flex-grow-1">
      {navItems.map((i) => {
        const { id, title, icon } = i;
        return (
          <AppBarFeaturesButton key={id}>
            {icon}
            <span>{title}</span>
          </AppBarFeaturesButton>
        );
      })}
    </div>
  );
}

export default AppBar;
