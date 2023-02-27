import React, { useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, MarkerType } from 'reactflow';
import { useSelector } from 'react-redux';
import 'reactflow/dist/style.css';
import { OrganDTConfig } from "../../resources/DigitalTwinConfigReorganized";

const myStyle = {
  position: 'absolute',
  width: 150,
  height: 85,
  fontSize: 20,
  borderRadius: '50%',
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#ADD8E6',
};

const initialNodes = [
  { id: '1', data: { label: 'Heart Rate' }, const_label: 'Heart Rate', key: 'HR', digikey: 'HR', position: { x: 5, y:160 }, style: (myStyle) },
  { id: '2', data: { label: 'Systolic BP\n' }, const_label: 'Systolic BP', key: 'BP Sys', digikey: 'BPSys', values: '',position: { x: 160, y:160 }, style: (myStyle) },
  { id: '3', data: { label: 'Pulse Quality\n' }, const_label: 'Pulse Quality', key: 'Pulse Quality', digikey: 'PulseQuality', values: '', position: { x: 320, y:160 }, style: (myStyle) },
  { id: '15', data: { label: 'OR' }, position: { x: 195, y: 270 }, style: {width:80,height:50,fontSize: 25,backgroundColor: 'grey',color:'cyan', borderColor: '#ADD8E6'} },
  { id: '4', data: { label: 'Temp\n' }, const_label: 'Temp', key: 'Temp', digikey: 'Temp', position: { x: 480, y:160 }, style: (myStyle) },
  { id: '5', data: { label: 'Mental Status\n' }, const_label: 'Mental Status', key: 'HR', digikey: 'Behavior', position: { x: 640, y:160 }, style: (myStyle) },
  { id: '8', data: { label: 'Cap Refill' }, const_label: 'Cap Refill', key: 'Capillary Refill', digikey: 'CapillaryRefill', values: '', position: { x: 680, y: 0 }, style: (myStyle) },
  { id: '9', data: { label: 'Skin Color' }, const_label: 'Skin Color', key: 'Skin Color', digikey: 'SkinColor', values: '', position: { x: 920, y: 0 }, style: (myStyle) },
  { id: '6', data: { label: 'Perfusion' }, const_label: 'Perfusion', key: 'HR', position: { x: 800, y:160 }, style: (myStyle) },
  { id: '7', data: { label: 'High Risk Condition' }, const_label: 'High Risk Condition', key: 'High Risk Conditions', position: { x: 960, y:160 }, style: (myStyle) },
  { id: '16', data: { label: 'OR' }, position: { x: 835, y: 270 }, style: {width:80,height:50,fontSize: 25,backgroundColor: 'grey', color:'cyan', borderColor: '#ADD8E6'} },
  { id: '17', data: { label: 'OR' }, position: { x: 835, y: 100 }, style: {width:80,height:50,fontSize: 25,backgroundColor: 'grey',color:'cyan', borderColor: '#ADD8E6'} },
  { id: '10', data: { label: 'Bucket 1' }, const_label: 'Bucket 1', position: { x: 160, y: 340 }, style: (myStyle) },
  { id: '11', data: { label: 'Bucket 2' }, const_label: 'Bucket 2', position: { x: 480, y: 340 }, style: (myStyle) },
  { id: '12', data: { label: 'Bucket 3' }, const_label: 'Bucket 3', position: { x: 800, y: 340 }, style: (myStyle) },
  { id: '13', data: { label: 'Sepsis' }, position: { x: 480, y: 520 }, style: (myStyle) },
  { id: '14', data: { label: 'AND' }, position: { x: 510, y: 445 }, style: {
    width: '90px',
    height: '60px',
    fontSize: 23,
    borderRadius: '0 0 12rem 12rem',
    backgroundColor: 'grey',
    color: 'cyan',
    borderColor: '#ADD8E6'
    } }
];

const initialEdges = [
  { id: 'e1-15', source: '1', target: '15', markerEnd: { type: MarkerType.ArrowClosed, },color:'#000000' },
  { id: 'e2-15', source: '2', target: '15', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e3-15', source: '3', target: '15', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e5-16', source: '5', target: '16', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e6-16', source: '6', target: '16', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e7-16', source: '7', target: '16', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e8-17', source: '8', target: '17', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e9-17', source: '9', target: '17', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e10-14', source: '10', target: '14', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e11-14', source: '11', target: '14', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e12-14', source: '12', target: '14', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e17-6', source: '17', target: '6', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e16-12', source: '16', target: '12', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e15-10', source: '15', target: '10', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e14-13', source: '14', target: '13', markerEnd: { type: MarkerType.ArrowClosed, } },
  { id: 'e4-11', source: '4', target: '11', markerEnd: { type: MarkerType.ArrowClosed, } }
];

const ThreeBucket = () => {

  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const changingNodes = ['1','2','3','8','9'];
  const tempNode = ['4'];
  const behaviorNode = ['5'];

  const [nodeName, setNodeName] = useState(initialNodes);
  const [nodeBg, setNodeBg] = useState('white');
  const [nodeHidden, setNodeHidden] = useState(false);

  const ageObject = useSelector((state) => state.patientBasic['Age']);
  const organDTValue = useSelector((state) => state.organDT['Cardiovascular']);
  var organDTValueforTemp = '';
  var organDTValueforBehavior = '';

  function selectValue(state, key, id, digikey) {
    if (changingNodes.includes(id))
    {
     return organDTValue[key].value;
    }
    if(tempNode.includes(id))
    {
      organDTValueforTemp = state.organDT['Immune'];
      return JSON.stringify(organDTValueforTemp.Temp.value);
    }
    if(behaviorNode.includes(id))
    {
      organDTValueforBehavior=(state?.organDT['Neurologic'][`${digikey}`].value);
    }
  }

  function getColorCount(node_color){
    if(node_color == '#ff4c4c') {return 1;}
    else {return 0;}
  }

  const values = useSelector(state => initialNodes.map(item => selectValue(state, item.key, item.id, item.digikey)));
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node, index) => {
        if (changingNodes.includes(node.id))
        {
          const isData = `${values[index]}`;
          const name = `${node.const_label}=(${isData})`;
          if(isData != "null" && isData != "NaN")
          {
            //const name = `${node.const_label}=(${values[index]})`;
            node.data = {label : name};
          }
          if(typeof isData === 'string' && isData.length>3 && isData != "null")
          {
            //node.data.label = `${node.const_label}=(${values[index]})`;
            node.data = {label : name};
          };

          const value = organDTValue[node.key].value;

          if(ageObject && value){
            if(OrganDTConfig[0].measurements[`${node.digikey}`].type !== 'choices')
            {
              //Find the range from the AgeObject
              const range = OrganDTConfig[0].measurements[`${node.digikey}`].getThres ? OrganDTConfig[0].measurements[`${node.digikey}`].getThres(ageObject) : {low: 0, high: 0};
              if(value > range.high || value < range.low)
              {
                node.style = { ...node.style, backgroundColor: '#ff4c4c' };
              }

              if(value <= range.high && value >= range.low)
              {
                node.style = { ...node.style, backgroundColor: '#33ff33' };
              }
            }
            else
            {
              const checkvalue = OrganDTConfig[0].measurements[`${node.digikey}`].options[value];
              if (checkvalue == 2)
              {
                node.style = { ...node.style, backgroundColor: '#33ff33' };
              }
              if (checkvalue == 0)
              {
                node.style = { ...node.style, backgroundColor: '#ff4c4c' };
              }
            } }
        }

        if(tempNode.includes(node.id))
        {
          const range = OrganDTConfig[2].measurements[`${node.digikey}`].getThres? OrganDTConfig[2].measurements[`${node.digikey}`].getThres(ageObject): {low: 0, high: 0};
          const isData = `${values[index]}`;

          if(! isNaN(isData))
          {
            const temp = `${node.const_label}=(${isData})`
            node.data = {label : temp};
            //node.data.label = `${node.const_label}=(${isData})`;
          }
          if(ageObject && organDTValueforTemp.Temp.value)
          {
            if(organDTValueforTemp.Temp.value > range.high || organDTValueforTemp.Temp.value < range.low) {node.style = { ...node.style, backgroundColor: '#ff4c4c' };};
            if(organDTValueforTemp.Temp.value <= range.high && organDTValueforTemp.Temp.value >= range.low) {node.style = { ...node.style, backgroundColor: '#33ff33' };};
          }
        }

        //Calculations for Bucket 1 we need values of HeatRate, SystolicBP and PulseQuality
        if(node.id == 10 && ageObject)
        {
          const valueHeartRate = initialNodes[0].style.backgroundColor;
          const valueSystolicBP = initialNodes[1].style.backgroundColor;
          const valuePulseQuality = initialNodes[2].style.backgroundColor;
          if(valueHeartRate == '#ff4c4c' || valueSystolicBP == '#ff4c4c' || valuePulseQuality == '#ff4c4c')
          {
            node.style = { ...node.style, backgroundColor: '#ff4c4c' };
            var count = getColorCount(valueHeartRate)+getColorCount(valueSystolicBP)+getColorCount(valuePulseQuality);
            const bucket1val = `${node.const_label}=(${count})`;
            node.data = {label : bucket1val};
          }
          // if(valueHeartRate == '#33ff33' && valueSystolicBP == '#33ff33' && valuePulseQuality == '#33ff33'){
          else if(valueHeartRate == '#33ff33' || valueSystolicBP == '#33ff33' || valuePulseQuality == '#33ff33')
          {
            node.style = { ...node.style, backgroundColor: '#33ff33' };
            node.data = {label : "Bucket 1"}
          }
        }

        //Calculations for Bucket 2
        if(node.id == 11 && ageObject)
        {
          const valueTemp = initialNodes[4].style.backgroundColor;
          if(valueTemp == '#ff4c4c')
          {
            node.style = { ...node.style, backgroundColor: '#ff4c4c' };
            const bucket2val = `${node.const_label}=(${1})`;
            node.data = {label : bucket2val};
          }
          else if(valueTemp == '#33ff33')
          {
            node.style = { ...node.style, backgroundColor: '#33ff33' };
            node.data = {label : "Bucket 2"};
          }
        }

        //Calculations for Perfusion from CapRefill and SkinColor
        if(node.id == 6 && ageObject)
        {
          const valueCapRefil = initialNodes[6].style.backgroundColor;
          const valueSkinColor = initialNodes[7].style.backgroundColor;
          if(!(valueCapRefil === "white" || valueSkinColor === "white"))
          {
            if(valueCapRefil == '#ff4c4c' || valueSkinColor == '#ff4c4c')
            {
              node.style = { ...node.style, backgroundColor: '#ff4c4c' };
            }
            else if(valueCapRefil == '#33ff33' || valueSkinColor == '#33ff33')
            {
              node.style = { ...node.style, backgroundColor: '#33ff33' };
            }
          }
        }

        //Calculations for Mental Status (Behavior)
        if(node.id == 5)
        {
          if(organDTValueforBehavior)
          {
            const ment_bev = `${node.const_label}=(${organDTValueforBehavior})`
            node.data  = {label : ment_bev} ;
          }
          const checkBehavior = OrganDTConfig[6].measurements[`${node.digikey}`].options[organDTValueforBehavior];
          if(ageObject)
          {
            if(checkBehavior == 2)
            {
              node.style = { ...node.style, backgroundColor: '#33ff33' };
            }
            if(checkBehavior == 1 || checkBehavior == 0)
            {
              node.style = { ...node.style, backgroundColor: '#ff4c4c' };
            }
          }
        }

        //Calculations for Bucket 3 using Perfusion and MentalStatus
        if(node.id == 12 && ageObject)
        {
          const valueBehavior = initialNodes[5].style.backgroundColor;
          const valuePerfusion = initialNodes[8].style.backgroundColor;
          if(valueBehavior == '#ff4c4c' || valuePerfusion == '#ff4c4c')
          {
            node.style = { ...node.style, backgroundColor: '#ff4c4c' };
            var count = getColorCount(valueBehavior)+getColorCount(valuePerfusion);
            const bucket3 = `${node.const_label}=(${count})`
            node.data = {label : bucket3} ;
          }
          else if(valueBehavior == '#33ff33' || valuePerfusion == '#33ff33')
          {
            node.style = { ...node.style, backgroundColor: '#33ff33' };
            const bucket3 = node.const_label
            node.data = {label : bucket3} ;
          }

        }

        //Calculations for Sepsis Detection
        if(node.id == 13 && ageObject)
        {
          const valueBucket1 = initialNodes[12].style.backgroundColor;
          const valueBucket2 = initialNodes[13].style.backgroundColor;
          const valueBucket3 = initialNodes[14].style.backgroundColor;
          if(!(valueBucket1 === "white" || valueBucket2 === "white" || valueBucket3 === "white"))
          {
            if(valueBucket1 == '#ff4c4c' && valueBucket2 == '#ff4c4c' && valueBucket3 == '#ff4c4c')
            {
              node.style = { ...node.style, backgroundColor: '#ff4c4c' };
            }
            else if(valueBucket1 == '#33ff33' || valueBucket2 == '#33ff33' || valueBucket3 == '#33ff33')
            {
              node.style = { ...node.style, backgroundColor: '#33ff33' };
            }
          }
        }
        return node;
      })
    );
  }, [organDTValue, ageObject]);

  return (
    <div
      style={{
        height: '75vh',
        width: '75vw',
        margin: 'auto',
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        //onNodesChange={onNodesChange}
        //onEdgesChange={onEdgesChange}
        minZoom={1}
        maxZoom={1}
        attributionPosition="bottom-left"
        fitView
        //canUserMoveNodes={true}
        onMove={false}
      >
      </ReactFlow>
    </div>
  )
};

export default ThreeBucket;
