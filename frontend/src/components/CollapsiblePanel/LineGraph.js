import { useState, useEffect } from "react";
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
    },
    parsing :{
      xAxisKey: 'time',
      yAxisKey: 'value'
    }
  };
  return options;
}

const colorMap = {
  'BP Sys': 'red',
  'BP Dia': 'blue',
  'HR': 'red',
  'Urine Output': 'orange',
  'Normal Saline': 'green',
  'Lactated Ringer': 'green'
}

function makeData(result) {
  let datasets = [];
  if (result) {
    Object.keys(result).map((key) => {
      datasets.push({
        type: "line",
        label: key,
        borderColor: colorMap[key],
        borderWidth: 1,
        fill: false,
        data: result[key]['data'],
        xAxisKey: 'time',
        yAxisKey: 'value',
        yAxisID: 'y-axis'
      })
    })
  }
  const data = {datasets: datasets}
  console.log(data)
  return data;
}




const LineGraph = ({ treatmentName }) => {
  const kEndpoint = useSelector((state) => state.endpoints.kEndpoint);
  const responseData = useSelector((state) => state.treatmentResponse[treatmentName]);
  const [graphData, setGraphData] = useState(makeData(responseData));

  useEffect(() => {
    const data = {
      'source': 1,
      'destination':'datastore',
      'timestamp': Date.now(),
      'eventName': 'get_'+treatmentName+'_response',
      'eventArgs': []
    };
    kEndpoint.sendMessage(JSON.stringify(data));
  }, [ treatmentName ])

  useEffect(() => {
    if (responseData !== null) {
      setGraphData(responseData);
    }
  }, [ responseData, setGraphData ])

  return (
    <div>
      <label>Fluid Response</label>
      <Line options={makeOptions('Blood Pressure')}
        data={makeData({
          'BP Sys': responseData['BP Sys'],
          'BP Dia': responseData['BP Dia'],
          'Normal Saline' : responseData['Normal Saline'],
          'Lactated Ringer' : responseData['Lactated Ringer']
        })}
      />
      <Line options={makeOptions('Heart Rate')}
        data={makeData({
          'HR': responseData['HR'],
          'Normal Saline' : responseData['Normal Saline'],
          'Lactated Ringer' : responseData['Lactated Ringer']
        })}
      />
      <Line options={makeOptions('Urine Output')}
        data={makeData({
          'Urine Output': responseData['Urine Output'],
          'Normal Saline' : responseData['Normal Saline'],
          'Lactated Ringer' : responseData['Lactated Ringer']
        })}
      />
    </div>
  )
}

export default LineGraph;
