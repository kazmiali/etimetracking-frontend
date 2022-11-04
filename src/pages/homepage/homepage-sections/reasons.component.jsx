import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';

const Reasons = () => {
  return (
    <div className='reasons-section'>
      <div className='container d-flex-column'>
        <h1 className='home-h1'>Why track time with etimetracking</h1>
        <div className='reasons-grid'>
          <div className='reason-box'>
            <div className='reason-icon'>
              <img
                src={require('../../../assets/icons/ajeeb.png')}
                alt='simple icon'
              />
            </div>
            <h2 className='reason-h2 bold'>Lorem Ipsum</h2>
            <div className='reason-text bold'>
              Lorem, ipsum dolor sit amet consectetur adipisicing
              elit. Beatae magni a inventore nobis accusamus aliquid
              incidunt eveniet rerum. Beatae assumenda nemo inventore
              voluptas id quidem hic recusandae, eos reprehenderit
            </div>
            <div className='reason-link'>
              <p>Productivity</p>
              <div className='reason-link-icon'>
                <FaLongArrowAltRight />
              </div>
            </div>
          </div>
          <div className='reason-box'>
            <div className='reason-icon'>
              <img
                src={require('../../../assets/icons/dollar-back.png')}
                alt='simple icon'
              />
            </div>
            <h2 className='reason-h2 bold'>Lorem Ipsum</h2>
            <div className='reason-text bold'>
              Lorem, ipsum dolor sit amet consectetur adipisicing
              elit. Beatae magni a inventore nobis accusamus aliquid
              incidunt eveniet rerum. Beatae assumenda nemo inventore
              voluptas id quidem hic recusandae, eos reprehenderit
            </div>
            <div className='reason-link'>
              <p>Productivity</p>
              <div className='reason-link-icon'>
                <FaLongArrowAltRight />
              </div>
            </div>
          </div>
          <div className='reason-box'>
            <div className='reason-icon'>
              <img
                src={require('../../../assets/icons/clock-blue.png')}
                alt='simple icon'
              />
            </div>
            <h2 className='reason-h2 bold'>Lorem Ipsum</h2>
            <div className='reason-text bold'>
              Lorem, ipsum dolor sit amet consectetur adipisicing
              elit. Beatae magni a inventore nobis accusamus aliquid
              incidunt eveniet rerum. Beatae assumenda nemo inventore
              voluptas id quidem hic recusandae, eos reprehenderit
            </div>
            <div className='reason-link'>
              <p>Productivity</p>
              <div className='reason-link-icon'>
                <FaLongArrowAltRight />
              </div>
            </div>
          </div>
          <div className='reason-box'>
            <div className='reason-icon'>
              <img
                src={require('../../../assets/icons/people.png')}
                alt='simple icon'
              />
            </div>
            <h2 className='reason-h2 bold'>Lorem Ipsum</h2>
            <div className='reason-text bold'>
              Lorem, ipsum dolor sit amet consectetur adipisicing
              elit. Beatae magni a inventore nobis accusamus aliquid
              incidunt eveniet rerum. Beatae assumenda nemo inventore
              voluptas id quidem hic recusandae, eos reprehenderit
            </div>
            <div className='reason-link'>
              <p>Productivity</p>
              <div className='reason-link-icon'>
                <FaLongArrowAltRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reasons;
