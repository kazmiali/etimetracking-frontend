import React from 'react';
import TimeSheetEntry from '../../charges-aquisition/ca-timesheet/ca-timesheet-entry.component';

import '../../charges-aquisition/charges-aquisition.styles.scss';

const EmployeesEntriesList = ({
  timeEntries,
  selectedWorkspace,
  totalDurationObj: { h, m, s },
  clientFilter,
  categoryFilter,
  projectFilter,
  filterItems,
  totalOpeExps,
  totalMatExps,
}) => (
  <div className='timesheet'>
    <div className='ca-ts-header'>
      <p className='date'>{`Total: ${h}:${m}:${s}`}</p>
      <p className='date'>{`Operating Expense: ${totalOpeExps} USD`}</p>
      <p className='date'>{`Material Expense: ${totalMatExps} USD`}</p>

      <p className='date'>
        Amount: {totalOpeExps + totalOpeExps} USD
      </p>
    </div>
    <div className='ca-ts-list'>
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
