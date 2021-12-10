import { useState } from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { organsDT } from "../../resources/DigitalTwinConfigReorganized";
import InputDialog from "./InputDialog";

const PaitentBasic = () => {
  const assessments = {
    Age: "2y",
    Weight: "20kg",
    Height: "50cm",
    Gender: "male",
  };
  return (
    <>
      <Grid container marginBottom={"10px"}>
        {Object.keys(assessments).map((key) => {
          return (
            <Grid
              item
              xs={3}
              sx={{
                height: "30px",
                boxShadow:
                  "2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset",
                backgroundColor: "lightgray",
              }}
            >
              <div>
                {key}: {assessments[key]}
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

const DigitalTwinSelection = ({ selectedDT, setSelectedDT }) => {
  return (
    <Grid container sx={{ marginTop: "10px" }}>
      {organsDT.map((value, index) => {
        return (
          <Grid item xs={4} key={value}>
            <Button
              variant="contained"
              sx={{
                height: "50px",
                width: "100%",
                backgroundColor: selectedDT === index ? "#0062cc" : "#1976d2",
              }}
              onClick={() => setSelectedDT(index)}
            >
              {value.name}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

const DigitalTwinForm = ({ selectedDT }) => {
  const measurements = organsDT[selectedDT].measurements;
  const digitalTwinValue = useSelector((state) => state.DigitalTwin);

  console.log(digitalTwinValue);
  return (
    <>
      <Grid container>
        {Object.keys(measurements).map((key) => {
          return (
            <Grid
              item
              xs={6}
              sx={{
                height: "80px",
                boxShadow:
                  "2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset",
                backgroundColor: "lightgray",
              }}
            >
              <div>
                {measurements[key]?.name}{" "}
                {measurements[key]?.unit
                  ? `(${measurements[key]?.unit})`
                  : null}
              </div>
              <div>{digitalTwinValue[selectedDT][key]?.value}</div>
              <div>Last updated time:</div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

const SystematicAssessmentForm = ({ selectedDT }) => {
  const assessments = { Sepsis: 2, "Septic shock": 1, SIRS: 1, PEW: 1 };
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            height: "30px",
            boxShadow:
              "2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset",
            backgroundColor: "yellow",
          }}
        >
          <div>Screening Status: Presume Sepsis</div>
        </Grid>
        {Object.keys(assessments).map((key) => {
          return (
            <Grid
              item
              xs={3}
              sx={{
                height: "50px",
                boxShadow:
                  "2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset",
                backgroundColor: "yellow",
              }}
            >
              <div>
                {key}: {assessments[key]}
                <br />
                30s ago
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

const OrganAssessmentForm = ({ selectedDT }) => {
  const assessments = organsDT[selectedDT].assessments;
  if (!assessments) {
    return null;
  }
  const count = Object.keys(assessments).length;
  return (
    <>
      <Grid container>
        {Object.keys(assessments).map((key) => {
          return (
            <Grid
              item
              xs={12 / count}
              sx={{
                height: "80px",
                boxShadow:
                  "2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset",
                backgroundColor: "lightyellow",
              }}
            >
              <div>
                {assessments[key]?.name}{" "}
                {assessments[key]?.unit === ""
                  ? null
                  : `(${assessments[key]?.unit})`}
              </div>
              <div>Last updated time:</div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

const DigitalTwin = () => {
  const [selectedDT, setSelectedDT] = useState(0);
  return (
    <>
      <PaitentBasic />
      <SystematicAssessmentForm {...{ selectedDT }} />
      <DigitalTwinSelection {...{ selectedDT, setSelectedDT }} />
      <OrganAssessmentForm {...{ selectedDT }} />
      <DigitalTwinForm {...{ selectedDT }} />
    </>
  );
};

export default DigitalTwin;
