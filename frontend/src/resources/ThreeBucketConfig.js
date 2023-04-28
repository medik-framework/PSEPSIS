import { MarkerType } from 'reactflow';
import { Cardiovascular, Immune, Neurologic,} from "./DigitalTwinConfigReorganized";
const myStyle = {
  position: 'absolute',
  width: 150,
  height: 85,
  fontSize: 20,
  borderRadius: '50%',
  backgroundColor: 'lightgray',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#ADD8E6',
};

const orGateStyle = {
  width:80,
  height:50,
  fontSize: 25,
  backgroundColor: 'gray',
  color:'cyan', 
  borderColor: '#ADD8E6'
}

const andateStyle = {
  width: '90px',
  height: '60px',
  fontSize: 23,
  borderRadius: '0 0 12rem 12rem',
  backgroundColor: 'gray',
  color: 'cyan',
  borderColor: '#ADD8E6'
}

export const parentNodes = [
  { id: '0', anamoly: "empty", keys : "HR", data: {'myName': 'Heart Rate', 'myVal': '' }, type : 'custom' , position: { x: 5, y:160 }, style: (myStyle) },
  { id: '1', anamoly: "empty", keys : "Pulse Quality", data: {'myName': 'Pulse Quality', 'myVal': '' }, type : 'custom' ,  position: { x: 160, y:160 }, style: (myStyle) },
  { id: '2', anamoly: "empty", keys : "BP Sys", data:  {'myName': 'Systolic Blood Pressure', 'myVal': '' }, type : 'custom' , position: { x: 320, y:160 }, style: (myStyle) },
  { id: '3', anamoly: "empty", keys : "Temp", data:  {'myName': 'Temperature', 'myVal': '' }, type : 'custom' , position: { x: 480, y:160 }, style: (myStyle) },
  { id: '4', anamoly: "empty", keys : "Capillary Refill", data:  {'myName': 'Capillary Refill', 'myVal': '' }, type : 'custom' , position: { x: 680, y: 0 }, style: (myStyle) },
  { id: '5', anamoly: "empty", keys : "Skin Color", data: {'myName': 'Skin Color', 'myVal': '' },type : 'custom' , position: { x: 920, y: 0 }, style: (myStyle) },
  { id: '6', anamoly: "empty", keys : "Behavior", data:  {'myName': 'Behavior', 'myVal': '' }, type : 'custom' , position: { x: 640, y:160 }, style: (myStyle) },
  { id: '7', anamoly: "empty", keys : "High Risk Conditions", data:  {'myName': 'High Risk Condition', 'myVal': '' }, type : 'custom' , position: { x: 960, y:160 }, style: (myStyle) },
];

export const childLevelOneNodes = [
  { id: '8',tag:'orGate', anamoly:"empty", parents: ['0','1','2'],data: {'myName': 'Bucket 1', 'myVal': '' },type : 'custom', position: { x: 160, y: 340 }, style: (myStyle) },
  { id: '9',tag:'orGate', anamoly:"empty", parents: ['3'], data: {'myName': 'Bucket 2', 'myVal': '' },type : 'custom', position: { x: 480, y: 340 }, style: (myStyle) },
  { id: '10',tag:'orGate', anamoly:"empty", parents: ['4','5'], data: {'myName': 'Perfusion', 'myVal': '' },type : 'custom', position: { x: 800, y:160 }, style: (myStyle) },
];

export const childLevelTwoNodes = [
  { id: '11', anamoly:"empty", parents: ['6','10','7'], data: {'myName': 'Bucket 3', 'myVal': '' },type : 'custom', position: { x: 800, y: 340 }, style: (myStyle) },
  { id: '12', anamoly:"empty", parents: ['8','9','11'],data: {'myName': 'Sepsis', 'myVal': '' },type : 'custom', position: { x: 480, y: 520 }, style: (myStyle) },
];

export const conditionalNodes = [
  { id: '13', childId: '8', data: { label: 'OR' }, position: { x: 195, y: 270 }, style : (orGateStyle)},
  { id: '14', childId: '9', data: { label: 'OR' }, position: { x: 835, y: 270 }, style : (orGateStyle) },
  { id: '15', childId: '6', data: { label: 'OR' }, position: { x: 835, y: 100 }, style : (orGateStyle) },
  { id: '16', childId: '13', data: { label: 'AND' }, position: { x: 510, y: 445 }, style: (andateStyle) }
];


export const initialEdges = [
  { id: 'e1-15', source: '0', target: '13',markerEnd: { type: MarkerType.ArrowClosed,  } },
  { id: 'e2-15', source: '1', target: '13', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e3-15', source: '2', target: '13', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e5-16', source: '3', target: '9', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e6-16', source: '4', target: '15', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e7-16', source: '5', target: '15', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e8-17', source: '6', target: '14', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e9-17', source: '7', target: '14', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e10-14', source: '10', target: '14', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e11-14', source: '13', target: '8', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e12-14', source: '15', target: '10', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e17-6', source: '15', target: '11', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e16-12', source: '8', target: '16', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e15-10', source: '9', target: '16', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e14-13', source: '11', target: '16', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e4-11', source: '16', target: '12', markerEnd: { type: MarkerType.ArrowClosed, } }
];

export const BucketOrganConfigDetail = {
  "HR": Cardiovascular.measurements.HR,
  "BP Sys": Cardiovascular.measurements.BPSys,
  "Pulse Quality": Cardiovascular.measurements.PulseQuality,
  "Capillary Refill": Cardiovascular.measurements.CapillaryRefill,
  "Skin Color": Cardiovascular.measurements.SkinColor,
  "Temp":Immune.measurements.Temp,
  "Behavior":Neurologic.measurements.Behavior,
};