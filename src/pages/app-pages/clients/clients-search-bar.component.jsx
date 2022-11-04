import React from 'react';

const ClientSearchBar = ({ handleSearchField, searchField }) => {
  return (
    <div className='p-search-bar'>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search by name, client number or phone'
          className='input'
          onChange={handleSearchField}
          value={searchField}
        />
        {/* <button className='app-btn-blue'>Search</button> */}
      </div>
    </div>
  );
};

export default ClientSearchBar;
