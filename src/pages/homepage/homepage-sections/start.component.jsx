import React from 'react';
import { Link } from 'react-router-dom';
import { MdPeople } from 'react-icons/md';

const Start = () => {
  return (
    <section className='start-section'>
      <div className='d-flex-column container'>
        <h1 className='home-h1'>
          The only effective time tracker for teams
        </h1>
        <p className='home-lead bold'>
          etimetracking is the only time tracking software you need.
          It's a simple time tracker and timesheet app that lets you
          and your team track work hours across projects.
        </p>
        <Link className='btn-home mt-1' to='/subscription'>
          GET STARTED
        </Link>
        <span>
          <MdPeople /> 77656 people have signed up last month
        </span>
        <img
          src={require('../../../assets/images/start-people.png')}
          alt='illustration of people'
          className='people-image'
        />
      </div>
    </section>
  );
};

export default Start;
