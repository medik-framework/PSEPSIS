import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { ArcherContainer, ArcherElement } from "react-archer";

const diagramStyle = {
  display: "grid",
  gridTemplateColumns: "auto",
};
const boxStyle = {
  margin: 20,
  padding: "10px",
  border: "1px solid grey",
  backgroundColor: "chartreuse",
  color: "black",
};

const Diagram = (props) => {
  const [value, setValue] = useState(0); // integer state

  function useForceUpdate() {
    return () => setValue((value) => value + 1); // update the state to force render
  }

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    forceUpdate();
  }, [value, forceUpdate]);

  return (
    <Grid container>
      <div style={{ width: "50%" }}>
        <ArcherContainer noCurves strokeColor="grey">
          <div style={diagramStyle}>
            <ArcherElement
              id="element2"
              relations={[
                {
                  targetId: "element3",
                  targetAnchor: "top",
                  sourceAnchor: "bottom",
                },
              ]}
            >
              <div style={boxStyle}>Sepsis Screening</div>
            </ArcherElement>
            <ArcherElement
              id="element3"
              relations={[
                {
                  targetId: "element4",
                  targetAnchor: "top",
                  sourceAnchor: "bottom",
                },
              ]}
            >
              <div style={boxStyle}>Presume Sepsis</div>
            </ArcherElement>
            <ArcherElement id="element4">
              <div style={boxStyle}>Septic Shock</div>
            </ArcherElement>
          </div>
        </ArcherContainer>
      </div>
      <div style={{ width: "50%" }}>
        <ArcherContainer noCurves strokeColor="grey">
          <div style={diagramStyle}>
            <ArcherElement
              id="element2"
              relations={[
                {
                  targetId: "element3",
                  targetAnchor: "top",
                  sourceAnchor: "bottom",
                },
              ]}
            >
              <div style={boxStyle}>OSF Fluid Therapy</div>
            </ArcherElement>
            <ArcherElement
              id="element3"
              relations={[
                {
                  targetId: "element4",
                  targetAnchor: "top",
                  sourceAnchor: "bottom",
                },
              ]}
            >
              <div style={boxStyle}>Update Fluid Resuscitation Checklist</div>
            </ArcherElement>
            <ArcherElement
              id="element4"
              relations={[
                {
                  targetId: "element5",
                  targetAnchor: "top",
                  sourceAnchor: "bottom",
                },
              ]}
            >
              <div style={boxStyle}>Administer 5-20 mL/kg Normal Saline</div>
            </ArcherElement>
            <ArcherElement
              id="element5"
              relations={[
                {
                  targetId: "element6",
                  targetAnchor: "top",
                  sourceAnchor: "bottom",
                },
              ]}
            >
              <div style={boxStyle}>Evaluate Fluid Responsiveness</div>
            </ArcherElement>
            <ArcherElement
              id="element6"
              relations={[
                {
                  targetId: "element7",
                  targetAnchor: "top",
                  sourceAnchor: "bottom",
                },
              ]}
            >
              <div style={boxStyle}>
                Physician's Input on Fluid Responsiveness
              </div>
            </ArcherElement>
            <ArcherElement id="element7">
              <div style={boxStyle}>Maintenance IV Fluid</div>
            </ArcherElement>
          </div>
        </ArcherContainer>
      </div>
    </Grid>
  );
};

export default Diagram;
