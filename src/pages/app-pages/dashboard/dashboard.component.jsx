import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';

import BarChart from './dashboard-bar-chart.component';
import PieChart from './dashboard-pie-chart.component';

import { fetchTimeEntriesStart } from '../../../redux/time-entry/time-entry.actions';

import 'react-datepicker/dist/react-datepicker.css';
import './dashboard.styles.scss';

const Dashboard = ({
  currentUser,
  selectedWorkspace,
  selectedWorkspaceData,
  caTimeEntries,
  timeEntries,
  fetchTimeEntriesStart,
}) => {
  var beforeWeek = new Date();
  beforeWeek.setDate(beforeWeek.getDate() - 7);
  var afterWeek = new Date();
  afterWeek.setDate(afterWeek.getDate() + 1);
  const [startDate, setStartDate] = useState(beforeWeek);
  const [endDate, setEndDate] = useState(afterWeek);

  useEffect(() => {
    if (selectedWorkspace.workspaceId) {
      if (
        selectedWorkspace.userRole === 'admin' ||
        selectedWorkspace.userRole === 'owner'
      ) {
        fetchTimeEntriesStart({
          workspaceId: selectedWorkspace.workspaceId,
          path: 'caTimeEntries',
          start: startDate.toISOString().split('T')[0],
          end: endDate.toISOString().split('T')[0],
        });
        fetchTimeEntriesStart({
          workspaceId: selectedWorkspace.workspaceId,
          path: 'timeEntries',
          start: startDate.toISOString().split('T')[0],
          end: endDate.toISOString().split('T')[0],
        });
      } else if (selectedWorkspace.userRole === 'member') {
        fetchTimeEntriesStart({
          workspaceId: selectedWorkspace.workspaceId,
          userId: currentUser.userId,
          path: 'caTimeEntries',
          start: startDate.toISOString().split('T')[0],
          end: endDate.toISOString().split('T')[0],
        });
        fetchTimeEntriesStart({
          workspaceId: selectedWorkspace.workspaceId,
          userId: currentUser.userId,
          path: 'timeEntries',
          start: startDate.toISOString().split('T')[0],
          end: endDate.toISOString().split('T')[0],
        });
      }
    }
  }, [selectedWorkspace]);

  const handleStartDate = (date) => {
    setStartDate(date);
    if (
      selectedWorkspace.userRole === 'admin' ||
      selectedWorkspace.userRole === 'owner'
    ) {
      fetchTimeEntriesStart({
        workspaceId: selectedWorkspace.workspaceId,
        path: 'caTimeEntries',
        start: date.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0],
      });
      fetchTimeEntriesStart({
        workspaceId: selectedWorkspace.workspaceId,
        path: 'timeEntries',
        start: date.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0],
      });
    } else if (selectedWorkspace.userRole === 'member') {
      fetchTimeEntriesStart({
        workspaceId: selectedWorkspace.workspaceId,
        userId: currentUser.userId,
        path: 'caTimeEntries',
        start: date.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0],
      });
      fetchTimeEntriesStart({
        workspaceId: selectedWorkspace.workspaceId,
        userId: currentUser.userId,
        path: 'timeEntries',
        start: date.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0],
      });
    }
  };

  const handleEndDate = (date) => {
    setEndDate(date);
    if (
      selectedWorkspace.userRole === 'admin' ||
      selectedWorkspace.userRole === 'owner'
    ) {
      fetchTimeEntriesStart({
        workspaceId: selectedWorkspace.workspaceId,
        path: 'caTimeEntries',
        start: startDate.toISOString().split('T')[0],
        end: date.toISOString().split('T')[0],
      });
      fetchTimeEntriesStart({
        workspaceId: selectedWorkspace.workspaceId,
        path: 'timeEntries',
        start: startDate.toISOString().split('T')[0],
        end: date.toISOString().split('T')[0],
      });
    } else if (selectedWorkspace.userRole === 'member') {
      fetchTimeEntriesStart({
        workspaceId: selectedWorkspace.workspaceId,
        userId: currentUser.userId,
        path: 'caTimeEntries',
        start: startDate.toISOString().split('T')[0],
        end: date.toISOString().split('T')[0],
      });
      fetchTimeEntriesStart({
        workspaceId: selectedWorkspace.workspaceId,
        userId: currentUser.userId,
        path: 'timeEntries',
        start: startDate.toISOString().split('T')[0],
        end: date.toISOString().split('T')[0],
      });
    }
  };

  return (
    <div className='app-page app-page--layout dashboard-page'>
      <div className='app-page-name-section'>
        <h1 className='page-h1'>Dashboard</h1>
        <div className='time-range-container'>
          <span>Time Range:</span>
          <DatePicker
            selected={startDate}
            onChange={(date) => handleStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => handleEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </div>
      </div>
      {Object.keys(selectedWorkspaceData).length !== 0 ? (
        <BarChart
          selectedWorkspaceData={selectedWorkspaceData}
          caTimeEntries={caTimeEntries}
          timeEntries={timeEntries}
          startDate={startDate}
          endDate={endDate}
        />
      ) : null}
      {/* <PieChart /> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  selectedWorkspace: state.workspace.selectedWorkspace,
  selectedWorkspaceData: state.workspace.selectedWorkspaceData,
  caTimeEntries: state.timeEntry.caTimeEntries,
  timeEntries: state.timeEntry.timeEntries,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTimeEntriesStart: (payload) =>
    dispatch(fetchTimeEntriesStart(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
