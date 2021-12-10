import { useState, useEffect } from "react";

import { ArcherContainer, ArcherElement } from "react-archer";

const diagramStyle = {
  display: "grid",
  gridTemplateColumns: "auto",
};
const boxStyle = {
  margin: 20,
  padding: "10px",
  border: "1px solid grey",
  borderRadius: 3,
  fontFamily: "sans-serif",
  color: "grey",
};

const Diagram = (props) => {
  const [value, setValue] = useState(0); // integer state

  function useForceUpdate() {
    return () => setValue((value) => value + 1); // update the state to force render
  }

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    forceUpdate();
  }, [value]);

  return (
    <div>
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
  );
};

export default Diagram;
