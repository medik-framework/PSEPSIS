import { DigitalTwinCell } from "../LeftPanel/DigitalTwin.js"
import * as OrganConfigs from "../../resources/DigitalTwinConfigReorganized.js"
import { useSelector } from "react-redux";

const MeasurementCell = ({ organName, measurementName }) => {
  const measurementConfig = OrganConfigs[organName]['measurements'][measurementName];
  const valueCombo = useSelector((state) => state.organDT[organName][measurementConfig.name]);
  const ageObject = useSelector((state) => state.patientBasic['Age']);
  return (
    <DigitalTwinCell
      key={measurementName}
      { ...{
        measurement: measurementConfig,
        valueCombo: valueCombo,
        organName: organName,
        ageObject: ageObject
      }}
    />
  )
}

const MeasurementCells = ({ inputConfig, setStoreDict, setRetDict}) => {
  return (
    <div>
      {inputConfig.cells.map((e) => <MeasurementCell key={e[1]} organName={e[0]} measurementName={e[1]} />)}
    </div>
  );
}

export default MeasurementCells;
