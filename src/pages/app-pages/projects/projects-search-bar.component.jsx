import React from 'react';

const ProjectsSearchBar = ({ handleSearchField, searchField }) => (
  <div className='p-search-bar'>
    <div className='search-bar'>
      <input
        type='text'
        placeholder='Search by name, client or number'
        className='input'
        onChange={handleSearchField}
        value={searchField}
      />
    </div>
  </div>
);

export default ProjectsSearchBar;
