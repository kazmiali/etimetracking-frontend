import React, { useState } from 'react';
import { linearAlertBottom } from '../../../utils/swalMixins';

const MaterialExpensesSearchBar = ({
  selectedWorkspace,
  addMatExpStart,
  userId,
}) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [matExpData, setMatExpData] = useState({
    materialName: '',
    pricePerUnit: '',
    quantity: '',
  });

  const handleChange = (e) => {
    setMatExpData({ ...matExpData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      matExpData.materialName !== '' &&
      matExpData.pricePerUnit !== 0 &&
      matExpData.quantity !== 0
    ) {
      const matExpObj = {
        ...matExpData,
        workspaceId: selectedWorkspace.workspaceId,
        createdBy: userId,
      };
      setButtonClicked(true);
      addMatExpStart(matExpObj);
      setTimeout(() => {
        setButtonClicked(false);
        setMatExpData({
          materialName: '',
          pricePerUnit: '',
          quantity: '',
        });
      }, 800);
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
        placeholder='Write Material'
        className='input input-note'
        name='materialName'
        value={matExpData.materialName}
        onChange={handleChange}
      />
      <input
        type='number'
        placeholder='Price per unit'
        className='input input-price-unit'
        name='pricePerUnit'
        value={matExpData.pricePerUnit}
        onChange={handleChange}
      />
      <input
        type='number'
        placeholder='Quantity'
        className='input input-write-note'
        name='quantity'
        value={matExpData.quantity}
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

export default MaterialExpensesSearchBar;
