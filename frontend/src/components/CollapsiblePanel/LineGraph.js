import { useEffect } from "react";
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
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

function makeOptions(title, annotations) {
  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title
      },
      annotation: {
        annotations: annotations
      }
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

function makeAnnotation(fluids) {
  let annotations = {};
  Object.keys(fluids).map((key) => {
    const dosages = fluids[key]['data'];
    dosages.map((point, id) => {
      annotations['line'+String(id)] = {
        type: 'line',
        xMin: point.time,
        xMax: point.time,
        borderColor: 'green',
        borderWidth: 2,
        label: {
          backgroundColor: 'green',
          content: key,
          display: true,
          enabled: true,
          position: "end"
        }
      };
      return null;
    });
    return null;
  });
  return annotations;
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
      });
      return null;
    })
  }
  const data = {datasets: datasets}
  return data;
}

const DrawLine = ({graphData, treatmentData, title}) => {
  const annotations = makeAnnotation(treatmentData);
  const options = makeOptions(title, annotations);
  const data = makeData(graphData);
  return(
    <Line options={options} data={data}/>
  )
}

const LineGraph = ({ treatmentName }) => {
  const kEndpoint = useSelector((state) => state.endpoints.kEndpoint);
  const responseData = useSelector((state) => state.treatmentResponse[treatmentName]);

  useEffect(() => {
    const data = {
      'source': 1,
      'destination':'datastore',
      'timestamp': Date.now(),
      'eventName': 'get_'+treatmentName+'_response',
      'eventArgs': []
    };
    kEndpoint.sendMessage(JSON.stringify(data));
  }, [ treatmentName, kEndpoint ])

  return (
    <div>
      <DrawLine {...{
        title:'Blood Pressure',
        graphData:{
          'BP Sys': responseData['BP Sys'],
          'BP Dia': responseData['BP Dia'],
        },
        treatmentData: {
          'Normal Saline' : responseData['Normal Saline'],
          'Lactated Ringer' : responseData['Lactated Ringer']
        }
      }}/>
      <DrawLine {...{
        title:'Heart Rate',
        graphData:{
          'HR': responseData['HR']
        },
        treatmentData: {
          'Normal Saline' : responseData['Normal Saline'],
          'Lactated Ringer' : responseData['Lactated Ringer']
        }
      }}/>
      <DrawLine {...{
        title:'Urine Output',
        graphData:{
          'Urine Output': responseData['Urine Output']
        },
        treatmentData: {
          'Normal Saline' : responseData['Normal Saline'],
          'Lactated Ringer' : responseData['Lactated Ringer']
        }
      }}/>
    </div>
  )
}

export default LineGraph;
