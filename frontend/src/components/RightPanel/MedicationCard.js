import { useSelector, useDispatch } from "react-redux";
import { add } from "../../redux/reducers/drugs";
import { useInterval } from "react-use";

import {
  TextField, Button, Grid, Autocomplete, Typography, Box
} from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";
import { useState, useEffect } from "react";
import { unsetHighlight } from "../../redux/reducers/highlight";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  card:{
    borderRight: "solid 1px",
    borderBottom: "solid 1px",
    borderColor: "black",
    borderRadius: "2px",
    height: "auto"
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
  const [isHighlighted, setIsHighlighted] = useState(false);
  const highlight = useSelector((state) => state.highlight);
  const kEndpoint = useSelector((state) => state.endpoints.kEndpoint);

  useEffect(() => {
    if(highlight.highlightedMedication.includes(config.name)) {
      setIsHighlighted(true);
      const idx = highlight.highlightedMedication.indexOf(config.name);
      setInputDose(highlight.suggestedDosage[idx]);
    } else {
      setIsHighlighted(false);
    }
  }, [config, setIsHighlighted, setInputDose, highlight])

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
    <Grid item xs={6}
      sx={{ background: isHighlighted ? "yellow":"lightcyan" }}
      className={classes.card}
      key={config.name}
    >
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
                const ts = new Date().getTime();
                dispatch(add({
                  'timestamp': ts,
                  'name'     : config.name
                }));
                if(isHighlighted){
                  dispatch(unsetHighlight(config.name));
                }
                kEndpoint.sendMessage(JSON.stringify({
                  "eventName": "Confirm" + config.name.replace(/\s/g,'') + "Administered",
                  "eventArgs": []
                }))
                kEndpoint.sendMessage(JSON.stringify({
                  "destination": "datastore",
                  "eventName": "record_dose",
                  "eventArgs": [config.name, ts, dose]
                }))
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

const ComboEntry = ({ drug, order, setOrder }) => {
  const classes = useStyles();
  return (
    <Box key={drug.name} margin={"10px"}>
      <Typography width={"30%"} display={"inline-flex"}>{drug.name}</Typography>
      <Autocomplete
        freeSolo
        sx={{
          width: "40%",
          display: "inline-flex"
        }}
        key={drug.name}
        options={drug.dosage}
        renderInput={(params) => <TextField {...params} label="dosage"/>}
        value={order[drug.name].dose}
        onChange={(e,v) => setOrder({
          ...order,
          [drug.name]: {
            ...order[drug.name],
            "dose": v
          }
        })}
        inputValue={order[drug.name].inputDose}
        onInputChange={(e,v) => setOrder({
          ...order,
          [drug.name]: {
            ...order[drug.name],
            "inputDose": v
          }
        })}
      />
      <Typography className={classes.unit}>{drug.unit}</Typography>
    </Box>
  )
}

export const ComboCard = ({ config }) => {
  const classes = useStyles();
  let initOrder = {};

  for (const drug of config.drugs) {
    initOrder[drug.name] = {
      dose: drug.dosage[0],
      inputDose: drug.dosage[0]
    }
  }

  const [order, setOrder] = useState(initOrder);
  const dispatch = useDispatch();
  const kEndpoint = useSelector((state) => state.endpoints.kEndpoint);

  return(
    <Grid item xs={12} className={classes.card} key={config.title}>
      <Typography className={classes.title}>{config.title}</Typography>
      {config.drugs.map((drug, idx) =>
        <ComboEntry key={idx} {...{ drug, order , setOrder }}/>
      )}
      <Button
        className={classes.button}
        sx ={{marginRight: "10px", marginBottom:"10px"}}
        onClick={() => {
          const ts = new Date().getTime();
          for (const drug of config.drugs) {
            dispatch(add({
              'timestamp': ts,
              'name'     : drug.name
            }));
            kEndpoint.sendMessage(JSON.stringify({
              "destination": "datastore",
              "eventName": "record_dose",
              "eventArgs": [drug.name, ts,  order[drug.name].dose]
            }));
          }
        }}
      >
        Give
      </Button>
    </Grid>
  )
}
