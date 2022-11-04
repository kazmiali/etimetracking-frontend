import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { updateDPStart } from '../../../redux/user/user.actions';
import {
  acceptInvitationStart,
  declineInvitationStart,
} from '../../../redux/workspace/workspace.actions';

import Header from '../../../components/header/header.component';

import '../../app/app.styles.scss';
import './user-settings.styles.scss';
import { linearAlertBottom } from '../../../utils/swalMixins';

const UserSettings = ({
  currentUser,
  invitations,
  workspacesList,
  updateDPStart,
  acceptInvitationStart,
  declineInvitationStart,
}) => {
  const handleImage = () => {
    const image = document.getElementById('upload-dp').files[0];

    if (!image) {
      return;
    }

    if (image.size > 2097152) {
      linearAlertBottom.fire({
        icon: 'warning',
        title: 'Image size is too big, please select another image',
      });
    }

    updateDPStart({ image, userId: currentUser.userId });
  };

  return (
    <Fragment>
      <Header />

      <div className='app-page app-page--layout user-settings-page'>
        <div className='app-page-name-section'>
          <h1 className='page-h1'>User Settings</h1>
        </div>
        <div className='list'>
          <div className='list-header'>
            Account Name: {currentUser.displayName}
          </div>
          <div className='settings-section'>
            <div className='settings-box invite-area'>
              <h2 className='ss-h2'>Workspace Invitations</h2>
              <p className='ss-lead'>
                Here you can see invites to workspaces.
              </p>
              <div className=''>
                {invitations ? (
                  invitations.map((invitation) => (
                    <div
                      className='invite'
                      key={invitation.invitationId}
                    >
                      <span>
                        {`${invitation.invitingUserName} invited you to ${invitation.workspaceName}`}
                      </span>
                      <div className='invite-btns'>
                        <button
                          className='app-btn-blue'
                          onClick={() =>
                            acceptInvitationStart({
                              currentUser,
                              invitation,
                            })
                          }
                        >
                          Accept
                        </button>
                        <button
                          className='app-btn-blue decline'
                          onClick={() =>
                            declineInvitationStart({
                              invitation,
                            })
                          }
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='invite no-invite'>
                    <span>
                      No invitations right now. They will be shown
                      when someone invites you to their team.
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className='settings-box w-name'>
              <h2 className='ss-h2'>Workspaces</h2>
              <p className='ss-lead'>
                You are member of these workspaces.
              </p>
              <div className='w-name-input-wrapper workspace-list'>
                <ol>
                  {workspacesList &&
                    workspacesList.map((workspace) => (
                      <li key={workspace.workspaceId}>
                        {workspace.workspaceName}
                      </li>
                    ))}
                </ol>
              </div>
            </div>
            <div className='settings-box'>
              <h2 className='ss-h2'>Your Profile Picture</h2>
              <p className='ss-lead'>
                Formats: png, jpg. Choose a file to change your
                picture. Max size 2MB.
              </p>
              <div className='image-area'>
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
                <input
                  type='file'
                  className='app-btn-white'
                  accept='image/x-png,image/jpeg'
                  id='upload-dp'
                />
                <button
                  className='app-btn-blue'
                  onClick={handleImage}
                >
                  Upload
                </button>
              </div>
            </div>
            <div className='settings-box w-name'>
              <h2 className='ss-h2'>Account Info</h2>
              <p className='ss-lead'>
                You can see account info here.
                {/* Click change to enable
                editing. */}
              </p>
              <div className='w-name-input-wrapper'>
                <div>
                  <span>Full Name: </span>
                  <input
                    type='text'
                    name=''
                    className='input'
                    value={currentUser.displayName}
                  />
                </div>
                <div>
                  <span>Email:</span>
                  <input
                    type='text'
                    name=''
                    className='input'
                    value={currentUser.email}
                    disabled
                  />
                </div>
                {/* <div>
                  <span>Address:</span>
                  <input
                    type='text'
                    name=''
                    className='input'
                    value={currentUser.address}
                  />
                </div>
                <div>
                  <span>Phone:</span>
                  <input
                    type='text'
                    name=''
                    className='input'
                    value={currentUser.phoneNumber}
                  />
                </div> */}
                {/* <button className='app-btn-blue'>Change</button>

                <button className='app-btn-blue mt-1'>Update</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  invitations: state.user.invitations,
  workspacesList: state.workspace.workspacesList,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  acceptInvitationStart: (payload) =>
    dispatch(acceptInvitationStart(payload)),
  declineInvitationStart: (payload) =>
    dispatch(declineInvitationStart(payload)),
  updateDPStart: (payload) => dispatch(updateDPStart(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserSettings);
