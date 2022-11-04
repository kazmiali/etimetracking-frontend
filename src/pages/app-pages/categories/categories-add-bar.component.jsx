import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addCategoryStart } from '../../../redux/category/category.actions';

import { isEmpty } from '../../../utils/validateFields';

const CategoriesAddBar = ({
  addCategoryStart,
  workspaceId,
  userId,
}) => {
  const [categoryName, setCategoryName] = useState('');

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = () => {
    let alertMessage = 'Write a tag name';
    if (!isEmpty(categoryName, alertMessage)) {
      addCategoryStart({
        categoryName,
        workspaceId,
        userId,
      });
      setCategoryName('');
    }
  };

  return (
    <div className='categories-add-bar'>
      <input
        type='text'
        placeholder='Add new categories'
        className='input'
        value={categoryName}
        onChange={handleChange}
      />
      <button className='app-btn-white' onClick={handleSubmit}>
        ADD
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  workspaceId: state.workspace.selectedWorkspace.workspaceId,
  userId: state.user.currentUser.userId,
});

const mapDispatchToProps = (dispatch) => ({
  addCategoryStart: (payload) => dispatch(addCategoryStart(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoriesAddBar);
