import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

const references = {
    "Sepsis Screening": ["Bucket-based Diagnosis Tree", "Bucket-Based Screening", "Vital Sign thresholds", "Septic Shock Screening"],
    "Organ Dysfunction Assessments": ["Respiratory Dysfunction", "Renal Dysfunction", "Cardio Dysfunction", "Neurologic Dysfunction", "hematologic Dysfunction", "Hepatic Dysfunction"],
    "Sepsis Bundle": ["Fluid Guideline", "Inotrope Guideline", "Antibiotic Guideline"],
    "Additional Scores": ["PEWS", "Pediatric SIRS"]
}

export default function RichObjectTreeView() {
    const renderTree = (nodes) => {return Object.keys(nodes).map(key => (
      <TreeItem key={key} nodeId={key} label={key}>
        {
          nodes[key].map(reference => { return (<TreeItem key={reference} nodeId={reference} label={reference} />) })
        }
      </TreeItem>
    ))};
  
    return (
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['root']}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(references)}
      </TreeView>
    );
  }