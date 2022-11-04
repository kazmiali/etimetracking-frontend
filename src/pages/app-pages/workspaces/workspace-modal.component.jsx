import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Modal, ClickAwayListener } from '@material-ui/core';
import { MdClose } from 'react-icons/md';
import { addWorkspaceStart } from '../../../redux/workspace/workspace.actions';
import { linearAlertBottom } from '../../../utils/swalMixins';

const AddWorkspaceModal = ({
  open,
  handleClose,
  addWorkspaceStart,
  userId,
  customerNumber,
  workspacesList,
}) => {
  const [workspaceName, setWorkspaceName] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleChange = (e) => {
    setWorkspaceName(e.target.value);
  };

  const handleSubmit = () => {
    if (workspaceName.length !== 0 && workspaceName.length > 6) {
      setButtonClicked(true);
      addWorkspaceStart({
        workspaceName,
        userId,
        workspacesList,
        customerNumber,
      });
      setTimeout(() => {
        setWorkspaceName('');
        setButtonClicked(false);
        handleClose();
      }, 1000);
    } else {
      linearAlertBottom.fire({
        icon: 'warning',
        title: 'Workspace name should be more than 6 letters.',
      });
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
          <div className='modal project-modal'>
            <div className='m-header'>
              <h2>Add Workspace</h2>
              <MdClose onClick={handleClose} />
            </div>
            <div className='m-body'>
              <input
                type='text'
                className='input'
                placeholder='Enter workspace name...'
                value={workspaceName}
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
                CREATE
              </button>
            </div>
          </div>
        </ClickAwayListener>
      </div>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addWorkspaceStart: (workspaceName) =>
    dispatch(addWorkspaceStart(workspaceName)),
});

export default connect(null, mapDispatchToProps)(AddWorkspaceModal);
