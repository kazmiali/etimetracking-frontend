import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { CSVLink } from 'react-csv';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { TiArrowSortedDown } from 'react-icons/ti';

import PdfDocument from '../pdf/ca-detailed-report-pdf';

import {
  fetchClientsStart,
  fetchProjectsStart,
} from '../../../../redux/project-and-client/project-and-client.actions';
import { fetchCategoriesStart } from '../../../../redux/category/category.actions';

import toDate from '../../../../utils/toDate';
import { convertTimeStampToGivenFormat } from '../../../../utils/convertTimeStampToGivenFormat';

const CAReportFilterBar = ({
  timeEntries,
  selectedWorkspace,
  fetchClientsStart,
  fetchProjectsStart,
  fetchCategoriesStart,
  categories,
  projects,
  clients,
  setDur,
  setBil,
  totalDurationObj,
  handleClientFilter,
  handleCategoryFilter,
  handleProjectFilter,
  clientFilter,
  categoryFilter,
  projectFilter,
  filterItems,
  totalOpeExps,
  totalMatExps,
  setTotalOpeExps,
  setTotalMatExps,
}) => {
  const [forCSV, setForCSV] = useState([]);
  const [forPDF, setForPDF] = useState([]);
  const [show, setHide] = useState(false);
  const [csvLoading, setCsvLoading] = useState(true);

  useEffect(() => {
    if (selectedWorkspace.workspaceId) {
      fetchClientsStart(selectedWorkspace.workspaceId);
      fetchProjectsStart(selectedWorkspace.workspaceId);
      fetchCategoriesStart(selectedWorkspace.workspaceId);
    }
  }, [selectedWorkspace]);

  useEffect(() => {
    let totalDur = moment.utc(0);
    let zero = moment.utc(0);

    let addedOpeExps = 0;
    let addedMatExps = 0;

    let billableHours = moment.utc(0);
    setCsvLoading(true);
    const newArray = timeEntries
      .filter((item) => {
        return filterItems(
          item,
          clientFilter,
          categoryFilter,
          projectFilter,
        );
      })
      .map((item) => {
        let itemTotalTime = toDate(item.totalTime);
        itemTotalTime = moment.utc(itemTotalTime);

        let seconds = itemTotalTime.second();
        let minutes = itemTotalTime.minute();
        let hours = itemTotalTime.hour();

        totalDur.add(seconds, 's');
        totalDur.add(minutes, 'm');
        totalDur.add(hours, 'h');

        let opeExpsOfThisArray = item.operatingExps.reduce(
          (acc, curVal) => acc + Number(curVal.amount),
          0,
        );

        addedOpeExps =
          Number(addedOpeExps) + Number(opeExpsOfThisArray);

        let matExpsOfThisArray = item.materialExps.reduce(
          (acc, curVal) => {
            let total =
              Number(curVal.pricePerUnit) * Number(curVal.quantity);
            return acc + total;
          },
          0,
        );

        addedMatExps =
          Number(addedMatExps) + Number(matExpsOfThisArray);

        const objectToReturn = {
          Project:
            Object.keys(item.project).length !== 0
              ? item.project.projectName
              : '',
          Client:
            Object.keys(item.project).length !== 0 &&
            Object.keys(item.project.projectClient).length !== 0
              ? item.project.projectClient.clientName
              : '',
          Description: item.entryNote,
          User: item.displayName ? item.displayName : '',
          Email: item.email ? item.email : '',
          Billable: item.billable,
          ['Billable Rate (USD)']: 0,
          ['Billable Amount (USD)']: 0,
          ['Start Date']: convertTimeStampToGivenFormat(
            item.startTime,
            'DD-MM-YYYY',
          ),
          ['Start Time']: convertTimeStampToGivenFormat(
            item.startTime,
            'hh:mm:ss A',
          ),
          ['End Date']: convertTimeStampToGivenFormat(
            item.endTime,
            'DD-MM-YYYY',
          ),
          ['End Time']: convertTimeStampToGivenFormat(
            item.endTime,
            'hh:mm:ss A',
          ),
          ['Duration (HH:mm:ss)']: convertTimeStampToGivenFormat(
            item.totalTime,
            'HH:mm:ss',
            true,
          ),
          ['Operating Expenses (USD)']: opeExpsOfThisArray,
          ['Material Expenses (USD)']: matExpsOfThisArray,
        };

        return objectToReturn;
      });

    const PDFArray = timeEntries
      .filter((item) => {
        return filterItems(
          item,
          clientFilter,
          categoryFilter,
          projectFilter,
        );
      })
      .map((item) => {
        const objectToReturn = {
          Project:
            Object.keys(item.project).length !== 0
              ? item.project.projectName
              : '',
          Client:
            Object.keys(item.project).length !== 0 &&
            Object.keys(item.project.projectClient).length !== 0
              ? item.project.projectClient.clientName
              : '',
          Description: item.entryNote,
          User: item.displayName ? item.displayName : '',
          Email: item.email ? item.email : '',
          Billable: item.billable,
          ['Billable Rate (USD)']: 0,
          ['Billable Amount (USD)']: 0,
          ['Start Date']: convertTimeStampToGivenFormat(
            item.startTime,
            'DD-MM-YYYY',
          ),
          ['Start Time']: convertTimeStampToGivenFormat(
            item.startTime,
            'hh:mm:ss A',
          ),
          ['End Date']: convertTimeStampToGivenFormat(
            item.endTime,
            'DD-MM-YYYY',
          ),
          ['End Time']: convertTimeStampToGivenFormat(
            item.endTime,
            'hh:mm:ss A',
          ),
          ['Duration (HH:mm:ss)']: convertTimeStampToGivenFormat(
            item.totalTime,
            'HH:mm:ss',
            true,
          ),
          materialExps: item.materialExps,
          operatingExps: item.operatingExps,
        };

        return objectToReturn;
      });

    setForCSV(newArray);
    setForPDF(PDFArray);
    setTotalOpeExps(addedOpeExps);
    setTotalMatExps(addedMatExps);
    setCsvLoading(false);
    setHide(true);

    setDur({
      h: totalDur.diff(zero, 'hours'),
      m: totalDur.minute(),
      s: totalDur.second(),
    });

    setBil({
      h: billableHours.diff(zero, 'hours'),
      m: billableHours.minute(),
      s: billableHours.second(),
    });
  }, [timeEntries, clientFilter, categoryFilter, projectFilter]);

  return (
    <div className='p-search-bar'>
      <div className='search-bar filter-bar'>
        <div className='styled-select sort-by'>
          <select onChange={handleClientFilter} value={clientFilter}>
            <option value=''>Client</option>
            {clients.map((client) => (
              <option value={client.clientName} key={client.clientId}>
                {client.clientName}
              </option>
            ))}
          </select>
          <TiArrowSortedDown className='fa fa-sort-desc' />
        </div>
        <div className='styled-select sort-by'>
          <select
            onChange={handleProjectFilter}
            value={projectFilter}
          >
            <option value=''>Project</option>
            {projects.map((project) => (
              <option
                value={project.projectName}
                key={project.projectId}
              >
                {project.projectName}
              </option>
            ))}
          </select>
          <TiArrowSortedDown className='fa fa-sort-desc' />
        </div>
        <div className='styled-select sort-by'>
          <select
            onChange={handleCategoryFilter}
            value={categoryFilter}
          >
            <option value=''>Category</option>
            {categories.map((category) => (
              <option
                value={category.categoryName}
                key={category.categoryId}
              >
                {category.categoryName}
              </option>
            ))}
          </select>
          <TiArrowSortedDown className='fa fa-sort-desc' />
        </div>
      </div>
      <div className='filter-bar-2'>
        {!csvLoading && (
          <CSVLink className='csv-link app-btn-blue' data={forCSV}>
            Export CSV
          </CSVLink>
        )}
        {show && !csvLoading && (
          <PDFDownloadLink
            document={
              <PdfDocument
                data={forPDF}
                totalDurationObj={totalDurationObj}
                totalOpeExps={totalOpeExps}
                totalMatExps={totalMatExps}
              />
            }
            fileName='detailed-report.pdf'
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

const mapStateToProps = (state) => ({
  clients: state.projectAndClient.clients,
  projects: state.projectAndClient.projects,
  categories: state.category.categories,
});

const mapDispatchToProps = (dispatch) => ({
  fetchClientsStart: (payload) =>
    dispatch(fetchClientsStart(payload)),
  fetchProjectsStart: (payload) =>
    dispatch(fetchProjectsStart(payload)),
  fetchCategoriesStart: (workspaceId) =>
    dispatch(fetchCategoriesStart(workspaceId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CAReportFilterBar);
