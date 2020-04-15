import React from 'react';

import Header from '../shared/Header';

function App(props) {
  const news = props;
  console.log(news);

  return (
    <Header active="news" bg="primary" />
  );
}

export default App;
