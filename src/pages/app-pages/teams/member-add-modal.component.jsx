import React, { useState } from 'react';
import { Modal, ClickAwayListener } from '@material-ui/core';
import { MdClose } from 'react-icons/md';
import { generate4digitNum } from '../../../utils/generate4digitNum';
import { isEmailValid } from '../../../utils/validateFields';

const ProjectsModal = ({
  open,
  handleClose,
  selectedWorkspaceData,
  currentUser,
  addMemberStart,
}) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [inviteeEmail, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const clearState = () => {
    setEmail('');
  };

  const handleSubmit = () => {
    if (isEmailValid(inviteeEmail, clearState)) {
      const { displayName, userId } = currentUser;
      const {
        workspaceName,
        workspaceId,
        workspaceOwnerId,
        workspaceMembers,
      } = selectedWorkspaceData;

      const toBeAddedIntoWorkspaceMembers = {
        address: null,
        displayName: null,
        email: inviteeEmail,
        employeeNumber: generate4digitNum(),
        invitationAccepted: false,
        phoneNumber: null,
        role: 'member',
        userId: null,
      };

      const invitationDoc = {
        workspaceOwnerId,
        workspaceName,
        workspaceId,
        invitingUserId: userId,
        invitingUserName: displayName,
        invitedUserEmail: inviteeEmail,
        invitationAccepted: false,
      };

      setButtonClicked(true);
      addMemberStart({
        toBeAddedIntoWorkspaceMembers,
        invitationDoc,
        workspaceMembers,
      });

      setTimeout(() => {
        setButtonClicked(false);
        setEmail('');
        handleClose();
      }, 1000);
    }
  };

  return (
    <Modal
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      open={open}
      onClose={handleClose}
    >
      <div className='modal-container'>
        <ClickAwayListener onClickAway={handleClose}>
          <div className='modal team-modal'>
            <div className='m-header'>
              <h2>ADD NEW MEMBER</h2>
              <MdClose onClick={handleClose} />
            </div>
            <div className='m-body'>
              <input
                type='text'
                name=''
                placeholder='Enter Email of member to be added'
                className='input'
                value={inviteeEmail}
                onChange={handleChange}
              />
            </div>
            <div className='m-footer'>
              <p onClick={handleClose}>Cancel</p>
              <button
                className='app-btn-white'
                onClick={handleSubmit}
                disabled={buttonClicked}
              >
                ADD
              </button>
            </div>
          </div>
        </ClickAwayListener>
      </div>
    </Modal>
  );
};

export default ProjectsModal;
