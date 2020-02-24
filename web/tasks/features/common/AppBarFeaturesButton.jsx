import React from 'react';
import './comon.css';

function AppBarFeaturesButton(props) {
  const { children } = props;
  return (
    <div className="app-feature-item">
      {children}
    </div>
  );
}

export default AppBarFeaturesButton;
