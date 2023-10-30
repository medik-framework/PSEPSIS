import React, { useEffect, useState } from 'react';
import {createSelector} from "@reduxjs/toolkit";
import ReactFlow, { useNodesState, useEdgesState, Handle } from 'reactflow';
import { useSelector } from 'react-redux';
import 'reactflow/dist/style.css';
import { parentNodes,childLevelOneNodes,childLevelTwoNodes,conditionalNodes,initialEdges } from '../../resources/ThreeBucketConfig';
import {ColorMap} from "../../resources/DigitalTwinConfigReorganized";

var initialNodes = [...parentNodes, ...childLevelOneNodes, ...childLevelTwoNodes, ...conditionalNodes];

const customNode = ({ id, data }) => {
  return (
    <div>
      <Handle type="source" position="bottom" id={id} style={{ background: '#555' }} />
      <div style={{ padding: '14px', textAlign: 'center' }}><span style={{fontSize : 18}}>{data.myName}</span><br/>
      <span style={{fontSize : 19}}>{data.myVal}</span></div>
      <Handle type="target" position="top" id={id} style={{ background: '#555' }} />
    </div>
  );
}

const nodeTypes = {
  custom : customNode
}

const orGate = arr => {
  if (arr.length === 0) {
    return 'null';
  }
  const isNormal = arr.includes(false) ? false : arr.includes(true) ? true : 'null';
  return isNormal;
};

const andGate = arr => {
  const isNormal = arr.every(v => v === false) ? false : arr.every(v => v === true) ? true : 'null';
  return isNormal;
};

//USING CREATE SELECTOR TO GET STATES
const selectThreeBucketOrgans = createSelector(
  (state) => state.organDT,
  (organDT) => ({
    'HR': organDT.Cardiovascular.HR,
    'BP Sys': organDT.Cardiovascular['BP Sys'],
    'Pulse Quality': organDT.Cardiovascular['Pulse Quality'],
    'Capillary Refill':organDT.Cardiovascular['Capillary Refill'],
    'Skin Color': organDT.Cardiovascular['Skin Color'],
    'Temp': organDT.Immune.Temp,
    'Behavior': organDT.Neurologic.Behavior,
  }),
);

const getTreeData = (rawData, nodes, ageObject, hrcValue) => {
  //DATA NODES UPDATION
  const hrcTrueCount = Object.values(hrcValue).reduce(
    (acc, current) => acc = acc + (current ? 1 : 0),
    0
  );
  let updatedNodes = nodes.map(node => {
    if (Object.keys(rawData).includes(node.keys) && rawData[node.keys].value) {
      const colorValue = rawData[node.keys].isNormal;

      return {
        ...node,
        data: {
          ...node.data,
          myVal: typeof rawData[node.keys].value === 'string' ? rawData[node.keys].value : (rawData[node.keys].value % 1 !== 0 ? rawData[node.keys].value.toFixed(2) : rawData[node.keys].value)
        },
        anamoly: colorValue,
        style: {
          ...node.style,
          backgroundColor: ColorMap[colorValue]
        }
      };
    }
    else if (node.keys === "High Risk Conditions")
    {
      const colorStatus = hrcTrueCount ? false : true;
      const colorCode = ColorMap[colorStatus];
      return {
        ...node,
        data: {
          ...node.data,
          myVal: hrcTrueCount
        },
        anamoly: colorStatus,
        style: {
          ...node.style,
          backgroundColor: colorCode
        }
      };
    }
    else {
      return node;
    }
  });

  //UPDATE LEVEL 1 CHILD NODES
  updatedNodes = updatedNodes.map(node => {
    if (node.tag === 'orGate') {
      let dependentState = [];
      for (let i = 0; i < node.parents.length; i++) {
        if (Object.keys(rawData).includes(updatedNodes[node.parents[i]].keys) && rawData[updatedNodes[node.parents[i]].keys].value){
          dependentState.push(updatedNodes[node.parents[i]].anamoly);
        }
      }
      const getState = orGate(dependentState);
      const getcolor = ColorMap[getState];
      return {
        ...node,
        anamoly: getState,
        style: {
          ...node.style,
          backgroundColor: getcolor
        }
      };
    }
    else {
      return node;
    }
  });

  //UPDATE BUCKET 3
  const bucketThreeNode = updatedNodes['11'];
  let bucketThreeState = [];
  for (let i = 0; i < bucketThreeNode.parents.length; i++) {
    bucketThreeState.push(updatedNodes[bucketThreeNode.parents[i]].anamoly)
  }
  const getBucektThreeState = orGate(bucketThreeState);
  const getbucketThreecolor = ColorMap[getBucektThreeState];

  const bucketThreeUpdatedNode = {
    ...bucketThreeNode,
    anamoly: getBucektThreeState,
    style: {
      ...bucketThreeNode.style,
      backgroundColor: getbucketThreecolor
    }
  };
  updatedNodes['11'] = bucketThreeUpdatedNode;

  // UPDATE PSEPSIS NODE
  const sepsisNode = updatedNodes['12'];
  let sepsisState = [];
  for (let i = 0; i < sepsisNode.parents.length; i++) {
    sepsisState.push(updatedNodes[sepsisNode.parents[i]].anamoly)
  }
  const getsepsisState = andGate(sepsisState);
  const getsepsiscolor = ColorMap[getsepsisState];

  const sepsisUpdatedNode = {
    ...sepsisNode,
    anamoly: getsepsisState,
    style: {
      ...sepsisNode.style,
      backgroundColor: getsepsiscolor
    }
  };
  updatedNodes['12'] = sepsisUpdatedNode;

  return updatedNodes;
}

const ThreeBucket = () => {

  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  const organUpdates = useSelector(selectThreeBucketOrgans);
  const ageObject = useSelector((state) => state.patientBasic['Age']);
  const hrcValue = useSelector((state) => state.patientBasic['HighRiskConditions']);
  const [treeData, setTreeData] = useState([]);

  // Call getTreeData and set the state
  useEffect(() => {
    const data = getTreeData(organUpdates, nodes, ageObject, hrcValue);
    setTreeData(data);
  }, [organUpdates]);

  useEffect(() => {
    setNodes(treeData)
  }, [treeData]);

  return (
    <div style={{height: '75vh',width: '75vw',margin: 'auto',}} >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        minZoom={1}
        maxZoom={1}
        attributionPosition="bottom-left"
        fitView
        onMove={false}
        nodeTypes={nodeTypes}
      >
      </ReactFlow>
    </div>
  )
};

export default ThreeBucket;
