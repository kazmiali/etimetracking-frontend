import React, { Fragment, useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

import UserInfoDropDown from './user-info-dropdown.component';
import { connect } from 'react-redux';

const UserInfo = ({ currentUser }) => {
  const [showUserDropDown, setDropDown] = useState(false);

  const handleDropDown = () => {
    setDropDown(!showUserDropDown);
  };

  const handleDropDownClose = () => {
    setDropDown(false);
  };

  return (
    <Fragment>
      <div className='user-info-wrapper' onClick={handleDropDown}>
        {currentUser.photoURL ? (
          <div className='image-wrapper'>
            <img
              src={currentUser.photoURL}
              alt='user'
              className='side-nav-img'
            />
          </div>
        ) : (
          <div className='dp-wrapper'>
            <div className='dp'>
              <span>{currentUser.displayName.charAt(0)}</span>
            </div>
          </div>
        )}

        <span className='side-nav-name'>
          <p>{currentUser.displayName}</p>
          {showUserDropDown ? <FaChevronDown /> : <FaChevronRight />}
        </span>
      </div>
      <UserInfoDropDown
        showUserDropDown={showUserDropDown}
        handleDropDownClose={handleDropDownClose}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(UserInfo);
