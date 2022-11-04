import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { TiArrowSortedDown } from 'react-icons/ti';

import PdfDocument from './pdf/team-members';

const ProjectsSearchBar = ({
  searchField,
  handleSearchField,
  selectedWorkspaceData,
  searchMembers,
  forCSV,
  show,
  csvLoading,
}) => {
  console.log(forCSV);
  return csvLoading ? (
    <div>Loading</div>
  ) : (
    <div className='p-search-bar'>
      <div className='search-bar filter-bar'>
        <input
          type='text'
          placeholder='Search by name, email or employee number'
          className='input'
          value={searchField}
          onChange={handleSearchField}
        />
      </div>
      <div className='filter-bar-2'>
        {csvLoading === false && (
          <CSVLink className='csv-link app-btn-blue' data={forCSV}>
            Export CSV
          </CSVLink>
        )}
        {show && !csvLoading && (
          <PDFDownloadLink
            document={
              <PdfDocument
                data={forCSV}
                workspaceName={selectedWorkspaceData.workspaceName}
              />
            }
            fileName='team-members.pdf'
            style={{
              textDecoration: 'none',
              color: '#fff',
              marginLeft: '8px',
              background: '#081631',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              color: '#fff',
            }}
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download Pdf'
            }
          </PDFDownloadLink>
        )}
      </div>
    </div>
  );
};

export default ProjectsSearchBar;
