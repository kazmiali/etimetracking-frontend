import React from 'react';

const Testimonial = () => {
  return (
    <div className='testimonial-section'>
      <div className='container testimonial-container '>
        <div className='testimonial-heading bold'>
          We got tired of paying hundreds of dollar for time tracking
        </div>
        <p className='testimonial'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
          nam deleniti libero voluptatem perferendis dolorem quis
          velit provident aspernatur vel.
        </p>
        <div className='testimonial-info'>
          <img
            src={require('../../../assets/images/human.jpg')}
            alt=''
            className='testimonial-image'
          />
          <div className='testimonial-name'>
            Nenad Milanovic, CEO at Impossible Foods.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
