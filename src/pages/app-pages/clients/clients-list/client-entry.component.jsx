import React from 'react';
import Swal from 'sweetalert2';
import { FaAngleDown } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { connect } from 'react-redux';
import { removeClientStart } from '../../../../redux/project-and-client/project-and-client.actions';
import { linearAlertBottom } from '../../../../utils/swalMixins';

const ClientEntry = ({
  client: {
    clientId,
    clientName,
    clientNumber,
    clientAddress,
    clientPhoneNumber,
  },
  removeClientStart,
  selectedWorkspace,
}) => {
  const [showDetail, setShowDetail] = React.useState(false);

  const toggleShowDetail = () => {
    setShowDetail(!showDetail);
  };

  const handleDelete = (clientId) => {
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
          removeClientStart(clientId);
        }
      });
    }
  };

  return (
    <div className='member-entry list-entry'>
      <div className='entry-title'>
        <p>{clientName}</p>
      </div>

      <div className='entry-inactive-btn entry-dropdown-btn'>
        <span onClick={toggleShowDetail}>
          <FaAngleDown />
        </span>
      </div>
      <div className={`${showDetail ? 'member-details' : 'd-none'}`}>
        <div className='row'>
          <div className='property'>
            <p>Client #:</p>
          </div>

          <div className='value'>
            <p>{clientNumber}</p>
          </div>
        </div>

        <div className='row'>
          <div className='property'>
            <p>Address:</p>
          </div>

          <div className='value'>
            <p>{clientAddress}</p>
          </div>
        </div>
        <div className='row'>
          <div className='property'>
            <p>Phone Number:</p>
          </div>
          <div className='value'>
            <p>{clientPhoneNumber}</p>
          </div>
        </div>
        <div className='row'>
          <div className='property'>
            <p>Delete:</p>
          </div>

          <div className='value'>
            <button
              className='app-btn-blue'
              onClick={() => handleDelete(clientId)}
            >
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedWorkspace: state.workspace.selectedWorkspace,
});

const mapDispatchToProps = (dispatch) => ({
  removeClientStart: (clientId) =>
    dispatch(removeClientStart(clientId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientEntry);
