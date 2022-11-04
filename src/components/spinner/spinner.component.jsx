import React from 'react';

import './spinner.styles.scss';

const Spinner = ({ appPage }) => (
  <div
    className={`spinner-overlay ${appPage && 'app-spinner-overlay'}`}
  >
    <div className='spinner-container' />
  </div>
);

export default Spinner;
