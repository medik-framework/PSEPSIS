import { ArcherContainer, ArcherElement } from "react-archer";

const colsStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  height: "auto"
};
const diagramStyle = {
  display: "grid",
  gridTemplateColumns: "auto"
};
const boxStyle = {
  margin: 20,
  padding: "10px",
  border: "1px solid grey",
  borderRadius: 3,
  fontFamily: "sans-serif",
  color: "grey"
};

const Diagram = (props) => (
  <div style={colsStyle}>
    <div>
      <ArcherContainer noCurves strokeColor="grey">
        <div style={diagramStyle}>
          <ArcherElement
            id="element2"
            relations={[
              {
                targetId: "element3",
                targetAnchor: "top",
                sourceAnchor: "bottom"
              }
            ]}
          >
            <div style={boxStyle}>Step 1</div>
          </ArcherElement>
          <ArcherElement
            id="element3"
            relations={[
              {
                targetId: "element4",
                targetAnchor: "top",
                sourceAnchor: "bottom"
              }
            ]}
          >
            <div style={boxStyle}>step 2</div>
          </ArcherElement>
          <ArcherElement id="element4">
            <div style={boxStyle}>Treatment Step 3</div>
          </ArcherElement>
        </div>
      </ArcherContainer>
    </div>
  </div>
);

export default Diagram;
