import React, { Fragment } from 'react';

import { ClickAwayListener, Popper } from '@material-ui/core';

import { FaAngleDown, FaCheckSquare } from 'react-icons/fa';
import { useState } from 'react';
import { useEffect } from 'react';

const EntryCategoriesPopover = ({ categories }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <Fragment>
      <div className='entry-categories' onClick={handleClick}>
        <img
          src={require('../../assets/icons/timetracker/tag.png')}
        />
      </div>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={handleClick}>
          <div className='tt-popper category-popper'>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <div
                  className='tt-popper-item'
                  key={category.categoryId}
                >
                  <span>{category.categoryName}</span>
                </div>
              ))
            ) : (
              <div className='tt-popper-item'>
                <span>{'No Category Selected'}</span>
              </div>
            )}
          </div>
        </ClickAwayListener>
      </Popper>
    </Fragment>
  );
};

export default EntryCategoriesPopover;
