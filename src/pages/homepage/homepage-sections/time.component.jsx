import React from 'react';
import { MdCheck } from 'react-icons/md';

const Time = () => {
  return (
    <div className='container d-flex-column'>
      <h1 className='home-h1'>Time management features</h1>
      <p className='time-section-lead'>
        etimetracking is a simple time tracker and timesheet. Track
        productivity, attendance and billable hours.
      </p>
      <div className='time-showcase-part'>
        <div className='text-part'>
          <h2 className='rating-h2 time-heading bold'>TIMEKEEPING</h2>
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
        <img
          src={require('../../../assets/images/timekeeping.png')}
          alt='timekeeping graph'
          className='time-image'
        />
      </div>
      <div className='time-showcase-part'>
        <img
          src={require('../../../assets/images/reporting.png')}
          alt='timekeeping graph'
          className='time-image'
        />
        <div className='text-part text-part-2'>
          <h2 className='rating-h2 time-heading bold'>REPORTING</h2>
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
      <div className='time-showcase-part'>
        <div className='text-part'>
          <h2 className='rating-h2 time-heading bold'>
            TEAM ACTIVITY
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
        <img
          src={require('../../../assets/images/activity.png')}
          alt='timekeeping graph'
          className='time-image'
        />
      </div>
    </div>
  );
};

export default Time;
