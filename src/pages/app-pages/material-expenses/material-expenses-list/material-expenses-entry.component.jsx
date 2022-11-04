import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { linearAlertBottom } from '../../../../utils/swalMixins';
import { connect } from 'react-redux';

const MaterialExpensesEntry = ({
  matExp,
  handleClick,
  removeMatExpStart,
  selectedWorkspace,
}) => {
  const checkFuncAvailable = () => {
    if (handleClick) {
      handleClick(matExp);
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
          removeMatExpStart(opeExpId);
        }
      });
    }
  };

  return (
    <div
      className='list-entry operational-exp-entry'
      onClick={checkFuncAvailable}
    >
      <div className='name'>
        <p>
          <span className='d-992'>Name: </span> {matExp.materialName}
        </p>
      </div>
      <div className='quantity'>
        <p>
          <span className='d-992'> Quantity:</span> {matExp.quantity}
        </p>
      </div>
      <div className='ppu'>
        <p>
          <span className='d-992'> Price per unit:</span>{' '}
          {matExp.pricePerUnit}
        </p>
      </div>
      <div className='total'>
        <p>
          <span className='d-992'> Total:</span>{' '}
          {matExp.pricePerUnit * matExp.quantity}
        </p>
      </div>
      <div className='dlt'>
        <AiOutlineDelete
          onClick={() => handleDelete(matExp.matExpId)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedWorkspace: state.workspace.selectedWorkspace,
});

export default connect(mapStateToProps)(MaterialExpensesEntry);
