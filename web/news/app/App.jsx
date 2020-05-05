import React from 'react';
import { Container } from 'react-bootstrap';

import './news-style.css';
import Header from '../../shared/Header';
import Collections from '../features/collections/Collections';
import Feedform from '../features/feeds/FeedForm';
import Newsline from '../features/feeds/Newsline';

const App = () => (
  <>
    <Header active="news" />
    <Container fluid as="main" className="container-news p-4">
      <div className="h-100 d-flex justify-content-between">
        <Feedform />
        <Newsline />
        <div className="collections">
          <Collections />
        </div>
      </div>
    </Container>
  </>
);

export default App;
