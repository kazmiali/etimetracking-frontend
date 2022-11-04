import React from 'react';
import MaterialExpensesEntry from './material-expenses-entry.component';

const MaterialExpensesList = ({ matExps, removeMatExpStart }) => {
  return (
    <div className='list'>
      <div className='list-header'>YOUR MATERIAL EXPENSES</div>
      <div className='list-sub-header d-none-992'>
        <p className='name'>Name</p>
        <p className='quantity'>Quantity</p>
        <p className='ppu'>Price per unit</p>
        <p className='total'>Total</p>
      </div>
      {matExps.map((matExp) => (
        <MaterialExpensesEntry
          matExp={matExp}
          removeMatExpStart={removeMatExpStart}
          key={matExp.matExpId}
        />
      ))}
    </div>
  );
};

export default MaterialExpensesList;
