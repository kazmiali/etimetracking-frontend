import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdCheckmark } from 'react-icons/io';

import AddWorkspaceModal from './workspace-modal.component';

import {
  changeSelectedWorkspace,
  removeWorkspaceStart,
} from '../../../redux/workspace/workspace.actions';

import './workspaces-styles.scss';
import { linearAlertBottom } from '../../../utils/swalMixins';

const Workspaces = ({
  currentUser,
  selectedWorkspace,
  workspacesList,
  workspacesLimit,
  changeSelectedWorkspace,
  removeWorkspaceStart,
}) => {
  const [open, setOpen] = useState(false);
  const { isOnTrial, hasPaid, userId, customerNumber } = currentUser;

  const workspaceLimitCross =
    workspacesList.length >= workspacesLimit;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (workspaceToDelete) => {
    if (selectedWorkspace.userRole !== 'owner') {
      linearAlertBottom.fire({
        icon: 'warning',
        title: 'Only owner can delete it',
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          removeWorkspaceStart({
            workspacesList,
            workspace: workspaceToDelete,
            userId,
          });
        }
      });
    }
  };

  return (
    <div className='app-page app-page--layout workspaces-page'>
      <div className='app-page-name-section'>
        <h1 className='page-h1'>Workspaces</h1>
        {(!workspaceLimitCross && isOnTrial === true) ||
        hasPaid === true ? (
          <button className='app-btn-white' onClick={handleOpen}>
            CREATE WORKSPACE
          </button>
        ) : null}
      </div>
      <div className='list'>
        <div className='list-header'>WORKSPACES</div>
        {workspacesList.map((workspace) => (
          <div className='list-entry' key={workspace.workspaceId}>
            <div className='entry-title'>
              <p>{workspace.workspaceName}</p>
            </div>
            <div className='workspaces-act-dlt'>
              {workspace.workspaceId ===
              selectedWorkspace.workspaceId ? (
                <div className='active'>
                  <IoMdCheckmark />
                  <p>Active</p>
                </div>
              ) : (
                <Fragment>
                  <div className='active activate'>
                    <p
                      onClick={() =>
                        changeSelectedWorkspace(workspace)
                      }
                    >
                      Activate
                    </p>
                  </div>
                  <AiOutlineDelete
                    style={{
                      fill: 'white',
                      fontSize: '1.6rem',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleDelete(workspace)}
                  />
                </Fragment>
              )}
            </div>
          </div>
        ))}
      </div>
      <AddWorkspaceModal
        open={open}
        handleClose={handleClose}
        userId={userId}
        workspacesList={workspacesList}
        customerNumber={customerNumber}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  selectedWorkspace: state.workspace.selectedWorkspace,
  workspacesList: state.workspace.workspacesList,
  workspacesLimit: state.workspace.workspacesLimit,
});

const mapDispatchToProps = (dispatch) => ({
  changeSelectedWorkspace: (payload) =>
    dispatch(changeSelectedWorkspace(payload)),
  removeWorkspaceStart: (payload) =>
    dispatch(removeWorkspaceStart(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Workspaces);
