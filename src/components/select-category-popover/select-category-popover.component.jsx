import React, { Fragment } from 'react';

import { ClickAwayListener, Popper } from '@material-ui/core';

import { FaAngleDown, FaCheckSquare } from 'react-icons/fa';

const SelectCategoryWithPopOver = ({
  classAsProp,
  categoriesArr,
  setCategoriesArr,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleCategory = (categoryName) => {
    let copyOfState = [...categoriesArr];
    copyOfState.forEach((category) => {
      if (category.categoryName === categoryName) {
        category.selected = category.selected
          ? !category.selected
          : true;
      }
    });
    setCategoriesArr(copyOfState);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <Fragment>
      <button className={classAsProp} onClick={handleClick}>
        Categories
        <FaAngleDown />
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={handleClick}>
          <div className='tt-popper category-popper'>
            {categoriesArr &&
              categoriesArr.map((category) => (
                <div
                  className='tt-popper-item'
                  key={category.categoryId}
                  onClick={() =>
                    handleCategory(category.categoryName)
                  }
                >
                  {category.selected && <FaCheckSquare />}

                  <span>{category.categoryName}</span>
                </div>
              ))}
          </div>
        </ClickAwayListener>
      </Popper>
    </Fragment>
  );
};

export default SelectCategoryWithPopOver;
