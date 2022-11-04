import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { linearAlertBottom } from '../../../../utils/swalMixins';
import { connect } from 'react-redux';

const OperatingExpensesEntry = ({
  opeExp,
  handleClick,
  removeOpeExpStart,
  selectedWorkspace,
}) => {
  const checkFuncAvailable = () => {
    if (handleClick) {
      handleClick(opeExp);
    }
  };

  const handleDelete = (opeExpId) => {
    if (selectedWorkspace.userRole === 'member') {
      linearAlertBottom.fire({
        icon: 'warning',
        title: 'Only admins can delete',
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          removeOpeExpStart(opeExpId);
        }
      });
    }
  };

  return (
    <div
      className='list-entry operational-exp-entry'
      onClick={checkFuncAvailable}
    >
      <div className='amount'>
        <p>
          <span className='d-992'>Amount: </span> {opeExp.amount}
        </p>
      </div>
      <div className='exp-type'>
        <p>
          <span className='d-992'> Expense Type:</span>{' '}
          {opeExp.expType.expenseName}
        </p>
      </div>
      <div className='note'>
        <p>{opeExp.note}</p>
      </div>

      <div className='dlt'>
        <AiOutlineDelete
          onClick={() => handleDelete(opeExp.opeExpId)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedWorkspace: state.workspace.selectedWorkspace,
});

export default connect(mapStateToProps)(OperatingExpensesEntry);
