import React, { useState, useEffect, Fragment } from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';

import { getDates } from '../../../utils/getDates';
import toDate from '../../../utils/toDate';

const BarChart = ({
  selectedWorkspaceData,
  caTimeEntries,
  timeEntries,
  startDate,
  endDate,
}) => {
  const generateSeries = (members, entries, caEntries) => {
    const seriesArray = members.map((member) => {
      let hoursArr = new Uint8Array(datesArr.length);

      entries.forEach((entry) => {
        if (entry.createdBy === member.userId) {
          // get date
          let startDate;

          // checking if the startTime is a firebase Timestamp
          if (Object.keys(entry.startTime).length > 0) {
            startDate = toDate(entry.startTime);
          } else {
            startDate = entry.startTime;
          }

          // converting date object to String for the chart
          startDate = startDate.toISOString().split('T')[0];

          // find index of date
          const indexRefToDate = datesArr.findIndex(
            (item) => item === startDate,
          );

          // get total hours
          let totalTime = toDate(entry.totalTime);
          totalTime = moment.utc(totalTime);
          totalTime = totalTime.hour();

          // add the hour to the index

          hoursArr[indexRefToDate] =
            hoursArr[indexRefToDate] + totalTime;
        } else {
          console.log('userId not matched');
        }
      });

      caEntries.forEach((entry) => {
        if (entry.createdBy === member.userId) {
          // get date
          let startDate;

          // checking if the startTime is a firebase Timestamp
          if (Object.keys(entry.startTime).length > 0) {
            startDate = toDate(entry.startTime);
          } else {
            startDate = entry.startTime;
          }

          startDate = startDate.toISOString().split('T')[0];

          // find index of date
          const indexRefToDate = datesArr.findIndex(
            (item) => item === startDate,
          );

          // get total hours
          let totalTime = toDate(entry.totalTime);
          totalTime = moment.utc(totalTime);
          totalTime = totalTime.hour();

          // add the hour to the index

          hoursArr[indexRefToDate] =
            hoursArr[indexRefToDate] + totalTime;
        } else {
          console.log('userId not matched');
        }
      });

      return {
        name: member.displayName,
        data: hoursArr,
      };
    });

    return seriesArray;
  };

  useEffect(() => {
    setOptions({
      ...options,
      xaxis: {
        ...options.xaxis,
        categories: getDates(startDate, endDate),
      },
    });
    setDatesArr(getDates(startDate, endDate));
  }, [startDate, endDate]);

  useEffect(() => {
    if (selectedWorkspaceData) {
      setSeries(
        generateSeries(
          selectedWorkspaceData.workspaceMembers,
          timeEntries,
          caTimeEntries,
        ),
      );
    }
  }, [
    selectedWorkspaceData,
    timeEntries,
    caTimeEntries,
    startDate,
    endDate,
  ]);

  const [datesArr, setDatesArr] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      type: 'bar',
      height: 200,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      type: 'datetime',
      categories: getDates(startDate, endDate),
      convertedCatToNumeric: false,
    },
    yaxis: {
      tickAmount: 14,
      labels: {
        formatter: function (y) {
          return y.toFixed(0) + 'h';
        },
      },
    },

    legend: {
      position: 'right',
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  });

  const [series, setSeries] = useState([
    {
      name: 'Employee A',
      data: [7, 8, 1, 1, 2, 1],
    },
  ]);

  return (
    <Fragment>
      <div id='chart'>
        <ReactApexChart
          options={options}
          series={series}
          type='bar'
          height={350}
        />
      </div>
      {/* <div id='chart'>
        <ReactApexChart
          options={options}
          series={series}
          type='pie'
          width={380}
        />
      </div> */}
    </Fragment>
  );
};

export default BarChart;
