import React from 'react';
import { MdCheck } from 'react-icons/md';

const Price = () => {
  return (
    <div className='price'>
      <div className='container d-flex price-section'>
        <div className='dollar-sign bold'>$</div>
        <img
          className='one'
          src={require('../../../assets/images/1.png')}
          alt='1 written as'
        />
        <div className='text-part price-showcase-list '>
          <h2 className='rating-h2 time-heading bold'>
            PER EMPLOYEE
          </h2>
          <div className='statements-list'>
            <div className='statement'>
              <MdCheck className='statement-icon' />
              Track hours using a timer
            </div>
            <div className='statement'>
              <MdCheck className='statement-icon' />
              Log time in a timesheet
            </div>
            <div className='statement'>
              <MdCheck className='statement-icon' />
              Categorize time by project
            </div>
            <div className='statement'>
              <MdCheck className='statement-icon' />
              Mark time as billable
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;
