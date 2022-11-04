import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { fetchTimeEntriesStart } from '../../../redux/time-entry/time-entry.actions';

import FilterBar from './report-filter-bar/report-filter-bar.component';
import EmployeesEntriesList from './report-list/report-list.component';

import { filterReportArr } from '../../../utils/filterReportArr';

import 'react-datepicker/dist/react-datepicker.css';
import './report.styles.scss';

const Report = ({
  selectedWorkspace,
  fetchTimeEntriesStart,
  selectedWorkspaceData,
  timeEntries,
  currentUser,
}) => {
  var beforeWeek = new Date();
  beforeWeek.setDate(beforeWeek.getDate() - 7);
  var afterWeek = new Date();
  afterWeek.setDate(afterWeek.getDate() + 1);
  const [totalDurationObj, setDur] = useState({ h: 0, m: 0, s: 0 });
  const [totalbillableHours, setBil] = useState({ h: 0, m: 0, s: 0 });
  const [startDate, setStartDate] = useState(beforeWeek);
  const [endDate, setEndDate] = useState(afterWeek);
  const [clientFilter, setClientFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');

  useEffect(() => {
    if (selectedWorkspace.workspaceId) {
      if (
        selectedWorkspace.userRole === 'admin' ||
        selectedWorkspace.userRole === 'owner'
      ) {
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
        path: 'timeEntries',
        start: date.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0],
      });
    } else if (selectedWorkspace.userRole === 'member') {
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
        path: 'timeEntries',
        start: startDate.toISOString().split('T')[0],
        end: date.toISOString().split('T')[0],
      });
    } else if (selectedWorkspace.userRole === 'member') {
      fetchTimeEntriesStart({
        workspaceId: selectedWorkspace.workspaceId,
        userId: currentUser.userId,
        path: 'timeEntries',
        start: startDate.toISOString().split('T')[0],
        end: date.toISOString().split('T')[0],
      });
    }
  };

  const handleClientFilter = (e) => {
    setClientFilter(e.target.value);
    setCategoryFilter('');
    setProjectFilter('');
  };

  const handleCategoryFilter = (e) => {
    setClientFilter('');
    setCategoryFilter(e.target.value);
    setProjectFilter('');
  };

  const handleProjectFilter = (e) => {
    setClientFilter('');
    setCategoryFilter('');
    setProjectFilter(e.target.value);
  };

  return (
    <div className='app-page app-page--layout report-page'>
      <div className='app-page-name-section'>
        <h1 className='page-h1'>Detailed Report</h1>

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
      <FilterBar
        timeEntries={timeEntries}
        selectedWorkspace={selectedWorkspace}
        setDur={setDur}
        setBil={setBil}
        totalDurationObj={totalDurationObj}
        totalbillableHours={totalbillableHours}
        billableRate={selectedWorkspaceData.billableRate}
        handleClientFilter={handleClientFilter}
        handleCategoryFilter={handleCategoryFilter}
        handleProjectFilter={handleProjectFilter}
        clientFilter={clientFilter}
        categoryFilter={categoryFilter}
        projectFilter={projectFilter}
        filterItems={filterReportArr}
      />
      <EmployeesEntriesList
        timeEntries={timeEntries}
        selectedWorkspace={selectedWorkspace}
        totalDurationObj={totalDurationObj}
        totalbillableHours={totalbillableHours}
        billableRate={selectedWorkspaceData.billableRate}
        clientFilter={clientFilter}
        categoryFilter={categoryFilter}
        projectFilter={projectFilter}
        filterItems={filterReportArr}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  selectedWorkspace: state.workspace.selectedWorkspace,
  selectedWorkspaceData: state.workspace.selectedWorkspaceData,
  timeEntries: state.timeEntry.timeEntries,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTimeEntriesStart: (payload) =>
    dispatch(fetchTimeEntriesStart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Report);
