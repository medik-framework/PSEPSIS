import { useState } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import SepsisBucketTree from "../../resources/guidelineimg/SepsisBucketTree.png";
import SepsisBucket from "../../resources/guidelineimg/SepsisBucket.png";
import VitalSigns from "../../resources/guidelineimg/VitalSigns.png";
import SepticShockTriage from "../../resources/guidelineimg/SepticShockTriage.png";
import RespiratoryDysfunction from "../../resources/guidelineimg/RespiratoryDysfunction.png";
import RenalDysfunction from "../../resources/guidelineimg/RenalDysfunction.png";
import CardioDysfunction from "../../resources/guidelineimg/CardioDysfunction.png";
import NeurologicDysfunction from "../../resources/guidelineimg/NeurologicDysfunction.png";
import HematologicDysfunction from "../../resources/guidelineimg/HematologicDysfunction.png";
import HepaticDysfunction from "../../resources/guidelineimg/HepaticDysfunction.png";
import Fluid from "../../resources/guidelineimg/Fluid.png";
import OSF_Inotrope from "../../resources/guidelineimg/OSF-Inotrope.png";
import OSFAntibiotics from "../../resources/guidelineimg/OSFAntibiotics.png";
import PEWS from "../../resources/guidelineimg/PEWS.png";
import PediatricSIRS from "../../resources/guidelineimg/PediatricSIRS.png";

const references = {
  "Sepsis Screening": [
    { name: "Bucket-based Diagnosis Tree", url: SepsisBucketTree },
    { name: "Bucket-Based Screening", url: SepsisBucket },
    { name: "Vital Sign thresholds", url: VitalSigns },
    { name: "Septic Shock Screening", url: SepticShockTriage },
  ],
  "Organ Dysfunction Assessments": [
    { name: "Respiratory Dysfunction", url: RespiratoryDysfunction },
    { name: "Renal Dysfunction", url: RenalDysfunction },
    { name: "Cardio Dysfunction", url: CardioDysfunction },
    { name: "Neurologic Dysfunction", url: NeurologicDysfunction },
    { name: "hematologic Dysfunction", url: HematologicDysfunction },
    { name: "Hepatic Dysfunction", url: HepaticDysfunction },
  ],
  "Sepsis Bundle": [
    { name: "Fluid Guideline", url: Fluid },
    { name: "Inotrope Guideline", url: OSF_Inotrope },
    { name: "Antibiotic Guideline", url: OSFAntibiotics },
  ],
  "Additional Scores": [
    { name: "PEWS", url: PEWS },
    { name: "Pediatric SIRS", url: PediatricSIRS },
  ],
};

export default function RichObjectTreeView() {
  const [modal, setModal] = useState({ open: false, url: "" });

  const handleClose = () => {
    setModal({ open: false, url: "" });
  };

  const renderTree = (nodes) => {
    return Object.keys(nodes).map((key) => (
      <TreeItem key={key} nodeId={key} label={key}>
        {nodes[key].map((reference) => {
          return (
            <>
              <TreeItem
                key={reference.name}
                nodeId={reference.name}
                label={reference.name}
                onClick={() => setModal({ open: true, url: reference.url })}
              />
              <Modal open={modal.open} onClose={handleClose}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <img
                    src={modal.url}
                    alt="Logo"
                    style={{ width: "70vw", height: "auto" }}
                  />
                </Box>
              </Modal>
            </>
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
    </TreeView>
  );
}
