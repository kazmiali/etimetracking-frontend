import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import TimeTrackerInputSection from './timetracker-input-section/timetracker-input-section.component';
import TimeSheet from './timesheet/timesheet.component';

import { fetchProjectsStart } from '../../../redux/project-and-client/project-and-client.actions';
import { fetchCategoriesStart } from '../../../redux/category/category.actions';

import './timetracker.styles.scss';
import { fetchTimeEntriesStart } from '../../../redux/time-entry/time-entry.actions';

const TimeTracker = ({
  projects,
  categories,
  selectedWorkspace,
  currentUser,
  fetchTimeEntriesStart,
  fetchProjectsStart,
  fetchCategoriesStart,
  timeEntries,
}) => {
  useEffect(() => {
    if (selectedWorkspace.workspaceId) {
      fetchProjectsStart(selectedWorkspace.workspaceId);
      fetchCategoriesStart(selectedWorkspace.workspaceId);
      fetchTimeEntriesStart({
        workspaceId: selectedWorkspace.workspaceId,
        userId: currentUser.userId,
        path: 'timeEntries',
      });
    }
  }, [selectedWorkspace]);

  return (
    <div className='app-page app-page--layout tt-page'>
      <div className='app-page-name-section'>
        <h1 className='page-h1'>Time Tracker</h1>
      </div>
      <TimeTrackerInputSection
        projects={projects}
        categories={categories}
      />
      <TimeSheet
        timeEntries={timeEntries}
        selectedWorkspace={selectedWorkspace}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  selectedWorkspace: state.workspace.selectedWorkspace,
  projects: state.projectAndClient.projects,
  categories: state.category.categories,
  timeEntries: state.timeEntry.timeEntries,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTimeEntriesStart: (payload) =>
    dispatch(fetchTimeEntriesStart(payload)),
  fetchCategoriesStart: (workspaceId) =>
    dispatch(fetchCategoriesStart(workspaceId)),
  fetchProjectsStart: (payload) =>
    dispatch(fetchProjectsStart(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeTracker);
