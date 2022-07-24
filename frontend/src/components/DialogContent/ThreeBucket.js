import React from 'react';
import { ArcherContainer, ArcherElement } from "react-archer";

const rootStyle = {
  display: 'flex',
  justifyContent: 'center',
};
const rowStyle = {
  margin: '200px 0',
  display: 'flex',
  justifyContent: 'space-between',
};
const boxStyle = {
  padding: '10px',
  border: '1px solid black',
};

const nodeConfig = [
  [
    {key: '30', id: 'Cap Refill', label:'Cap Refill', targetId:'Perfusion'}, 
    {key: '31', id: 'Skin Color', label:'Skin Color', targetId:'Perfusion'}
  ],
  [
    {key: '20', id: 'Heart Rate', label:'Heart Rate', targetId:'Bucket 1'}, 
    {key: '21', id: 'Systolic BP', label:'Systolic BP', targetId:'Bucket 1'}, 
    {key: '22', id: 'Pulse Quality', label:'Pulse Quality', targetId:'Bucket 1'}, 
    {key: '23', id: 'Temperature', label:'Temperature', targetId:'Bucket 2'}, 
    {key: '24', id: 'Mental Status', label:'Mental Status', targetId:'Bucket 3'}, 
    {key: '25', id: 'Perfusion', label:'Perfusion', targetId:'Bucket 3'}, 
    {key: '26', id: 'High Risk Condition', label:'High Risk Condition', targetId:'Bucket 3'}, 
  ],
  [
    {key: '10', id: 'Bucket 1', label:'Bucket 1', targetId:'Sepsis'}, 
    {key: '11', id: 'Bucket 2', label:'Bucket 2', targetId:'Sepsis'}, 
    {key: '12', id: 'Bucket 3', label:'Bucket 3', targetId:'Sepsis'}, 
  ]
]

const ThreeBucket = () => {
  return (
    <div
      style={{
        height: '500px',
        margin: '50px',
      }}
    >
      <ArcherContainer strokeColor="red" startMarker endMarker>
        {nodeConfig.map((_, i) => (
            <div style={rowStyle} key={i}>
              {nodeConfig[i].map((_, j) => (
                <ArcherElement
                  key={nodeConfig[i][j].key}
                  id={nodeConfig[i][j].id}
                  relations={[
                    {
                      targetId: nodeConfig[i][j].targetId,
                      targetAnchor: 'top',
                      sourceAnchor: 'bottom',
                      style: { 
                        endShape: {
                          circle: { radius : 10 }
                        }
                      }
                    },
                  ]}
                >
                  <div style={boxStyle}>{nodeConfig[i][j].label}</div>
                </ArcherElement>
              ))}
            </div>
          ))
        }

        <div style={rootStyle}>
          <ArcherElement id="Sepsis">
            <div style={boxStyle}>Sepsis</div>
          </ArcherElement>
        </div>
      </ArcherContainer>

    </div>
  );
};

export default ThreeBucket;