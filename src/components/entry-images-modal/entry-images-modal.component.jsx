import React from 'react';
import { Modal, ClickAwayListener } from '@material-ui/core';
import { MdClose } from 'react-icons/md';
import { IoIosCloseCircle } from 'react-icons/io';

import '../add-image-modal/add-image-modal.styles.scss';

const EntryImagesModal = ({ open, handleClose, images }) => {
  return (
    <Modal
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      open={open}
      onClose={handleClose}
    >
      <div className='modal-container'>
        <ClickAwayListener onClickAway={handleClose}>
          <div className='modal add-image-modal'>
            <div className='m-header'>
              <h2>Add or Remove Images</h2>
              <MdClose onClick={handleClose} />
            </div>
            <div className='m-body'>
              <h2 className='ai-h2'>Added Images</h2>
              <div className='images-showcase'>
                {images && images.length > 0 ? (
                  images.map((image) => (
                    <div className='image-wrapper'>
                      <div className='image-div'>
                        <img src={image} alt='' />
                      </div>

                      <button title='Remove Image'>
                        <IoIosCloseCircle />
                      </button>
                    </div>
                  ))
                ) : (
                  <h1 style={{ color: 'white' }}>No images Added</h1>
                )}
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

export default EntryImagesModal;
