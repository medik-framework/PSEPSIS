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
      annotations['line'+key+String(id)] = {
        type: 'line',
        xMin: point.time,
        xMax: point.time,
        borderColor: colorMap[key],
        borderWidth: 2,
        label: {
          backgroundColor: colorMap[key],
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
  'RR': 'black',
  'SpO2': 'brown',
  'Normal Saline': 'green',
  'Lactated Ringer': 'green',
  "Epinephrine": 'blue',
  "Norepinephrine": "blue",
  "Dopamine": "blue",
  "Dobutamine": "blue"
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

function getTreatment(responseData) {
    return {
        'Normal Saline' : responseData['Normal Saline'],
        'Lactated Ringer' : responseData['Lactated Ringer'],
        "Epinephrine": responseData["Epinephrine"],
        "Norepinephrine": responseData["Norepinephrine"],
        "Dopamine": responseData["Dopamine"],
        "Dobutamine": responseData["Dobutamine"]
    }
}

const DrawLine = ({graphData, treatmentData, title}) => {
  const annotations = makeAnnotation(treatmentData);
  const options = makeOptions(title, annotations);
  const data = makeData(graphData);
  return(
    <Line options={options} data={data}/>
  )
}

function DrawAllLine(responseData) {
    const graphAttrs = {
        'Blood Pressure': ['BP Sys', 'BP Dia'],
        'Heart Rate': ['HR'],
        'Urine Output': ['Urine Output'],
        'RR': ['RR'],
        'SpO2': ['SpO2']
    };
    const treatmentData = getTreatment(responseData);
    return (
        <div>
            {Object.keys(graphAttrs).map((title) => {
                const attrs = graphAttrs[title]
                let graphData = {}
                attrs.map(attr => {
                    graphData[attr] = responseData[attr]
                })
                return <DrawLine key={title} {...{
                    title: title,
                    graphData: graphData,
                    treatmentData: treatmentData
                }}/>
            })}
        </div>
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
  return DrawAllLine(responseData)
}

export default LineGraph;
