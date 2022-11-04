import React, { useState, useEffect } from 'react';

import MemberSearchBar from './member-search-bar.component';
import MemberList from './member-list/member-list.component.jsx';
import MemberAddModal from './member-add-modal.component.jsx';

import './teams.styles.scss';
import { connect } from 'react-redux';
import { addMemberStart } from '../../../redux/workspace/workspace.actions';

const Team = ({
  selectedWorkspaceData,
  selectedWorkspace,
  currentUser,
  addMemberStart,
}) => {
  const [open, setOpen] = useState(false);
  const [searchField, setSearchField] = useState('');

  const [forCSV, setForCSV] = useState([
    {
      check: 'one',
    },
    {
      check: 'two',
    },
  ]);
  const [show, setHide] = useState(false);
  const [csvLoading, setCsvLoading] = useState(true);

  useEffect(() => {
    setCsvLoading(true);
    const newArray =
      Object.keys(selectedWorkspaceData).length !== 0 &&
      selectedWorkspaceData.workspaceMembers
        .filter((item) => {
          return searchMembers(item);
        })
        .map((item) => {
          const objectToReturn = {
            ['Employee Number']: item.employeeNumber,
            Name: item.displayName,
            Email: item.email,
            Role: item.role,
            Id: item.userId,
          };

          return objectToReturn;
        });

    if (newArray) {
      console.log(newArray, 'asdasdasda');
      setForCSV(newArray);
      setCsvLoading(false);
      setHide(true);
    }
  }, [selectedWorkspaceData]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchField = (e) => {
    setSearchField(e.target.value);
  };

  const searchMembers = (item) => {
    if (searchField === '') {
      return true;
    }

    if (
      item.employeeNumber
        .toString()
        .toLowerCase()
        .includes(searchField.toLowerCase())
    ) {
      return true;
    }

    if (
      item.email.toLowerCase().includes(searchField.toLowerCase())
    ) {
      return true;
    }

    if (
      item.displayName
        .toLowerCase()
        .includes(searchField.toLowerCase())
    ) {
      return true;
    }
  };

  return (
    <div className='app-page app-page--layout team-page'>
      <div className='app-page-name-section'>
        <h1 className='page-h1'>Team</h1>
        {selectedWorkspace.userRole !== 'member' && (
          <button className='app-btn-white' onClick={handleOpen}>
            ADD NEW MEMBER
          </button>
        )}
      </div>
      {Object.keys(selectedWorkspaceData).length !== 0 &&
      show === true ? (
        <MemberSearchBar
          searchField={searchField}
          searchMembers={searchMembers}
          handleSearchField={handleSearchField}
          selectedWorkspaceData={selectedWorkspaceData}
          forCSV={forCSV}
          show={show}
          csvLoading={csvLoading}
        />
      ) : null}

      <MemberList
        selectedWorkspaceData={selectedWorkspaceData}
        selectedWorkspace={selectedWorkspace}
        searchMembers={searchMembers}
      />
      {selectedWorkspace.userRole !== 'member' && (
        <MemberAddModal
          open={open}
          handleClose={handleClose}
          currentUser={currentUser}
          selectedWorkspaceData={selectedWorkspaceData}
          addMemberStart={addMemberStart}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedWorkspaceData: state.workspace.selectedWorkspaceData,
  selectedWorkspace: state.workspace.selectedWorkspace,
  workspacesList: state.workspace.workspacesList,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  addMemberStart: (payload) => dispatch(addMemberStart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Team);
