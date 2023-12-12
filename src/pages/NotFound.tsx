import React from 'react';
import './NotFound.less';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found__content">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__message">Page not found</p>
      </div>
    </div>
  );
}

export default NotFound;

