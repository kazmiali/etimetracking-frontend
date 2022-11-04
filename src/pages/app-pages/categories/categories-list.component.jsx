import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AiOutlineDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';

import {
  fetchCategoriesStart,
  removeCategoryStart,
} from '../../../redux/category/category.actions';
import { linearAlertBottom } from '../../../utils/swalMixins';

const CategoriesList = ({
  fetchCategoriesStart,
  removeCategoryStart,
  selectedWorkspace,
  categories,
}) => {
  useEffect(() => {
    if (selectedWorkspace.workspaceId) {
      fetchCategoriesStart(selectedWorkspace.workspaceId);
    }
  }, [selectedWorkspace]);

  const handleDelete = (categoryId) => {
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
          removeCategoryStart(categoryId);
        }
      });
    }
  };

  return (
    <div className='list'>
      <div className='list-header'>CATEGORIES</div>
      {categories.map((category) => (
        <div className='list-entry' key={category.categoryId}>
          <div className='entry-title'>
            <p>{category.categoryName}</p>
          </div>
          <AiOutlineDelete
            onClick={() => {
              handleDelete(category.categoryId);
            }}
          />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedWorkspace: state.workspace.selectedWorkspace,
  categories: state.category.categories,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategoriesStart: (workspaceId) =>
    dispatch(fetchCategoriesStart(workspaceId)),
  removeCategoryStart: (categoryId) =>
    dispatch(removeCategoryStart(categoryId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoriesList);
