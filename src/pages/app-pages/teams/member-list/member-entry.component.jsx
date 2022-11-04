import React, { useState } from 'react';
import { connect } from 'react-redux';

import { FaAngleDown } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';

import { changeMemberRoleStart } from '../../../../redux/workspace/workspace.actions';

const MemberEntry = ({
  member: {
    employeeNumber,
    userId,
    displayName,
    email,
    address,
    phoneNumber,
    role,
    invitationAccepted,
  },
  workspaceOwnerId,
  workspaceId,
  changeMemberRoleStart,
  selectedWorkspace,
  userRole,
}) => {
  const [showDetail, setShowDetail] = useState(false);

  const toggleShowDetail = () => {
    setShowDetail(!showDetail);
  };

  const checkDeleteDisable = () => {
    return userId === workspaceOwnerId;
  };

  const handleChangeRole = () => {
    let newRole;

    if (role === 'admin') {
      newRole = 'member';
    } else if (role === 'member') {
      newRole = 'admin';
    } else {
      return;
    }

    const payloadObj = {
      userId,
      newRole,
      workspaceId,
    };

    changeMemberRoleStart(payloadObj);
  };

  return (
    <div className='member-entry list-entry'>
      <div className='entry-title'>
        <p>
          {invitationAccepted
            ? displayName
            : `Invitation pending ${email}`}
        </p>
      </div>

      <div className='entry-inactive-btn entry-dropdown-btn'>
        <span onClick={toggleShowDetail}>
          <FaAngleDown />
        </span>
      </div>
      <div className={`${showDetail ? 'member-details' : 'd-none'}`}>
        <div className='row'>
          <div className='property'>
            <p>Employee Nr:</p>
          </div>

          <div className='value'>
            <p>
              {invitationAccepted
                ? employeeNumber
                : `Invitation pending`}
            </p>
          </div>
        </div>

        <div className='row'>
          <div className='property'>
            <p>Email:</p>
          </div>

          <div className='value'>
            <p>{email}</p>
          </div>
        </div>
        {/* <div className='row'>
          <div className='property'>
            <p>Address:</p>
          </div>

          <div className='value'>
            <p>
              {invitationAccepted ? address : `Invitation pending`}
            </p>
          </div>
        </div>
        <div className='row'>
          <div className='property'>
            <p>Phone Number:</p>
          </div>

          <div className='value'>
            <p>
              {invitationAccepted
                ? phoneNumber
                : `Invitation pending`}
            </p>
          </div>
        </div> */}
        <div className='row'>
          <div className='property'>
            <p>Role:</p>
          </div>

          <div className='value'>
            <p>{invitationAccepted ? role : `Invitation pending`}</p>
            {selectedWorkspace.userRole !== 'member' &&
              role !== 'owner' &&
              invitationAccepted && (
                <button
                  className={`change-role`}
                  onClick={handleChangeRole}
                >
                  {role === 'member' ? 'Make admin' : 'Make member'}
                </button>
              )}
          </div>
        </div>
        {userRole !== 'member' && (
          <div className='row'>
            <div className='property'>
              <p>Delete:</p>
            </div>

            <div className='value'>
              <button
                className='app-btn-blue'
                disabled={checkDeleteDisable()}
              >
                <AiOutlineDelete />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeMemberRoleStart: (payload) =>
    dispatch(changeMemberRoleStart(payload)),
});

export default connect(null, mapDispatchToProps)(MemberEntry);
