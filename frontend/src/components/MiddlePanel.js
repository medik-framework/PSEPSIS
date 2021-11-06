import { useState } from "react";

import { Grid, FormGroup, FormControlLabel, Checkbox, Typography } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import makeStyles from "@mui/styles/makeStyles";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const bundleList = [
  "Start continuous cardiorespiratiory monitoring (pulse oximetry, HR, BP)",
  "Respiratory interventions. Administer oxygen to maintain SpO2 of at least 94%",
  "Obtain IV/IO",
  "POCT Lactic Acid / Blood Gas",
  "Complete Blood Count (CBC) WITH Diff",
  "Comprehensive Metablic Panel (CMP)",
  "Culture",
  "Give antibiotics",
  "Consider fluid resuscitation",
  "Infection Source Control. Consider diagnostic imaging based on patient's clinical exam",
  "Consider inotropic support early",
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  select: {
    marginTop: "10px",
  },
  button: {
    textAlign: "center",
    height: "30px",
  },
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 40,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <>
        <BorderLinearProgress variant="determinate" {...props} />
        <Typography variant="body2" color="white" sx={{position:"relative", top:"-30px", left:"50%"}}
        > 00:40:15 </Typography>
    </>
  );
}

export default function OneHourBundle() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom component="div">
        OSF PSepsis Bundle
      </Typography>
      <LinearProgressWithLabel variant="determinate" value={65} />
      <FormGroup>
        {bundleList.map((value) => {
          return (
            <Grid item xs={12}>
              <FormControlLabel control={<Checkbox />} label={value} />
            </Grid>
          );
        })}
      </FormGroup>
    </div>
  );
}
