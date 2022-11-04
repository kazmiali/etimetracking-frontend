import React, { useEffect, useState } from 'react';

import SearchBar from './operating-expenses.search-bar.component';
import List from './operating-expenses-list/operating-expenses-list.component';
import ManageExpensesModal from './manage-expenses-types.component';

import './operating-expenses.styles.scss';
import { connect } from 'react-redux';
import {
  fetchExpTypesStart,
  addOpeExpStart,
  fetchOpeExpsStart,
  removeOpeExpStart,
} from '../../../redux/operating-expenses/operating-expenses.actions';

const OperatingExpenses = ({
  fetchExpTypesStart,
  selectedWorkspace,
  expTypes,
  opeExps,
  addOpeExpStart,
  fetchOpeExpsStart,
  removeOpeExpStart,
  userId,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selectedWorkspace.workspaceId) {
      fetchExpTypesStart(selectedWorkspace.workspaceId);
      fetchOpeExpsStart(selectedWorkspace.workspaceId);
    }
  }, [selectedWorkspace]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='app-page app-page--layout operating-exp-page'>
      <div className='app-page-name-section'>
        <h1 className='page-h1'>Operating Expenses</h1>

        {selectedWorkspace.userRole !== 'member' && (
          <button className='app-btn-white' onClick={handleOpen}>
            MANAGE EXPENSE TYPES
          </button>
        )}
      </div>
      <SearchBar
        expTypes={expTypes}
        selectedWorkspace={selectedWorkspace}
        addOpeExpStart={addOpeExpStart}
        userId={userId}
      />
      <List opeExps={opeExps} removeOpeExpStart={removeOpeExpStart} />

      <ManageExpensesModal
        open={open}
        handleClose={handleClose}
        expTypes={expTypes}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedWorkspace: state.workspace.selectedWorkspace,
  expTypes: state.opeExp.expTypes,
  opeExps: state.opeExp.opeExps,
  userId: state.user.currentUser.userId,
});

const mapDispatchToProps = (dispatch) => ({
  fetchExpTypesStart: (payload) =>
    dispatch(fetchExpTypesStart(payload)),
  fetchOpeExpsStart: (payload) =>
    dispatch(fetchOpeExpsStart(payload)),
  addOpeExpStart: (payload) => dispatch(addOpeExpStart(payload)),
  removeOpeExpStart: (payload) =>
    dispatch(removeOpeExpStart(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OperatingExpenses);
