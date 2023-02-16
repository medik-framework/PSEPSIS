import { useState } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";

const references = {
  "Sepsis Screening": [
    { name: "Bucket-based Diagnosis Tree", url: "SepsisBucketTree" },
    { name: "Bucket-Based Screening", url: "SepsisBucket" },
    { name: "Vital Sign thresholds", url: "VitalSigns" },
    { name: "Septic Shock Screening", url: "SepticShockTriage" },
  ],
  "Organ Dysfunction Assessments": [
    { name: "Respiratory Dysfunction", url: "RespiratoryDysfunction" },
    { name: "Renal Dysfunction", url: "RenalDysfunction" },
    { name: "Cardio Dysfunction", url: "CardioDysfunction" },
    { name: "Neurologic Dysfunction", url: "NeurologicDysfunction" },
    { name: "hematologic Dysfunction", url: "HematologicDysfunction" },
    { name: "Hepatic Dysfunction", url: "HepaticDysfunction" },
  ],
  "Sepsis Bundle": [
    { name: "Fluid Guideline", url: "Fluid" },
    { name: "Inotrope Guideline", url: "OSF-Inotrope" },
    { name: "Antibiotic Guideline", url: "OSFAntibiotics" },
  ],
  "Additional Scores": [
    { name: "PEWS", url: "PEWS" },
    { name: "Pediatric SIRS", url: "PediatricSIRS" },
  ],
};

export default function RichObjectTreeView() {
  const [dialog, setDialog] = useState({ open: false, url: ""});

  const handleClose = () => {
    setDialog({ open: false, url: "" });
  };

  const renderTree = (nodes) => {
    return Object.keys(nodes).map((key) => (
      <TreeItem key={key} nodeId={key} label={key}>
        {nodes[key].map((reference) => {
          return (
            <TreeItem
              key={reference.name}
              nodeId={reference.name}
              label={reference.name}
              onClick={() => setDialog({ open: true, url: reference.url })}
            />
          );
        })}
      </TreeItem>
    ));
  };

  return (
    <>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["root"]}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(references)}
      </TreeView>
      <Dialog open={dialog.open} onClose={handleClose} maxWidth={"lg"}>
        <DialogContent>
          <img
            src={process.env.PUBLIC_URL + 'guidelineimg/'+dialog.url+'.png'}
            alt={dialog.url}
            style={{ width: "60vw", height: "auto" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={false}
            onClick={handleClose}
          >
            return
          </Button>
        </DialogActions>
      </Dialog>
    </>

  );
}
