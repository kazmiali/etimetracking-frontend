import React from 'react';
import OperatingExpensesEntry from './operating-expenses-entry.component';

const OperatingExpensesList = ({ opeExps, removeOpeExpStart }) => {
  return (
    <div className='list'>
      <div className='list-header'>YOUR OPERATIONAL EXPENSES</div>
      <div className='list-sub-header d-none-992'>
        <p className='amount'>Amount</p>
        <p className='exp-type'>Expense Type</p>
        <p className='note'>Note</p>
      </div>
      {opeExps.map((opeExp) => (
        <OperatingExpensesEntry
          opeExp={opeExp}
          key={opeExp.opeExpId}
          removeOpeExpStart={removeOpeExpStart}
        />
      ))}
    </div>
  );
};

export default OperatingExpensesList;
