import React, { useState, useEffect, Fragment } from 'react';
import { Modal, ClickAwayListener } from '@material-ui/core';
import { MdClose } from 'react-icons/md';

import OperatingExpensesEntry from '../../pages/app-pages/operating-expenses/operating-expenses-list/operating-expenses-entry.component';

import './add-operational-exp.styles.scss';

const AddOperationalExpenses = ({
  open,
  handleClose,
  watchOnly,
  opeExps,
  OE,
  setOE,
}) => {
  const [allOE, setAllOE] = useState(opeExps);
  const [selectedOE, setSelectedOE] = useState([]);

  useEffect(() => {
    setAllOE(opeExps);
  }, [opeExps]);

  const handleAdd = (item) => {
    if (watchOnly) {
      return;
    }

    setSelectedOE([...selectedOE, item]);
    setOE([...OE, item]);

    const itemRemoveArray = allOE.filter((element) => {
      return element.opeExpId !== item.opeExpId;
    });

    setAllOE(itemRemoveArray);
  };

  const handleRemove = (item) => {
    if (watchOnly) {
      return;
    }

    const itemRemoveArray = selectedOE.filter((element) => {
      return element.opeExpId !== item.opeExpId;
    });

    setSelectedOE(itemRemoveArray);
    setOE(itemRemoveArray);

    setAllOE([...allOE, item]);
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
              <h2>Select Operational Expenses</h2>
              <MdClose onClick={handleClose} />
            </div>
            <div className='m-body m-body-aoe'>
              {selectedOE.length > 0 ? (
                <Fragment>
                  <h2 className='ss-h2 mt-1'>
                    Selected Operational Expenses
                  </h2>
                  <p className='ss-lead mb-1'>
                    Click to remove selected expenses.
                  </p>
                  <div className='list aoe-list'>
                    <div className='list-sub-header d-none-992'>
                      <p className='amount'>Amount</p>
                      <p className='exp-type'>Expense Type</p>
                      <p className='note'>Note</p>
                    </div>
                    {!watchOnly &&
                      selectedOE.map((item, i) => (
                        <OperatingExpensesEntry
                          opeExp={item}
                          key={i}
                          handleClick={handleRemove}
                        />
                      ))}
                  </div>
                </Fragment>
              ) : null}

              <h2 className='ss-h2 mt-1'>
                {watchOnly
                  ? 'Operational Expenses'
                  : 'All Operational Expenses'}
              </h2>
              <p className='ss-lead mb-1'>
                {watchOnly
                  ? 'Here you see the added operational expenses'
                  : 'Click to add operating expenses to your time entry'}
              </p>
              <div className='list aoe-list'>
                <div className='list-sub-header d-none-992'>
                  <p className='amount'>Amount</p>
                  <p className='exp-type'>Expense Type</p>
                  <p className='note'>Note</p>
                </div>
                {allOE &&
                  allOE.map((item, i) => (
                    <OperatingExpensesEntry
                      opeExp={item}
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

export default AddOperationalExpenses;
