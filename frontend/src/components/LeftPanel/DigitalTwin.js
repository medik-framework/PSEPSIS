import { useState } from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { organsDT } from "../../resources/DigitalTwinConfigReorganized";
import InputDialog from "./InputDialog"

const DigitalTwinSelection = ({ selectedDT, setSelectedDT }) => {
  return (
    <Grid container>
      {organsDT.map((value, index) => {
        return (
          <Grid item xs={4} key={value}>
            <Button
              variant="contained"
              sx={{
                height: "50px",
                width: "100%",
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
  const measurements = organsDT[selectedDT].measurements
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedMeasurement, setSelectedMeasurement] = useState(measurements[Object.keys(measurements)[0]])
  const digitalTwinValue = useSelector((state) => state.DigitalTwin)
  
  console.log(digitalTwinValue)
  return (
    <>
      <InputDialog open={dialogOpen} {...{setDialogOpen, selectedMeasurement}}/>
      <Grid container>
        {Object.keys(measurements).map((key) => {
          return (
            <Grid
              item
              xs={6}
              sx={{
                height: "100px",
                boxShadow: "2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset"
              }}
              onClick={() => {
                setSelectedMeasurement(measurements[key])
                setDialogOpen(true)
              }}
            >
              <div>
                
                {measurements[key]?.name} {measurements[key]?.unit ? `(${measurements[key]?.unit})` : null}
              </div>
              <div>
                {digitalTwinValue[selectedDT][key]?.value}
                </div>
              <div>Last updated time:</div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};


const AssessmentForm = ({ selectedDT }) => {

  const assessments = organsDT[selectedDT].assessments
  if (!assessments) {
    return null
  }
  return (
    <>
      <Typography variant="h5" gutterBottom component="div">
        Assessments
      </Typography>
      <Box sx={{ boxShadow: "2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset", width: "100%" }}>
        <Typography align="center" variant="h6" component="div">
          Current Score: 0
        </Typography>
      </Box>
      <Grid container>
        {Object.keys(assessments).map((key) => {
          return (
            <Grid
              item
              xs={6}
              sx={{
                height: "100px",
                boxShadow: "2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset"
              }}
            >
              <div>
                {assessments[key]?.name} {assessments[key]?.unit === "" ? null : `(${assessments[key]?.unit})`}
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
  const [selectedDT, setSelectedDT] = useState(
    0
  );
  return (
    <>
      <Typography variant="h5" gutterBottom component="div">
        Digital Twins
      </Typography>
      <DigitalTwinSelection {...{ selectedDT, setSelectedDT }} />
      <DigitalTwinForm {...{ selectedDT }} />
      <AssessmentForm {...{ selectedDT }} />
    </>
  );
};

export default DigitalTwin;
