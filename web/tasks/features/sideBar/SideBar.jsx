import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const navItems = [
  {
    id: 1,
    title: 'Добавить задачу',
  },
];

function SideBar() {
  return (
    <Card>
      <Card.Header>Управление</Card.Header>
      <Card.Body>
        <ListGroup>
          {navItems.map((i) => {
            const { title, id } = i;
            return <ListGroup.Item key={`side-list-item-${id}`}>{title}</ListGroup.Item>;
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default SideBar;
