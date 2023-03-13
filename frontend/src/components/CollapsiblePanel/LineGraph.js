import { useSelector } from "react-redux";

import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function makeOptions(title) {
  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title
      },
    },
    spanGaps: true,
    scales: {
      x: {
        type: 'time',
        time: {
          displayFormats: {
            'millisecond': 'HH:mm:ss'
          }
        },
      },
    }
  };
  return options;
}

function makeDate() {
  const data = {
    datasets: [
      {
        type: "line",
        label: "BP Sys",
        borderColor: "red",
        borderWidth: 1,
        fill: false,
        data: [
          {x:1678653506662, y:1.9},
          {x:1678654144662, y:0.6},
          {x:1678654390662, y:2.2},
          {x:1678655100662, y:0.8},
          {x:1678655300662, y:1.2}
        ],
        yAxisID: "y-axis",
      },
      {
        type: "line",
        label: "BP Dia",
        borderColor: "blue",
        borderWidth: 1,
        fill: false,
        data: [
          {x:1678653696662, y:2.1},
          {x:1678653944662, y:1},
          {x:1678653990662, y:3},
          {x:1678654500662, y:1.5},
          {x:1678655600662, y:2.8}
        ],
        yAxisID: "y-axis",
      },
      {
        type: "line",
        label: "Bolus 1",
        borderColor: "green",
        borderWidth: 1,
        fill: false,
        data: [
          {x:1678654144662, y:3},
          {x:1678654144662, y:0},
        ],
        yAxisID: "y-axis",
      },
      {
        type: "line",
        label: "Bolus 2",
        borderColor: "green",
        borderWidth: 1,
        fill: false,
        data: [
          {x:1678655044662, y:3},
          {x:1678655044662, y:0},
        ],
        yAxisID: "y-axis",
      },
    ]
  };
}




export default LineGraph = ({ treatmentName }) => {
  const kEndpoint = useSelector((state) => state.endpoints.kEndpoint);
  const data = {
    'source': 1,
    'destination':'datastore',
    'timestamp': Date.now(),
    'eventName': 'get_treatment_response',
    'eventArgs': ['fluid']
  };
  kEndpoint.sendMessage(JSON.stringify(data));
  const responseData = useSelector((state) => state.treatmentResponse[treatmentName]);

  

  return
    <div>
      <Line options={options} data={data} />;
    </div>
}
