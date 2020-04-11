import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Channels from '../features/channels/Channels';
import Chat from '../features/messages/Chat';
import MessageForm from '../features/messages/MessageForm';
import Header from '../../shared/Header';

const App = () => (
  <>
    <Header active="chat" />
    <Container fluid as="main" className="container-chat">
      <Row as="article" className="h-100">
        <Col sl={12} md={2} lg={2} className="h-100 m-0 p-0">
          <Channels />
        </Col>
        <Col sl={12} md={10} lg={10} className="m-0 p-0 h-100 w-100 border-top border-left">
          <Chat />
          <MessageForm />
        </Col>
      </Row>
    </Container>
  </>
);

export default App;
