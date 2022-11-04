import React, { Fragment } from 'react';

import { ClickAwayListener, Popper } from '@material-ui/core';

import { ReactComponent as AddIcon } from '../../assets/icons/timetracker/add.svg';
import { FaCircle, FaRegCheckCircle } from 'react-icons/fa';

const SelectProjectWithPopOver = ({
  classAsProp,
  setProject,
  projects,
  project1,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <Fragment>
      <button className={classAsProp} onClick={handleClick}>
        {Object.keys(project1).length === 0 ? (
          <Fragment>
            <AddIcon className='add-icon' />
            Project
          </Fragment>
        ) : (
          <Fragment>
            <FaRegCheckCircle className='add-icon' />
            {`${project1.projectName} - ${
              project1.projectClient.clientName
                ? project1.projectClient.clientName
                : 'No Client'
            } `}
          </Fragment>
        )}
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={handleClick}>
          <div className='tt-popper project-popper'>
            <div
              className='tt-popper-item default-item'
              onClick={() => setProject({})}
            >
              <FaCircle />

              <span>No Project</span>
            </div>
            {projects
              .filter((project) => project.active === true)
              .map((project) => (
                <div
                  className='tt-popper-item'
                  key={project.projectId}
                  onClick={() => setProject(project)}
                >
                  <FaCircle />
                  <span>{project.projectName}</span>
                  <span> - </span>
                  <span>
                    {Object.keys(project.projectClient).length !== 0
                      ? project.projectClient.clientName
                      : 'No Client'}
                  </span>
                </div>
              ))}
          </div>
        </ClickAwayListener>
      </Popper>
    </Fragment>
  );
};

export default SelectProjectWithPopOver;
