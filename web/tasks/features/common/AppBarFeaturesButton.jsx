import React from 'react';
import './comon.css';

function AppBarFeaturesButton(props) {
  const { children, onClick } = props;
  return (
    <div className="app-feature-item" role="presentation" onClick={onClick}>
      {children}
    </div>
  );
}

export default AppBarFeaturesButton;
