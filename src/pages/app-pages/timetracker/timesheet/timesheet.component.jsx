import React from 'react';
import TimeSheetEntry from './timesheet-entry.component';

const TimeSheet = ({ timeEntries, selectedWorkspace }) => {
  return (
    <div className='timesheet'>
      <div className='ts-header'>
        <p className='date'>Your time entries</p>

        {/* <p className='total-time'>Total 7:38:00</p> */}
      </div>
      <div className='ts-list'>
        {timeEntries.map((entry) => (
          <TimeSheetEntry
            entry={entry}
            key={entry.timeEntryId}
            selectedWorkspace={selectedWorkspace}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeSheet;
