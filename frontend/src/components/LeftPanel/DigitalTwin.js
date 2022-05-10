import { useState } from "react";
import { useSelector } from "react-redux";
import { pick } from "lodash";
import { Button, Grid, Typography, Box, Tabs, Tab } from "@mui/material";
import { OrganDTConfig } from "../../resources/DigitalTwinConfigReorganized";
import InputDialog from "./InputDialog";

const assessments = ["Age", "Weight", "Height", "Gender"];

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
      {OrganDTConfig.map((value, index) => {
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
  const organName = OrganDTConfig[selectedDT].name;
  const measurements = OrganDTConfig[selectedDT].measurements;
  const organDTValue = useSelector((state) => state.organDT[organName]);

  console.log(organDTValue);
  return (
    <>
      <Grid container>
        {Object.keys(measurements).map((key) => {
          const range = measurements[key].getThres ? measurements[key].getThres({}) : {low: 0, high: 0}
          const colorcode = organDTValue[key] > range?.high || organDTValue[key] < range?.low ? "red" : "lightgray"

          return (
            <Grid
              item
              xs={6}
              sx={{
                height: "80px",
                boxShadow:
                  "2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset",
                backgroundColor: colorcode,
              }}
            >
              <div>
                {measurements[key]?.name}{" "}
                {measurements[key]?.unit
                  ? `(${measurements[key]?.unit})`
                  : null}
              </div>
              <div>{organDTValue[key]}</div>
              <div>{/*Last updated time:*/}</div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

const SystematicAssessmentForm = ({ selectedDT }) => {
  const assessments = { Sepsis: '', "Septic shock": '', SIRS: '', PEW: '' };
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
                {/* <br />
                30s ago */}
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

const OrganAssessmentForm = ({ selectedDT }) => {
  const assessments = OrganDTConfig[selectedDT].assessments;
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
                {assessments[key].name}{": "}
                {assessments[key].value ? assessments[key].value : null}
              </div>
              {/* <div>Last updated time:</div> */}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

const OrganSelection = ({ selectedDT, setSelectedDT }) => {
  return (
    <Tabs
      value={selectedDT} 
      onChange={(e, v) => setSelectedDT(v)}
      textColor="primary"
      indicatorColor="primary"
    >
      {OrganDTConfig.map((organ, index) => {
        return (
          <Tab label={organ.name} value={index} key={index}/>
        );
      })}
    </Tabs>
  )
};

const DigitalTwin = () => {
  const [selectedDT, setSelectedDT] = useState(0);
  return (
    <Box width='100%' height='100%' display='flex' flexDirection='column'>
      <Typography height='5%' variant="h4" component="div">
        Patient Digital Twin
      </Typography>
      <PaitentBasic />
      <SystematicAssessmentForm {...{ selectedDT }} />
      <OrganSelection {...{ selectedDT, setSelectedDT }} />
      <OrganAssessmentForm {...{ selectedDT }} />
      <DigitalTwinForm {...{ selectedDT }} />
    </Box>
  );
};

export default DigitalTwin;
