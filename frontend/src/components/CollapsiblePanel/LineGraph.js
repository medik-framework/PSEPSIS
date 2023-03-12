// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import "chartjs-plugin-datalabels";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart',
//     },
//   },
//   spanGaps: true,
//   scales: {
//     xAxes: [{
//       type: 'time',
//       time: {
//         unit: 'minute',
//         displayFormats: {
//           hour: 'HH:mm:ss'
//         }
//       },
//       ticks: {
//         source: 'labels'
//       }
//     }],
//     yAxes: [{
//        ticks: {
//           min: 0,
//           max: 8,
//        },
//     }]
//  }
// };

// const data = {
//   labels: [
//     "00:00:00",
//     "00:01:00",
//     "00:02:00",
//     "00:03:00",
//     "00:04:00",
//     "00:05:00",
//     "00:06:00",
//     "00:07:00",
//     "00:08:00",
//     "00:09:00",
//     "00:10:00",
//   ],
//   datasets: [
//     {
//       type: "line",
//       label: "BP Dia",
//       borderColor: "#801004",
//       borderWidth: 1,
//       fill: false,
//       data: [
//         {x: "00:00:00", y:2.1},
//         {x: "00:02:00", y:1},
//         {x: "00:03:25", y:3},
//         {x: "00:04:40", y:1.5},
//         {x: "00:05:45", y:2.8},
//       ],
//       yAxisID: "y-axis",
//       order: 1,
//       lineTension: 0,
//       datalabels: {
//         display: "auto",
//         align: "top"
//       }
//     },
//     {
//         type: "line",
//         label: "BP Sys",
//         borderColor: "#005086",
//         borderWidth: 1,
//         fill: false,
//         data: [
//           {x: 170, y:3.2},
//           {x: 350, y:1.9},
//           {x: 455, y:3},
//           {x: 520,  y:2.5},
//           {x: 600,  y:2},
//         ],
//         yAxisID: "y-axis",
//         order: 2,
//         lineTension: 0,
//         datalabels: {
//           display: "auto",
//           align: "top"
//         }
//     }
//   ]
// };

// const options = {
//   spanGaps: true,
//   scales: {
//     yAxes: [
//       {
//         id: "y-axis",
//         type: "linear",
//         position: "left",
//         gridLines: {},
//         ticks: {
//           callback: (value) => {
//             return value;
//           }
//         }
//       }
//     ]
//   },
//   legend: {
//     position: "right"
//   }
// };

import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  datasets: [
    {
      label: "Data",
      data: [
        { x: 1.2, y: 2 },
        { x: 2.4, y: 3 },
        { x: 3.6, y: 4 },
        { x: 4.8, y: 5 },
        { x: 6.0, y: 6 },
      ],
      fill: false,
      borderColor: "red",
    },
  ],
};

const options = {
  scales: {
    xAxes: [
      {
        // type: "linear",
        // ticks: {
        //   stepSize: 1,
        //   precision: 1,
        // },
      },
    ],
  },
};

const LineGraph = () => {
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;

// export default function LineGraph() {
//   return <Line options={options} data={data} />;
// }

// // const LineGraph = () => {
// //   return <Bar type="bar" data={data} options={options} />;
// // };

// export default LineGraph;

// import React from 'react';
// import { Line } from 'react-chartjs-2';

// const data = {
//   labels: ["00:00:00", "01:00:00", "02:00:00"],
//   datasets: [
//     {
//       label: "Data",
//       data: [
//         {x: 120, y: 2},
//         {x: 240, y: 3},
//         {x: 350, y: 4},
//       ],
//       fill: false,
//       borderColor: "rgba(75,192,192,1)",
//       lineTension: 0.1
//     }
//   ]
// };

// const options = {
//   scales: {
//     xAxes: [{
//       type: 'time',
//       time: {
//         unit: 'hour',
//         displayFormats: {
//           hour: 'HH:mm:ss'
//         }
//       }
//     }],
//     yAxes: [{
//       ticks: {
//         beginAtZero: true
//       }
//     }]
//   }
// };

// const LineGraph = () => {
//   return (
//     <div>
//       <Line data={data} options={options} />
//     </div>
//   );
// };

// export default LineGraph;
