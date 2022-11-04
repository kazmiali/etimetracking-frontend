import React from 'react';
import TimeSheetEntry from './ca-timesheet-entry.component';

const TimeSheet = ({ caTimeEntries, selectedWorkspace }) => {
  return (
    <div className='timesheet'>
      <div className='ca-ts-header'>
        <p className='date'>Charges aquisition entries</p>
      </div>
      <div className='ca-ts-list'>
        {caTimeEntries.map((entry) => (
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
