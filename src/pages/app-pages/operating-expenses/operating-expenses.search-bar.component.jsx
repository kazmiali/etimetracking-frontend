import React, { useState } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';
import { linearAlertBottom } from '../../../utils/swalMixins';

const OperatingExpensesSearchBar = ({
  expTypes,
  selectedWorkspace,
  addOpeExpStart,
  userId,
}) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [selectedExpType, setSelectedExpType] = useState({});
  const [opeExpData, setOpeExpData] = useState({
    note: '',
    amount: '',
  });

  const handleChange = (e) => {
    setOpeExpData({ ...opeExpData, [e.target.name]: e.target.value });
  };

  const handleExpType = (e) => {
    if (e.target.value === '') {
      setSelectedExpType({});
    } else {
      const selectedClient = expTypes.filter(
        (expType) => e.target.value === expType.expenseName,
      );
      setSelectedExpType(selectedClient[0]);
    }
  };

  const handleSubmit = () => {
    if (opeExpData.note !== '' && opeExpData.amount !== 0) {
      if (Object.keys(selectedExpType).length === 0) {
        linearAlertBottom.fire({
          icon: 'warning',
          title: 'Please select expense type',
        });
      } else {
        const opeExpObj = {
          ...opeExpData,
          expType: { ...selectedExpType },
          workspaceId: selectedWorkspace.workspaceId,
          createdBy: userId,
        };
        setButtonClicked(true);
        addOpeExpStart(opeExpObj);
        setTimeout(() => {
          setButtonClicked(false);
          setOpeExpData({
            note: '',
            amount: '',
          });
          setSelectedExpType({});
        }, 800);
      }
    } else {
      linearAlertBottom.fire({
        icon: 'warning',
        title: 'Please fill out the fields',
      });
    }
  };

  return (
    <div className='p-search-bar'>
      <input
        type='text'
        placeholder='Write Note'
        className='input input-note'
        name='note'
        value={opeExpData.note}
        onChange={handleChange}
      />
      <div className='styled-select sort-by'>
        <select onChange={handleExpType}>
          <option value=''>Select Expense Type</option>
          {expTypes.map((expType) => (
            <option
              value={expType.expenseName}
              key={expType.expTypeId}
            >
              {expType.expenseName}
            </option>
          ))}
        </select>
        <TiArrowSortedDown className='fa fa-sort-desc' />
      </div>
      <input
        type='number'
        placeholder='Amount'
        className='input input-price-unit'
        name='amount'
        value={opeExpData.amount}
        onChange={handleChange}
      />

      <button
        className='app-btn-blue'
        onClick={handleSubmit}
        disabled={buttonClicked}
      >
        Add
      </button>
    </div>
  );
};

export default OperatingExpensesSearchBar;
