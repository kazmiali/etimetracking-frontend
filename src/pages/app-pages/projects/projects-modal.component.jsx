import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, ClickAwayListener } from '@material-ui/core';
import { MdClose } from 'react-icons/md';
import { TiArrowSortedDown } from 'react-icons/ti';

import {
  addProjectStart,
  fetchClientsStart,
} from '../../../redux/project-and-client/project-and-client.actions';
import { generate4digitNum } from '../../../utils/generate4digitNum';
import { isEmpty } from '../../../utils/validateFields';

const ProjectsModal = ({
  open,
  handleClose,
  clients,
  addProjectStart,
  selectedWorkspace,
  fetchClientsStart,
  userId,
}) => {
  const [projectName, setProjectName] = useState('');
  const [client, setClient] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (selectedWorkspace.workspaceId) {
      fetchClientsStart(selectedWorkspace.workspaceId);
    }
  }, [selectedWorkspace]);

  const handleChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleClient = (e) => {
    if (e.target.value === '') {
      setClient({});
    } else {
      const selectedClient = clients.filter(
        (client) => e.target.value === client.clientName,
      );
      setClient(selectedClient[0]);
    }
  };

  const handleSubmit = () => {
    if (!isEmpty(projectName, 'Please fill out the fields')) {
      const projectObj = {
        workspaceId: selectedWorkspace.workspaceId,
        projectName,
        projectNumber: generate4digitNum(),
        projectClient: { ...client },
        createdBy: userId,
        active: true,
      };
      setButtonClicked(true);
      addProjectStart(projectObj);
      setTimeout(() => {
        setButtonClicked(false);
        setProjectName('');
        setClient({});
        handleClose();
      }, 800);
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
              <h2>Create a Project</h2>
              <MdClose onClick={handleClose} />
            </div>
            <div className='m-body'>
              <input
                type='text'
                className='input'
                placeholder='Enter project name...'
                value={projectName}
                onChange={handleChange}
                required
              />
              <div className='styled-select sort-by'>
                <select onChange={handleClient}>
                  <option value=''>No Client</option>
                  {clients.map((client) => (
                    <option value={client.clientName}>
                      {client.clientName}
                    </option>
                  ))}
                </select>
                <TiArrowSortedDown className='fa fa-sort-desc' />
              </div>
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

const mapStateToProps = (state) => ({
  selectedWorkspace: state.workspace.selectedWorkspace,
  clients: state.projectAndClient.clients,
  userId: state.user.currentUser.userId,
});

const mapDispatchToProps = (dispatch) => ({
  addProjectStart: (payload) => dispatch(addProjectStart(payload)),
  fetchClientsStart: (workspaceId) =>
    dispatch(fetchClientsStart(workspaceId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectsModal);
