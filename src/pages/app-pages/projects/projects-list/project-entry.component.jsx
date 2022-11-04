import React from 'react';
import { FaCircle } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import {
  removeProjectStart,
  updateProjectStart,
} from '../../../../redux/project-and-client/project-and-client.actions';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { linearAlertBottom } from '../../../../utils/swalMixins';

const ProjectEntry = ({
  project,
  removeProjectStart,
  selectedWorkspace,
  updateProjectStart,
}) => {
  const handleDelete = (projectId) => {
    if (selectedWorkspace.userRole === 'member') {
      linearAlertBottom.fire({
        icon: 'warning',
        title: 'Only admins can delete',
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
          removeProjectStart(projectId);
        }
      });
    }
  };

  return (
    <div className='project-entry list-entry'>
      <div className='entry-number'>{project.projectNumber}</div>
      <div className='entry-title'>
        <p>{project.projectName}</p>
        <div className='entry-tag'>
          <FaCircle className='round' />{' '}
          {project.projectClient.clientName
            ? project.projectClient.clientName
            : 'No Client'}
        </div>
      </div>
      <div className='entry-status'>
        <span
          onClick={() =>
            updateProjectStart({
              projectId: project.projectId,
              status: project.active === true ? false : true,
            })
          }
        >
          {project.active === true ? 'Active' : 'Inactive'}
        </span>
      </div>
      <div className='entry-inactive-btn'>
        <AiOutlineDelete
          style={{ cursor: 'pointer', fontSize: '1.5rem' }}
          onClick={() => handleDelete(project.projectId)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedWorkspace: state.workspace.selectedWorkspace,
});

const mapDispatchToProps = (dispatch) => ({
  removeProjectStart: (payload) =>
    dispatch(removeProjectStart(payload)),
  updateProjectStart: (payload) =>
    dispatch(updateProjectStart(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectEntry);
