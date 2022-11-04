import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = () => {
  const [state, setState] = useState({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: [
        'Employee A',
        'Employee B',
        'Employee C',
        'Employee D',
        'Employee E',
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  });

  return (
    <div id='chart'>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type='pie'
        width={380}
      />
    </div>
  );
};

export default PieChart;
