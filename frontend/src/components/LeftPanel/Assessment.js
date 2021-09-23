import { useState } from "react";
import { Button, Grid, Typography, Box } from "@mui/material";

import { assessments } from "../../resources/DigitalTwinConfigReorganized";

const AssessmentSelection = ({ selectedAssessment, setSelectedAssessment }) => {
  return (
    <Grid container>
      {Object.keys(assessments).map((value) => {
        return (
          <Grid item xs={4} key={value}>
            <Button
              variant="contained"
              sx={{
                height: "50px",
                width: "100%",
              }}
              onClick={() => setSelectedAssessment(value)}
            >
              {value}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

const AssessmentForm = ({ selectedAssessment }) => {
  return (
    <>
      <Box sx={{ border: "1px solid black", width: "100%" }}>
        <Typography variant="h6" gutterBottom component="div">
          Current Score: 0
        </Typography>
      </Box>
      <Grid container>
        {assessments.SIRS.measurements.map((value) => {
          return (
            <Grid
              item
              xs={6}
              sx={{
                height: "100px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "black",
              }}
            >
              <div>
                {value?.name} {value?.unit === "" ? null : `(${value?.unit})`}
              </div>
              <div>Last updated time:</div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

const Assessment = () => {
  const [selectedAssessment, setSelectedAssessment] = useState(
    Object.keys(assessments)[0]
  );
  return (
    <>
      <Typography variant="h5" gutterBottom component="div">
        Assessments
      </Typography>
      <AssessmentSelection {...{ selectedAssessment, setSelectedAssessment }} />
      <AssessmentForm {...{ selectedAssessment }} />
    </>
  );
};

export default Assessment;
