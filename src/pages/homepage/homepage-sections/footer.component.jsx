import React from 'react';
import { Link } from 'react-router-dom';
import { MdPeople } from 'react-icons/md';
import { FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='footer-wrapper'>
      <div className='footer container'>
        <div className='home-h1' style={{ alignSelf: 'flex-start' }}>
          Start tracking
        </div>
        <div className='footer-words'>
          <span>Easy to use</span>
          <span>Increase Productivity</span>
          <span>Affordable</span>
        </div>
        <Link to='/subscription' className='btn-home'>
          GET STARTED
        </Link>
        <span className=' btn-footer'>
          <MdPeople /> 77656 people have signed up last month
        </span>

        <div className='footer-bottom-grid'>
          <div className='logo-and-auth'>
            <img
              src={require('../../../assets/mainlogo.png')}
              alt='etimetracking logo'
            />
          </div>
          <div className='footer-links-list first'>
            <h2 className='footer-link-heading'>PRODUCT</h2>
            <Link className='footer-link' to='/'>
              Why Use
            </Link>
            <Link className='footer-link' to='/'>
              Features
            </Link>
            <Link className='footer-link' to='/'>
              Testimonials
            </Link>
          </div>
          <div className='footer-links-list second'>
            <h2 className='footer-link-heading'>SOLUTION</h2>
            <Link className='footer-link' to='/'>
              Time Tracker
            </Link>
            <Link className='footer-link' to='/'>
              Time Reports
            </Link>
            <Link className='footer-link' to='/'>
              Subscription
            </Link>
          </div>
        </div>
        <div className='footer-bottom'>
          © etimetracking 2020. All Rights Reserved.
          <div className='footer-social'>
            <FaYoutube className='social-icon youtube' />
            <FaTwitter className='social-icon twitter' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
