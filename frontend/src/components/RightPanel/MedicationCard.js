import { useSelector, useDispatch } from "react-redux";
import { add } from "../../redux/reducers/drugs";
import { useInterval } from "react-use";
import useRemoteRequest from "../Utility/Hooks";

import {
  TextField, Button, Grid, Autocomplete, Typography, Box
} from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  card:{
    background: "lightcyan",
    borderRight: "solid 1px",
    borderBottom: "solid 1px",
    borderColor: "black",
    borderRadius: "2px",
    height: "150px"
  },
  box:{
    display: "block",
    height: "100%",
    marginLeft: "10px",
    marginRight: "10px",
  },
  title: {
    background: "white",
    textAlign: "center",
    fontWeight: "bold"
  },
  unit: {
    float: "right",
    marginTop: "10px"
  },
  button: {
    textAlign: "center",
    height: "40px",
    backgroundColor: "green",
    color: "white",
    float: "right",
    marginTop: "5px"
  },
}));

const MedicationCard = (config) => {
  const classes = useStyles();
  const [dose, setDose] = useState(config.dosage[0]);
  const [inputDose, setInputDose] = useState(config.dosage[0]);
  const [timeDiff, setTimeDiff] = useState(null);
  const count = useSelector((state) => state.drug[config.name].count);
  const lastts = useSelector((state) => state.drug[config.name].lastts);
  const dispatch = useDispatch();
  const [send] = useRemoteRequest();

  const msecondToString = (msec) => {
    let min = Math.floor(Math.round(msec/1000)/60);
    let minstr = min >= 10 ?  min : '0' + min;
    let sec = Math.round(msec/1000) % 60;
    let secstr = sec >= 10 ? sec : '0' + sec;
    return minstr +':'+ secstr
  }

  useInterval(() => {
    if(lastts) {
      setTimeDiff(msecondToString(new Date().getTime() - lastts))
    }
  }, 1000);

  return (
    <Grid item xs={6} className={classes.card} key={config.name}>
      <Typography className={classes.title}>{config.name}</Typography>
      <Box display={'flex'} marginTop={"10px"}>
        <Box width={'60%'} className={classes.box}>
          <Autocomplete
            freeSolo
            key={config.name}
            options={config.dosage}
            renderInput={(params) => <TextField {...params} label="dosage"/>}
            value={dose}
            onChange={(e,v) => setDose(v)}
            inputValue={inputDose}
            onInputChange={(e,v) => {
              setDose(v)
              setInputDose(v)
            }}
          />
        </Box>
        <Box width={'40%'} className={classes.box}>
          <Typography className={classes.unit}>{config.unit}</Typography>
        </Box>
      </Box>
      <Box display={'flex'}>
        <Box width={'60%'} className={classes.box}>
          <Typography>Count: {count}</Typography>
          <Typography>Elapse: {timeDiff}</Typography>
        </Box>
        <Box width={'40%'} className={classes.box}>
          <Button
            className={classes.button}
            onClick={() => {
                dispatch(add({
                  'timestamp': new Date().getTime(),
                  'name'     : config.name
                }));
                send('/record_dose', {
                  'name' : config.name,
                  'time' : new Date().getTime(),
                  'value': dose
                });
            }}
          >
            Give
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default MedicationCard;
