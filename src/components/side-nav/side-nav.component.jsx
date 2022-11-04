import React from 'react';
import { Link } from 'react-router-dom';
import SideNavLinks from '../nav-links/nav-links.component';
import UserInfo from '../user-info/user-info.component';

const SideNav = () => {
  return (
    <div className='side-nav'>
      <Link to='/' className='side-nav-logo-link'>
        <img
          src={require('../../assets/mainlogo.png')}
          alt='etimetracking logo'
          className='side-nav-logo'
        />
      </Link>
      <UserInfo />
      <SideNavLinks />
    </div>
  );
};

export default SideNav;
