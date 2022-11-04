import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchClientsStart } from '../../../redux/project-and-client/project-and-client.actions';

import ClientsModal from './add-client-modal.component';
import ClientsList from './clients-list/clients-list.component';

import './clients.styles.scss';
import ClientSearchBar from './clients-search-bar.component';

const Clients = ({
  clients,
  selectedWorkspace,
  selectedWorkspaceData,
  fetchClientsStart,
}) => {
  const [open, setOpen] = useState(false);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    if (selectedWorkspace.workspaceId) {
      fetchClientsStart(selectedWorkspace.workspaceId);
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

  const searchClients = (item) => {
    if (searchField === '') {
      return true;
    }

    if (
      item.clientName
        .toLowerCase()
        .includes(searchField.toLowerCase())
    ) {
      return true;
    }

    if (
      item.clientNumber
        .toString()
        .toLowerCase()
        .includes(searchField.toLowerCase())
    ) {
      return true;
    }

    if (
      item.clientPhoneNumber
        .toLowerCase()
        .includes(searchField.toLowerCase())
    ) {
      return true;
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
              ADD CLIENT
            </button>

            <ClientsModal
              open={open}
              handleClose={handleClose}
              clients={clients}
            />
          </Fragment>
        );
      }
    } else if (selectedWorkspaceData.whoProjects === 'member') {
      return (
        <Fragment>
          <button className='app-btn-white' onClick={handleOpen}>
            ADD CLIENT
          </button>

          <ClientsModal
            open={open}
            handleClose={handleClose}
            clients={clients}
          />
        </Fragment>
      );
    }
  };

  return (
    <div className='app-page app-page--layout clients-page'>
      <div className='app-page-name-section'>
        <h1 className='page-h1'>Clients</h1>
        {checkRole()}
      </div>
      <ClientSearchBar
        handleSearchField={handleSearchField}
        searchField={searchField}
      />
      <ClientsList clients={clients} searchClients={searchClients} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedWorkspace: state.workspace.selectedWorkspace,
  selectedWorkspaceData: state.workspace.selectedWorkspaceData,

  clients: state.projectAndClient.clients,
});

const mapDispatchToProps = (dispatch) => ({
  fetchClientsStart: (payload) =>
    dispatch(fetchClientsStart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
