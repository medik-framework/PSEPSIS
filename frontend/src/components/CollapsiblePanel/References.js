import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

import image30 from "../../resources/guidelineimg/30.png";

const references = {
  "Sepsis Screening": [
    { name: "Bucket-based Diagnosis Tree", url: "" },
    { name: "Bucket-Based Screening", url: "" },
    { name: "Vital Sign thresholds", url: "" },
    { name: "Septic Shock Screening", url: "" },
  ],
  "Organ Dysfunction Assessments": [
    { name: "Respiratory Dysfunction", url: "" },
    { name: "Renal Dysfunction", url: "" },
    { name: "Cardio Dysfunction", url: "" },
    { name: "Neurologic Dysfunction", url: "" },
    { name: "hematologic Dysfunction", url: "" },
    { name: "Hepatic Dysfunction", url: "" },
  ],
  "Sepsis Bundle": [
    { name: "Fluid Guideline", url: "" },
    { name: "Inotrope Guideline", url: "" },
    { name: "Antibiotic Guideline", url: "" },
  ],
  "Additional Scores": [
    { name: "PEWS", url: "" },
    { name: "Pediatric SIRS", url: "" },
  ],
};

export default function RichObjectTreeView() {
  const renderTree = (nodes) => {
    return Object.keys(nodes).map((key) => (
      <TreeItem key={key} nodeId={key} label={key}>
        {nodes[key].map((reference) => {
          return (
            <TreeItem
              key={reference.name}
              nodeId={reference.name}
              label={reference.name}
            />
          );
        })}
      </TreeItem>
    ));
  };

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(references)}
      <img src={image30} alt="Logo" />;
    </TreeView>
  );
}
