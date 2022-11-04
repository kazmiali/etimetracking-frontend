import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiMonitor } from 'react-icons/fi';
import { GoProject, GoOrganization, GoPerson } from 'react-icons/go';
import {
  MdDashboard,
  MdInfoOutline,
  MdSettings,
  MdPayment,
} from 'react-icons/md';
import { FaTools, FaMoneyBill, FaRegClock } from 'react-icons/fa';

const NavLinks = ({ selectedWorkspace, selectedWorkspaceData }) => {
  // These functions will check the role of the user and act accordingly
  const checkRoleProjects = () => {
    if (selectedWorkspaceData.whoProjects === 'admin') {
      if (
        selectedWorkspace.userRole === 'admin' ||
        selectedWorkspace.userRole === 'owner'
      ) {
        return (
          <Link className='side-nav-item' to='/app/projects'>
            <GoProject className='side-nav-item-icon' />
            <span className='side-nav-item-name'>PROJECTS</span>
          </Link>
        );
      }
    } else if (selectedWorkspaceData.whoProjects === 'member') {
      return (
        <Link className='side-nav-item' to='/app/projects'>
          <GoProject className='side-nav-item-icon' />
          <span className='side-nav-item-name'>PROJECTS</span>
        </Link>
      );
    }
  };

  const checkRoleCategories = () => {
    if (selectedWorkspaceData.whoCategories === 'admin') {
      if (
        selectedWorkspace.userRole === 'admin' ||
        selectedWorkspace.userRole === 'owner'
      ) {
        return (
          <Link className='side-nav-item' to='/app/categories'>
            <img
              src={require('../../assets/icons/timetracker/tag.png')}
              className='side-nav-item-icon'
              alt='icon'
            />
            <span className='side-nav-item-name'>CATEGORIES</span>
          </Link>
        );
      }
    } else if (selectedWorkspaceData.whoCategories === 'member') {
      return (
        <Link className='side-nav-item' to='/app/categories'>
          <img
            src={require('../../assets/icons/timetracker/tag.png')}
            className='side-nav-item-icon'
            alt='icon'
          />
          <span className='side-nav-item-name'>CATEGORIES</span>
        </Link>
      );
    }
  };

  const checkRoleClients = () => {
    if (selectedWorkspaceData.whoClients === 'admin') {
      if (
        selectedWorkspace.userRole === 'admin' ||
        selectedWorkspace.userRole === 'owner'
      ) {
        return (
          <Link className='side-nav-item' to='/app/clients'>
            <GoPerson className='side-nav-item-icon' />
            <span className='side-nav-item-name'>CLIENTS</span>
          </Link>
        );
      }
    } else if (selectedWorkspaceData.whoClients === 'member') {
      return (
        <Link className='side-nav-item' to='/app/clients'>
          <GoPerson className='side-nav-item-icon' />
          <span className='side-nav-item-name'>CLIENTS</span>
        </Link>
      );
    }
  };

  return (
    <Fragment>
      <Link className='side-nav-item' to='/app'>
        <FaRegClock className='side-nav-item-icon' />
        <span className='side-nav-item-name'>TIME TRACKER</span>
      </Link>
      <Link className='side-nav-item' to='/app/dashboard'>
        <MdDashboard className='side-nav-item-icon' />
        <span className='side-nav-item-name'>DASHBOARD</span>
      </Link>
      <Link className='side-nav-item' to='/app/report'>
        <MdInfoOutline className='side-nav-item-icon' />
        <span className='side-nav-item-name'>REPORT</span>
      </Link>
      <Link className='side-nav-item' to='/app/team'>
        <GoOrganization className='side-nav-item-icon' />
        <span className='side-nav-item-name'>TEAM</span>
      </Link>

      {checkRoleProjects()}

      {checkRoleClients()}

      {checkRoleCategories()}

      <Link className='side-nav-item' to='/app/workspaces'>
        <FiMonitor className='side-nav-item-icon' />
        <span className='side-nav-item-name'>WORKSPACES</span>
      </Link>

      {selectedWorkspace.userRole === 'admin' ||
        (selectedWorkspace.userRole === 'owner' && (
          <Link
            className='side-nav-item'
            to='/app/workspace-settings/'
          >
            <MdSettings className='side-nav-item-icon' />
            <span className='side-nav-item-name'>
              WORKSPACE SETTINGS
            </span>
          </Link>
        ))}

      <Link className='side-nav-item' to='/app/charges-aquisition'>
        <FaMoneyBill className='side-nav-item-icon' />
        <span className='side-nav-item-name'>CHARGES AQUISITION</span>
      </Link>
      <Link className='side-nav-item' to='/app/ca-report'>
        <MdInfoOutline className='side-nav-item-icon' />
        <span className='side-nav-item-name'>CHARGES REPORT</span>
      </Link>
      <Link className='side-nav-item' to='/app/operating-expenses/'>
        <img
          src={require('../../assets/icons/clock.png')}
          className='side-nav-item-icon'
          alt='icon'
        />
        <span className='side-nav-item-name'>OPERATING EXPENSES</span>
      </Link>
      <Link className='side-nav-item' to='/app/material-expenses/'>
        <FaTools className='side-nav-item-icon' />
        <span className='side-nav-item-name'>MATERIAL EXPENSES</span>
      </Link>
      <Link className='side-nav-item' to='/subscription'>
        <MdPayment className='side-nav-item-icon' />
        <span className='side-nav-item-name'>SUBSCRIPTION PLAN</span>
      </Link>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  selectedWorkspace: state.workspace.selectedWorkspace,
  selectedWorkspaceData: state.workspace.selectedWorkspaceData,
});

export default connect(mapStateToProps)(NavLinks);
