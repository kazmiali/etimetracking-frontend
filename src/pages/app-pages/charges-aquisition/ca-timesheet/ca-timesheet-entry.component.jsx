import React, { useState } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import { FaCircle, FaAngleDown } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdImages } from 'react-icons/io';

import { convertTimeStampToGivenFormat } from '../../../../utils/convertTimeStampToGivenFormat';
import { linearAlertBottom } from '../../../../utils/swalMixins';

import { removeTimeEntryStart } from '../../../../redux/time-entry/time-entry.actions';

import EntryImagesModal from '../../../../components/entry-images-modal/entry-images-modal.component';
import EntryCategoriesPopover from '../../../../components/entry-categories-popover/entry-categories-popover.component';
import AddOperationalExpenses from '../../../../components/add-operational-expenses/add-operational-expenses.component';
import AddMaterialExpenses from '../../../../components/add-material-expenses/add-material-expenses.component';

const TimeSheetEntry = ({
  entry,
  removeTimeEntryStart,
  selectedWorkspace,
}) => {
  const [open, setOpen] = useState(false);
  const [addOpExpOpen, setAddOpExpOpen] = useState(false);
  const [addMatExpOpen, setAddMatExpOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpExpOpen = () => {
    setAddOpExpOpen(true);
  };

  const handleOpExpClose = () => {
    setAddOpExpOpen(false);
  };

  const handleMatExpOpen = () => {
    setAddMatExpOpen(true);
  };

  const handleMatExpClose = () => {
    setAddMatExpOpen(false);
  };

  const handleDelete = () => {
    if (selectedWorkspace.userRole !== 'owner') {
      linearAlertBottom.fire({
        icon: 'warning',
        title: 'Only owner can delete it',
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
          removeTimeEntryStart({
            entryId: entry.timeEntryId,
            path: 'caTimeEntries',
          });
        }
      });
    }
  };

  return (
    <div className='ca-ts-entry'>
      <div className='entry-title'>
        <p>{entry.entryNote}</p>
        <div className='entry-tag'>
          <FaCircle className='round' />{' '}
          {Object.keys(entry.project).length !== 0
            ? `${
                entry.project.projectName && entry.project.projectName
              } - ${
                Object.keys(entry.project.projectClient).length !== 0
                  ? entry.project.projectClient.clientName
                  : 'No Client'
              }`
            : 'No Project'}
        </div>
      </div>
      <EntryCategoriesPopover categories={entry.categories} />
      <div className='entry-images' onClick={handleOpen}>
        <IoMdImages />
      </div>

      <div className='see-exp' onClick={handleMatExpOpen}>
        <span>Material Expenses</span>
        <FaAngleDown />
      </div>

      <div className='see-exp' onClick={handleOpExpOpen}>
        <span>Operation Expenses</span>
        <FaAngleDown />
      </div>

      <div className='entry-timeline'>
        <input
          type='text'
          name=''
          value={convertTimeStampToGivenFormat(
            entry.startTime,
            'hh:mm A',
          )}
        />
        <span>-</span>
        <input
          type='text'
          name=''
          value={convertTimeStampToGivenFormat(
            entry.endTime,
            'hh:mm A',
          )}
        />
      </div>

      <div className='entry-date'>
        <p style={{ width: '100%' }}>
          {convertTimeStampToGivenFormat(
            entry.startTime,
            'DD-MM-YYYY',
          )}
        </p>
      </div>

      <div className='entry-total-time'>
        <p>
          {convertTimeStampToGivenFormat(
            entry.totalTime,
            'HH:mm:ss',
            true,
          )}
        </p>
      </div>

      <div className='entry-delete'>
        <AiOutlineDelete
          className='entry-delete-icon'
          onClick={() => handleDelete()}
        />
      </div>

      <EntryImagesModal
        open={open}
        handleClose={handleClose}
        images={entry.images}
      />

      <AddOperationalExpenses
        open={addOpExpOpen}
        handleClose={handleOpExpClose}
        watchOnly={true}
        opeExps={entry.operatingExps}
      />

      <AddMaterialExpenses
        open={addMatExpOpen}
        handleClose={handleMatExpClose}
        watchOnly={true}
        matExps={entry.materialExps}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeTimeEntryStart: (payload) =>
    dispatch(removeTimeEntryStart(payload)),
});

export default connect(null, mapDispatchToProps)(TimeSheetEntry);
