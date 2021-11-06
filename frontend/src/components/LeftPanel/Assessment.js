import { useState } from "react";
import { Button, Grid, Typography, Box } from "@mui/material";

import { assessments } from "../../resources/MedicalAssessmentConfig";

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
      <Box
        sx={{
          boxShadow:
            "2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset",
          width: "100%",
        }}
      >

      </Box>
      <Grid container>
        {assessments[selectedAssessment].measurements.map((value) => {
          return (
            <Grid
              item
              xs={6}
              sx={{
                height: "100px",
                boxShadow:
                  "2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset",
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
  console.log(assessments);
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
