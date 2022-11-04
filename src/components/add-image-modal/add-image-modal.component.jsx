import React from 'react';
import { Modal, ClickAwayListener } from '@material-ui/core';
import { MdClose, MdAddCircleOutline } from 'react-icons/md';
import uploadImageToStorage from '../../utils/uploadImageToStorage.js';

import './add-image-modal.styles.scss';
import { IoIosCloseCircle } from 'react-icons/io';
import { linearAlertBottom } from '../../utils/swalMixins.js';

const AddImageModal = ({ open, handleClose, images, setImages }) => {
  const handleImage = async () => {
    const image = document.getElementById('modal-image').files[0];

    if (!image) {
      return;
    }

    if (image.size > 2097152) {
      linearAlertBottom.fire({
        icon: 'warning',
        title: 'Image size is too big, please select another image',
      });
    }

    const imageURL = await uploadImageToStorage(
      image,
      '/entryImages',
    );

    setImages([...images, imageURL]);
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
          <div className='modal add-image-modal'>
            <div className='m-header'>
              <h2>Add or Remove Images</h2>
              <MdClose onClick={handleClose} />
            </div>
            <div className='m-body'>
              <h2 className='ai-h2'>
                {images.length > 0
                  ? 'Added Images'
                  : 'No Images Added'}
              </h2>
              <div className='images-showcase'>
                {images &&
                  images.map((image) => (
                    <div className='image-wrapper'>
                      <div className='image-div'>
                        <img src={image} alt='' />
                      </div>

                      <button title='Remove Image'>
                        <IoIosCloseCircle />
                      </button>
                    </div>
                  ))}
              </div>

              <section className='image-input-section'>
                <h2 className='ai-h2 lead'>
                  Choose an image, then click on Add button to add
                  image. JPEG and PNG files only.
                </h2>
                <input
                  type='file'
                  className='app-btn-white'
                  accept='image/x-png,image/jpeg'
                  id='modal-image'
                />
                <button
                  className='app-btn-white'
                  onClick={handleImage}
                >
                  <MdAddCircleOutline />{' '}
                  <span>Click to add image</span>
                </button>
              </section>
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

export default AddImageModal;
