import { DigitalTwinCell } from "../LeftPanel/DigitalTwin.js"
import * as OrganConfigs from "../../resources/DigitalTwinConfigReorganized.js"
import { useSelector } from "react-redux";

const MeasurementCell = ({ organName, measurementName }) => {
  const measurementConfig = OrganConfigs[organName]['measurements'][measurementName];
  const valueCombo = useSelector((state) => state.organDT[organName][measurementConfig.name]);
  const ageObject = useSelector((state) => state.patientBasic['Age']);
  console.log(measurementName);
  console.log(valueCombo);
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
  console.log(inputConfig.cells);
  return (
    <div> {
      inputConfig.cells.map((e) => {
        console.log(e);
        console.log('Name is: ' + e[0]);
        return (<MeasurementCell organName={e[0]} measurementName={e[1]} />)
      }
      )}
    </div>
  );
}

export default MeasurementCells;
