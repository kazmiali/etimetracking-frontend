import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  updateLogoStart,
  updateWorkspaceSettingsStart,
} from '../../../redux/workspace/workspace.actions';

import Spinner from '../../../components/spinner/spinner.component';

import './workspace-settings.styles.scss';
import { linearAlertBottom } from '../../../utils/swalMixins';

const WorkspaceSettings = ({
  selectedWorkspaceData,
  selectedWorkspace,
  updateLogoStart,
  updateWorkspaceSettingsStart,
}) => {
  const [workspaceName, setWorkspaceName] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');

  const [bRate, setBrate] = useState(
    selectedWorkspaceData.billableRate,
  );

  const [whoCategories, setWhoCategories] = useState(
    selectedWorkspaceData.whoCategories,
  );
  const [whoClients, setWhoClients] = useState(
    selectedWorkspaceData.whoClients,
  );
  const [whoProjects, setWhoProjects] = useState(
    selectedWorkspaceData.whoProjects,
  );

  useEffect(() => {
    setWorkspaceName(selectedWorkspaceData.workspaceName);
    setCustomerNumber(selectedWorkspaceData.customerNumber);
    setWhoCategories(selectedWorkspaceData.whoCategories);
    setWhoClients(selectedWorkspaceData.whoClients);
    setWhoProjects(selectedWorkspaceData.whoProjects);
    setBrate(selectedWorkspaceData.billableRate);
  }, [selectedWorkspaceData]);

  if (selectedWorkspace.userRole === 'member') {
    return <Redirect to='/app' />;
  }

  const handleImage = () => {
    const image = document.getElementById('upload-logo').files[0];

    if (!image) {
      return;
    }

    if (image.size > 2097152) {
      linearAlertBottom.fire({
        icon: 'warning',
        title: 'Image size is too big, please select another image',
      });
    }

    updateLogoStart({
      image,
      workspaceId: selectedWorkspace.workspaceId,
    });
  };

  const handleWhoProjects = (e) => {
    // replace clog with updateWorkspaceSettingsStart
    setWhoProjects(e.target.value);
    updateWorkspaceSettingsStart({
      whoProjects: e.target.value,
      whoCategories,
      whoClients,
      workspaceId: selectedWorkspace.workspaceId,
    });
  };

  const handlewhoClients = (e) => {
    setWhoClients(e.target.value);

    updateWorkspaceSettingsStart({
      whoProjects,
      whoCategories,
      whoClients: e.target.value,
      workspaceId: selectedWorkspace.workspaceId,
    });
  };

  const handleWhoCategories = (e) => {
    setWhoCategories(e.target.value);

    updateWorkspaceSettingsStart({
      whoProjects,
      whoCategories: e.target.value,
      whoClients,
      workspaceId: selectedWorkspace.workspaceId,
    });
  };

  const handleBillableRate = (e) => {
    updateWorkspaceSettingsStart({
      whoProjects,
      whoCategories,
      whoClients,
      billableRate: bRate,
      workspaceId: selectedWorkspace.workspaceId,
    });
  };

  // const handleWorkspaceSubmit = () => {
  //   if (workspaceName === selectedWorkspaceData.workspaceName) {

  //   }
  //   // givign three thigns
  // }

  // const handleWorkspaceChange = (e) => {
  //   setWorkspaceName(e.target.value);
  // };

  // const handleTry = async () => {
  //   const objOwner = {
  //     userRole: 'owner',
  //     workspaceId: 'fEvVwBFICkyfvrYBFjyB',
  //     workspaceName: `Syed Muhammad Ali Kazmi's workspace`,
  //   };
  //   const objAdmin = {
  //     userRole: 'admin',
  //     workspaceId: 'fEvVwBFICkyfvrYBFjyB',
  //     workspaceName: `Syed Muhammad Ali Kazmi's workspace`,
  //   };
  //   const objMember = {
  //     userRole: 'member',
  //     workspaceId: 'fEvVwBFICkyfvrYBFjyB',
  //     workspaceName: `Syed Muhammad Ali Kazmi's workspace`,
  //   };

  //   console.log('yess');
  //   const ref = firestore
  //     .collection('users')
  //     .where('workspacesList', 'array-contains-any', [
  //       objOwner,
  //       objAdmin,
  //       objMember,
  //     ]);

  //   const snap = await ref.get();
  //   console.log(snap);

  //   snap.forEach((doc) => {
  //     console.log(doc.data());
  //   });

  //   console.log('done');
  // };

  return Object.keys(selectedWorkspaceData).length === 0 ? (
    <Spinner />
  ) : (
    <div className='app-page app-page--layout workspace-settings-page'>
      <div className='app-page-name-section'>
        <h1 className='page-h1'>Workspace Settings</h1>
      </div>
      <div className='list'>
        <div className='list-header'>Workspace: {workspaceName}</div>
        <div className='settings-section'>
          <div className='settings-box'>
            <h2 className='ss-h2'>Company logo</h2>
            <p className='ss-lead'>
              Company logo formats: png, jpg. Max size: 2 MB.
            </p>
            <div className='image-area'>
              <div className='image-wrapper'>
                {selectedWorkspaceData &&
                selectedWorkspaceData.logoURL ? (
                  <div className='image-wrapper'>
                    <img
                      src={selectedWorkspaceData.logoURL}
                      alt='user'
                      className='side-nav-img'
                    />
                  </div>
                ) : (
                  <div className='dp-wrapper'>
                    <div className='dp'>
                      <span>W</span>
                    </div>
                  </div>
                )}
              </div>
              <input
                type='file'
                className='app-btn-white'
                accept='image/x-png,image/jpeg'
                id='upload-logo'
              />
              <button className='app-btn-blue' onClick={handleImage}>
                Upload
              </button>
            </div>
          </div>
          <div className='settings-box w-name'>
            <h2 className='ss-h2'>Customer Number</h2>
            <p className='ss-lead'>This is your customer number.</p>
            <div className='w-name-input-wrapper'>
              <Fragment>
                <p
                  className='input'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '0px',
                  }}
                >
                  <span>{customerNumber ? customerNumber : ''}</span>
                </p>
              </Fragment>
            </div>
          </div>
          <div className='settings-box w-rate'>
            <h2 className='ss-h2'>
              Workspace hourly rate and currency
            </h2>
            <p className='ss-lead'>
              Default value of each billable hour when there’s no user
              or project hourly rate.
            </p>
            <span>
              Current Billable Rate: $
              {selectedWorkspaceData.billableRate}
            </span>
            <input
              type='number'
              className='input'
              placeholder='Enter new billable rate'
              value={bRate}
              onChange={(e) =>
                e.target.value > -1 &&
                setBrate(Number(e.target.value))
              }
            />
            <button
              className='app-btn-white'
              onClick={handleBillableRate}
            >
              Change it
            </button>
          </div>

          <div className='settings-box radio'>
            <h2 className='ss-h2'>Who can create projects</h2>
            <p className='ss-lead'>
              Control how much freedom your team has when categorizing
              their tracked time.
            </p>
            <div className='settings-box-radio-wrapper'>
              <p>
                <input
                  type='radio'
                  id='test1'
                  name='projects'
                  value='admin'
                  checked={whoProjects === 'admin'}
                  onChange={handleWhoProjects}
                />
                <label htmlFor='test1'>Admins</label>
              </p>
              <p>
                <input
                  type='radio'
                  id='test2'
                  name='projects'
                  value='member'
                  checked={whoProjects === 'member'}
                  onChange={handleWhoProjects}
                />
                <label className='ml-05' htmlFor='test2'>
                  Everyone
                </label>
              </p>
            </div>
          </div>

          <div className='settings-box radio'>
            <h2 className='ss-h2'>Who can create clients</h2>
            <p className='ss-lead'>
              Control how much freedom your team has when categorizing
              their tracked time.
            </p>
            <div className='settings-box-radio-wrapper'>
              <p>
                <input
                  type='radio'
                  id='test3'
                  name='clients'
                  value='admin'
                  checked={whoClients === 'admin'}
                  onChange={handlewhoClients}
                />
                <label htmlFor='test3'>Admins</label>
              </p>
              <p>
                <input
                  type='radio'
                  id='test4'
                  name='clients'
                  value='member'
                  checked={whoClients === 'member'}
                  onChange={handlewhoClients}
                />
                <label className='ml-05' htmlFor='test4'>
                  Everyone
                </label>
              </p>
            </div>
          </div>

          <div className='settings-box radio'>
            <h2 className='ss-h2'>Who can create categories</h2>
            <p className='ss-lead'>
              Control how much freedom your team has when categorizing
              their tracked time.
            </p>
            <div className='settings-box-radio-wrapper'>
              <p>
                <input
                  type='radio'
                  id='test5'
                  name='categories'
                  value='admin'
                  checked={whoCategories === 'admin'}
                  onChange={handleWhoCategories}
                />
                <label htmlFor='test5'>Admins</label>
              </p>
              <p>
                <input
                  type='radio'
                  id='test6'
                  name='categories'
                  value='member'
                  checked={whoCategories === 'member'}
                  onChange={handleWhoCategories}
                />
                <label className='ml-05' htmlFor='test6'>
                  Everyone
                </label>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedWorkspaceData: state.workspace.selectedWorkspaceData,
  selectedWorkspace: state.workspace.selectedWorkspace,
});

const mapDispatchToProps = (dispatch) => ({
  updateLogoStart: (payload) => dispatch(updateLogoStart(payload)),
  updateWorkspaceSettingsStart: (payload) =>
    dispatch(updateWorkspaceSettingsStart(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WorkspaceSettings);
