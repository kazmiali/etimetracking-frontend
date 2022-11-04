import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CategoriesAddBar from './categories-add-bar.component';
import CategoriesList from './categories-list.component';

import './categories.styles.scss';

const Categories = ({ selectedWorkspace, selectedWorkspaceData }) => {
  const checkRole = () => {
    if (selectedWorkspaceData.whoCategories === 'admin') {
      if (
        selectedWorkspace.userRole === 'admin' ||
        selectedWorkspace.userRole === 'owner'
      ) {
        return <CategoriesAddBar />;
      }
      if (selectedWorkspace.userRole === 'member') {
        return <Redirect to='/app' />;
      }
    } else if (selectedWorkspaceData.whoCategories === 'member') {
      return <CategoriesAddBar />;
    }
  };

  return (
    <div className='app-page app-page--layout categories-page'>
      {checkRole()}
      <CategoriesList />
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedWorkspace: state.workspace.selectedWorkspace,
  selectedWorkspaceData: state.workspace.selectedWorkspaceData,
});

export default connect(mapStateToProps)(Categories);
