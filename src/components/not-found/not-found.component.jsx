import React from 'react';

import '../error-boundary/error-boundary.styles.scss';

const NotFound = () => {
  return (
    <div className='error-image-overlay'>
      <div className='error-image-container' />
      <h2 className='error-image-text'>
        404 - This page is burnt to a Crisp
      </h2>
    </div>
  );
};

export default NotFound;
