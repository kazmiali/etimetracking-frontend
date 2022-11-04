import React from 'react';
import TimeSheetEntry from '../../timetracker/timesheet/timesheet-entry.component';

import '../../timetracker/timetracker.styles.scss';

const EmployeesEntriesList = ({
  timeEntries,
  selectedWorkspace,
  totalDurationObj: { h, m, s },
  totalbillableHours,
  billableRate,
  clientFilter,
  categoryFilter,
  projectFilter,
  filterItems,
}) => (
  <div className='timesheet'>
    <div className='ts-header'>
      <p className='date'>{`Total: ${h}:${m}:${s}`}</p>
      <p className='date'>{`Billable: ${totalbillableHours.h}:${totalbillableHours.m}:${totalbillableHours.s}`}</p>
      <p className='date'>
        Amount: {totalbillableHours.h * billableRate} USD
      </p>
    </div>
    <div className='ts-list'>
      {timeEntries
        .filter((item) => {
          return filterItems(
            item,
            clientFilter,
            categoryFilter,
            projectFilter,
          );
        })
        .map((entry) => (
          <TimeSheetEntry
            entry={entry}
            key={entry.timeEntryId}
            selectedWorkspace={selectedWorkspace}
          />
        ))}
    </div>
  </div>
);

export default EmployeesEntriesList;
