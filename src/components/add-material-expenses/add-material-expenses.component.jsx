import React, { useState, useEffect, Fragment } from 'react';
import { Modal, ClickAwayListener } from '@material-ui/core';
import { MdClose } from 'react-icons/md';

import MaterialExpensesEntry from '../../pages/app-pages/material-expenses/material-expenses-list/material-expenses-entry.component';

import './add-material-expenses.styles.scss';

const AddMaterialExpenses = ({
  open,
  handleClose,
  watchOnly,
  matExps,
  ME,
  setME,
}) => {
  const [allME, setAllME] = useState(matExps);
  const [selectedME, setSelectedME] = useState([]);

  useEffect(() => {
    setAllME(matExps);
  }, [matExps]);

  const handleAdd = (item) => {
    if (watchOnly) {
      return;
    }
    setSelectedME([...selectedME, item]);
    setME([...ME, item]);

    const itemRemoveArray = allME.filter((element) => {
      return element.matExpId !== item.matExpId;
    });

    setAllME(itemRemoveArray);
  };

  const handleRemove = (item) => {
    if (watchOnly) {
      return;
    }
    const itemRemoveArray = selectedME.filter((element) => {
      return element.matExpId !== item.matExpId;
    });

    setSelectedME(itemRemoveArray);
    setME(itemRemoveArray);

    setAllME([...allME, item]);
  };

  return (
    <Modal
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      open={open}
      onClose={handleClose}
    >
      <div className='modal-container'>
        <ClickAwayListener onClickAway={handleClose}>
          <div className='modal add-me-modal'>
            <div className='m-header'>
              <h2>Select Material Expenses</h2>
              <MdClose onClick={handleClose} />
            </div>
            <div className='m-body m-body-ame'>
              {selectedME.length > 0 ? (
                <Fragment>
                  <h2 className='ss-h2 mt-1'>
                    Selected Material Expenses
                  </h2>
                  <p className='ss-lead mb-1'>
                    Click to remove selected expenses.
                  </p>
                  <div className='list'>
                    <div className='list-sub-header d-none-992'>
                      <p className='name'>Name</p>
                      <p className='quantity'>Quantity</p>
                      <p className='ppu'>Price per unit</p>
                      <p className='total'>Total</p>
                    </div>
                    {!watchOnly &&
                      selectedME.map((item, i) => (
                        <MaterialExpensesEntry
                          matExp={item}
                          key={i}
                          handleClick={handleRemove}
                        />
                      ))}
                  </div>
                </Fragment>
              ) : null}

              <h2 className='ss-h2 mt-1'>
                {watchOnly
                  ? 'Material Expenses'
                  : 'All Material Expenses'}
              </h2>
              <p className='ss-lead mb-1'>
                {watchOnly
                  ? 'Here you see the added material expenses'
                  : 'Click to add material expenses to your time entry'}
              </p>
              <div className='list'>
                <div className='list-sub-header d-none-992'>
                  <p className='name'>Name</p>
                  <p className='quantity'>Quantity</p>
                  <p className='ppu'>Price per unit</p>
                  <p className='total'>Total</p>
                </div>
                {allME &&
                  allME.map((item, i) => (
                    <MaterialExpensesEntry
                      matExp={item}
                      key={i}
                      handleClick={handleAdd}
                    />
                  ))}
              </div>
            </div>
            <div className='m-footer'>
              <p onClick={handleClose}>Close</p>
            </div>
          </div>
        </ClickAwayListener>
      </div>
    </Modal>
  );
};

export default AddMaterialExpenses;
