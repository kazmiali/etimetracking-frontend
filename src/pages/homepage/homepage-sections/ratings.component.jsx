import React from 'react';

import { FaStar } from 'react-icons/fa';

const Ratings = () => {
  return (
    <section className='ratings-section'>
      <div className='container ratings-grid'>
        <div className='rating-box'>
          <div className='rating-stars'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <h2 className='rating-h2 bold'>LOREM IPSUM</h2>
          <p className='rating-text bold'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            A, hic!
          </p>
        </div>
        <div className='rating-box'>
          <div className='rating-stars'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <h2 className='rating-h2 bold'>LOREM IPSUM</h2>
          <p className='rating-text bold'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            A, hic!
          </p>
        </div>
        <div className='rating-box d-none-sm'>
          <div className='rating-stars'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <h2 className='rating-h2 bold'>LOREM IPSUM</h2>
          <p className='rating-text bold'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            A, hic!
          </p>
        </div>
        <div className='rating-box d-none-sm'>
          <div className='rating-stars'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <h2 className='rating-h2 bold'>LOREM IPSUM</h2>
          <p className='rating-text bold'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            A, hic!
          </p>
        </div>
        <div className='rating-box d-none-sm'>
          <div className='rating-stars'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <h2 className='rating-h2 bold'>LOREM IPSUM</h2>
          <p className='rating-text bold'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            A, hic!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Ratings;
