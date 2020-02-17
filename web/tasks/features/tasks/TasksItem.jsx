import React, { useContext } from 'react';
import Card from 'react-bootstrap/cjs/Card';
import Button from 'react-bootstrap/cjs/Button';
import moment from 'moment';
import UsernameContext from '../../../shared/UsernameContext';

function TasksItem(props) {
  const user = useContext(UsernameContext);

  const {
    task: {
      title,
      description,
      createdAt,
    },
  } = props;

  const formattedDate = moment(createdAt).fromNow();

  return (
    <Card className="text-center">
      <Card.Header>{user}</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Button variant="primary">Перейти к описанию</Button>
      </Card.Body>
      <Card.Footer className="text-muted">{formattedDate}</Card.Footer>
    </Card>
  );
}

export default TasksItem;
