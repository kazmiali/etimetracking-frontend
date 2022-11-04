import React, { useEffect, Fragment, useState } from 'react';

import ProjectsSearchBar from './projects-search-bar.component';
import ProjectsList from './projects-list/projects-list.component';
import ProjectsModal from './projects-modal.component';

import './projects.styles.scss';
import { fetchProjectsStart } from '../../../redux/project-and-client/project-and-client.actions';
import { connect } from 'react-redux';

const Projects = ({
  selectedWorkspace,
  selectedWorkspaceData,
  projects,
  fetchProjectsStart,
}) => {
  const [open, setOpen] = useState(false);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    if (selectedWorkspace.workspaceId) {
      fetchProjectsStart(selectedWorkspace.workspaceId);
    }
  }, [selectedWorkspace]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchField = (e) => {
    setSearchField(e.target.value);
  };

  const searchProjects = (item) => {
    if (searchField === '') {
      return true;
    }

    if (
      item.projectName
        .toLowerCase()
        .includes(searchField.toLowerCase())
    ) {
      return true;
    }

    if (
      item.projectNumber
        .toString()
        .toLowerCase()
        .includes(searchField.toLowerCase())
    ) {
      return true;
    }

    if (Object.keys(item.projectClient).length !== 0) {
      if (
        item.projectClient.clientName
          .toLowerCase()
          .includes(searchField.toLowerCase())
      ) {
        return true;
      }
    }
  };

  const checkRole = () => {
    if (selectedWorkspaceData.whoProjects === 'admin') {
      if (
        selectedWorkspace.userRole === 'admin' ||
        selectedWorkspace.userRole === 'owner'
      ) {
        return (
          <Fragment>
            <button className='app-btn-white' onClick={handleOpen}>
              CREATE PROJECT
            </button>
            <ProjectsModal open={open} handleClose={handleClose} />
          </Fragment>
        );
      }
    } else if (selectedWorkspaceData.whoProjects === 'member') {
      return (
        <Fragment>
          <button className='app-btn-white' onClick={handleOpen}>
            CREATE PROJECT
          </button>
          <ProjectsModal open={open} handleClose={handleClose} />
        </Fragment>
      );
    }
  };

  return (
    <div className='app-page app-page--layout projects-page'>
      <div className='app-page-name-section'>
        <h1 className='page-h1'>Projects</h1>
        {checkRole()}
      </div>
      <ProjectsSearchBar
        handleSearchField={handleSearchField}
        searchField={searchField}
      />
      <ProjectsList
        projects={projects}
        searchProjects={searchProjects}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedWorkspace: state.workspace.selectedWorkspace,
  selectedWorkspaceData: state.workspace.selectedWorkspaceData,
  projects: state.projectAndClient.projects,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProjectsStart: (payload) =>
    dispatch(fetchProjectsStart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
