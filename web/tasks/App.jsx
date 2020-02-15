import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Header from '../shared/Header';

function App(props) {
  const { tasks } = props;
  return (
    <>
      <Header active="tasks" />
      <Container fluid as="main" className="h-100">
        <Row as="article" className="h-100">
          {tasks.map((i) => {
            const { title, description, id } = i;
            return (
              <div key={`tasks-list-item-${id}`}>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default App;
