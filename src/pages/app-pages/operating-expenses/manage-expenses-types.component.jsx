import React, { useState } from 'react';
import { Modal } from '@material-ui/core';
import { MdClose, MdDelete } from 'react-icons/md';
import {
  addExpTypeStart,
  removeExpTypeStart,
} from '../../../redux/operating-expenses/operating-expenses.actions';
import { connect } from 'react-redux';
import { isEmpty } from '../../../utils/validateFields';

const ManageExpensesModal = ({
  open,
  handleClose,
  addExpTypeStart,
  selectedWorkspace,
  expTypes,
  removeExpTypeStart,
  userId,
}) => {
  const [expenseName, setExpenseName] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleChange = (e) => {
    setExpenseName(e.target.value);
  };

  const handleSubmit = () => {
    if (!isEmpty(expenseName)) {
      setButtonClicked(true);
      addExpTypeStart({
        expenseName,
        workspaceId: selectedWorkspace.workspaceId,
        createdBy: userId,
      });
      setTimeout(() => {
        setButtonClicked(false);
        setExpenseName('');
      }, 1000);
    }
  };

  const handleDelete = (expTypeId) => {
    removeExpTypeStart(expTypeId);
  };

  return (
    <Modal
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      open={open}
      onClose={handleClose}
    >
      <div className='modal-container'>
        <div className='modal manage-exp-modal'>
          <div className='m-header'>
            <h2>Manage Expense types</h2>
            <MdClose onClick={handleClose} />
          </div>
          <div className='m-body'>
            <div className='add-exp-wrapper'>
              <input
                type='text'
                className='input'
                placeholder='Enter name...'
                value={expenseName}
                onChange={handleChange}
              />
              <button
                className='app-btn-white'
                onClick={handleSubmit}
                disabled={buttonClicked}
              >
                CREATE
              </button>
            </div>
            <div className='expenses-list'>
              <h3>Current Expense types: </h3>
              {expTypes.map((expType) => (
                <div key={expType.expTypeId}>
                  <span>{expType.expenseName}</span>
                  <MdDelete
                    onClick={() => handleDelete(expType.expTypeId)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='m-footer'>
            <p onClick={handleClose}>Cancel</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  selectedWorkspace: state.workspace.selectedWorkspace,
  expTypes: state.opeExp.expTypes,
  userId: state.user.currentUser.userId,
});

const mapDispatchToProps = (dispatch) => ({
  addExpTypeStart: (payload) => dispatch(addExpTypeStart(payload)),
  removeExpTypeStart: (expTypeId) =>
    dispatch(removeExpTypeStart(expTypeId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageExpensesModal);
