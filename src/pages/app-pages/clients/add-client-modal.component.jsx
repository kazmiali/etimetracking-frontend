import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from '@material-ui/core';
import { MdClose } from 'react-icons/md';

import { addClientStart } from '../../../redux/project-and-client/project-and-client.actions';

import { generate4digitNum } from '../../../utils/generate4digitNum';
import { isEmpty } from '../../../utils/validateFields';

const ClientsModal = ({
  open,
  handleClose,
  selectedWorkspace,
  addClientStart,
  userId,
}) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const [clientData, setClientData] = useState({
    clientName: '',
    clientAddress: '',
    clientPhoneNumber: '',
  });

  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    let alertMessage = 'Please fill out the fields';
    if (
      !isEmpty(clientData.clientName, alertMessage) &&
      !isEmpty(clientData.clientAddress, alertMessage) &&
      !isEmpty(clientData.clientPhoneNumber, alertMessage)
    ) {
      setButtonClicked(true);
      addClientStart({
        ...clientData,
        clientNumber: generate4digitNum(),
        workspaceId: selectedWorkspace.workspaceId,
        createdBy: userId,
      });
      setTimeout(() => {
        setButtonClicked(false);
        setClientData({
          clientName: '',
          clientAddress: '',
          clientPhoneNumber: '',
        });
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
        <div className='modal project-modal add-client-modal'>
          <div className='m-header'>
            <h2>Add Client</h2>
            <MdClose onClick={handleClose} />
          </div>
          <div className='m-body'>
            <input
              type='text'
              className='input'
              placeholder='Enter client name...'
              value={clientData.clientName}
              onChange={handleChange}
              name='clientName'
            />
            <input
              type='text'
              className='input'
              placeholder='Enter client address...'
              value={clientData.clientAddress}
              onChange={handleChange}
              name='clientAddress'
            />
            <input
              type='text'
              className='input'
              placeholder='Enter client contact number...'
              value={clientData.clientPhoneNumber}
              onChange={handleChange}
              name='clientPhoneNumber'
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
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  selectedWorkspace: state.workspace.selectedWorkspace,
  userId: state.user.currentUser.userId,
});

const mapDispatchToProps = (dispatch) => ({
  addClientStart: (payload) => dispatch(addClientStart(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientsModal);
