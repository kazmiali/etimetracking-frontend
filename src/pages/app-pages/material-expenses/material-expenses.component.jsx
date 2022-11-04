import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import SearchBar from './material-expenses-search-bar.component';
import List from './material-expenses-list/material-expenses-list.component';

import './material-expenses.styles.scss';
import {
  fetchMatExpsStart,
  addMatExpStart,
  removeMatExpStart,
} from '../../../redux/operating-expenses/operating-expenses.actions';

const MaterialExpenses = ({
  matExps,
  selectedWorkspace,
  fetchMatExpsStart,
  removeMatExpStart,
  addMatExpStart,
  userId,
}) => {
  useEffect(() => {
    if (selectedWorkspace.workspaceId) {
      fetchMatExpsStart(selectedWorkspace.workspaceId);
    }
  }, [selectedWorkspace]);

  return (
    <div className='app-page app-page--layout material-exp-page'>
      <div className='app-page-name-section'>
        <h1 className='page-h1'>Material Expenses</h1>
      </div>
      <SearchBar
        addMatExpStart={addMatExpStart}
        selectedWorkspace={selectedWorkspace}
        userId={userId}
      />
      <List matExps={matExps} removeMatExpStart={removeMatExpStart} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedWorkspace: state.workspace.selectedWorkspace,
  matExps: state.opeExp.matExps,
  userId: state.user.currentUser.userId,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMatExpsStart: (payload) =>
    dispatch(fetchMatExpsStart(payload)),
  addMatExpStart: (payload) => dispatch(addMatExpStart(payload)),
  removeMatExpStart: (payload) =>
    dispatch(removeMatExpStart(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MaterialExpenses);
