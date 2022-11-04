import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import InputSection from './ca-timetracker-input-section/ca-timetracker-input-section.component';
import TimeSheet from './ca-timesheet/ca-timesheet.component';

import { fetchTimeEntriesStart } from '../../../redux/time-entry/time-entry.actions';
import { fetchProjectsStart } from '../../../redux/project-and-client/project-and-client.actions';
import { fetchCategoriesStart } from '../../../redux/category/category.actions';
import {
  fetchMatExpsStart,
  fetchOpeExpsStart,
} from '../../../redux/operating-expenses/operating-expenses.actions';

import './charges-aquisition.styles.scss';

const ChargesAquisition = ({
  currentUser,
  projects,
  categories,
  opeExps,
  matExps,
  fetchTimeEntriesStart,
  selectedWorkspace,
  fetchProjectsStart,
  fetchCategoriesStart,
  fetchMatExpsStart,
  fetchOpeExpsStart,
  caTimeEntries,
}) => {
  useEffect(() => {
    if (selectedWorkspace.workspaceId) {
      fetchProjectsStart(selectedWorkspace.workspaceId);
      fetchCategoriesStart(selectedWorkspace.workspaceId);
      fetchMatExpsStart(selectedWorkspace.workspaceId);
      fetchOpeExpsStart(selectedWorkspace.workspaceId);
      fetchTimeEntriesStart({
        workspaceId: selectedWorkspace.workspaceId,
        userId: currentUser.userId,
        path: 'caTimeEntries',
      });
    }
  }, [selectedWorkspace]);

  useEffect(() => {}, []);

  return (
    <div className='app-page app-page--layout ca-tt-page'>
      <div className='app-page-name-section'>
        <h1 className='page-h1'>Charges Aquisition</h1>
      </div>
      <InputSection
        projects={projects}
        categories={categories}
        opeExps={opeExps}
        matExps={matExps}
      />
      <TimeSheet
        caTimeEntries={caTimeEntries}
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
  caTimeEntries: state.timeEntry.caTimeEntries,
  opeExps: state.opeExp.opeExps,
  matExps: state.opeExp.matExps,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTimeEntriesStart: (payload) =>
    dispatch(fetchTimeEntriesStart(payload)),
  fetchCategoriesStart: (workspaceId) =>
    dispatch(fetchCategoriesStart(workspaceId)),
  fetchProjectsStart: (payload) =>
    dispatch(fetchProjectsStart(payload)),
  fetchMatExpsStart: (payload) =>
    dispatch(fetchMatExpsStart(payload)),
  fetchOpeExpsStart: (payload) =>
    dispatch(fetchOpeExpsStart(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChargesAquisition);
