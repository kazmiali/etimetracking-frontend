import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoMdCheckmark } from 'react-icons/io';

import { signOutStart } from '../../redux/user/user.actions';
import { changeSelectedWorkspace } from '../../redux/workspace/workspace.actions';

const UserInfoDropDown = ({
  showUserDropDown,
  signOutStart,
  selectedWorkspace,
  workspacesList,
  changeSelectedWorkspace,
}) => {
  return (
    <div className='user-info-dropdown'>
      {showUserDropDown ? (
        <Fragment>
          {workspacesList.map((workspace) => (
            <Link
              className='tab'
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '235px',
              }}
              onClick={() => changeSelectedWorkspace(workspace)}
              key={workspace.workspaceId}
            >
              <span>{workspace.workspaceName}</span>
              {workspace.workspaceId ===
                selectedWorkspace.workspaceId && (
                <span className='active'>
                  <IoMdCheckmark
                    style={{
                      fill: '#8bc34a',
                      fontSize: '1.25rem',
                    }}
                  />
                </span>
              )}
            </Link>
          ))}

          <Link to='/profile' className='tab bt-grey'>
            <span>Profile Settings</span>
          </Link>
          <Link className='tab' onClick={signOutStart}>
            <span>Log out</span>
          </Link>
        </Fragment>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedWorkspace: state.workspace.selectedWorkspace,
  workspacesList: state.workspace.workspacesList,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
  changeSelectedWorkspace: (payload) =>
    dispatch(changeSelectedWorkspace(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInfoDropDown);
