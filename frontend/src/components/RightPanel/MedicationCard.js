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
  card: {
    borderRight: "solid 1px",
    borderBottom: "solid 1px",
    borderColor: "black",
    borderRadius: "2px",
    height: "auto"
  },
  box: {
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
  cancelLogic: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    textAlign: "center",
    height: "40px",
    width: "75px",
    backgroundColor: "green",
    color: "white",
    marginTop: "5px"
  },
  cancelButton: {
    textAlign: "center",
    height: "40px",
    width: "75px",
    backgroundColor: "red",
    color: "white",
    marginTop: "5px",
    borderRadius: "5px",
  },


}));

const MedicationCard = (config) => {
  const classes = useStyles();
  const [dose, setDose] = useState(config.dosage[0]);
  const [inputDose, setInputDose] = useState(config.dosage[0]);
  const [timeDiff, setTimeDiff] = useState(null);
  const count = useSelector((state) => state.drug[config.name].count);
  const lastts = useSelector((state) => state.drug[config.name].lastts);
  const total_dosage = useSelector((state) => state.drug[config.name].total_dosage);
  const dispatch = useDispatch();
  const [isHighlighted, setIsHighlighted] = useState(0);
  const highlight = useSelector((state) => state.highlight);
  const kEndpoint = useSelector((state) => state.endpoints.kEndpoint);
  

  useEffect(() => {
    var foundKey = -1;
    if (highlight.highlightedMedication.includes(config.name)) {
      setIsHighlighted(1);
      foundKey = 0;
      const idx = highlight.highlightedMedication.indexOf(config.name);
      setInputDose(highlight.suggestedDosage[idx]);
    }
    if (foundKey === -1) {
      for (const key in highlight.highlightedMedicationPairs) {
        const values = highlight.highlightedMedicationPairs[key];
        const index = values.indexOf(config.name);
        if (index !== -1) {
          setIsHighlighted(2);
          setInputDose(highlight.suggestedDosagePairs[key][index]);
          foundKey = 0;
        }
      }
    }
    if (foundKey) {
      setIsHighlighted(false);
    }
  }, [config, setIsHighlighted, setInputDose, highlight])

  const msecondToString = (msec) => {
    let min = Math.floor(Math.round(msec / 1000) / 60);
    let minstr = min >= 10 ? min : '0' + min;
    let sec = Math.round(msec / 1000) % 60;
    let secstr = sec >= 10 ? sec : '0' + sec;
    return minstr + ':' + secstr
  }

  useInterval(() => {
    if (lastts) {
      setTimeDiff(msecondToString(new Date().getTime() - lastts))
    }
  }, 1000);


  const [confirm, setConfirm] = useState(false);
  const [buttonColor, setButtonColor] = useState("green");
  const [cancelButton, setCancelButton] = useState(false);

  return (
    <Grid item xs={6}
      sx={{ background: isHighlighted === 1 ? "yellow" : isHighlighted === 2 ? "orange" : "lightcyan" }}
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
            renderInput={(params) => <TextField {...params} label="dosage" />}
            value={dose}
            onChange={(e, v) => setDose(v)}
            inputValue={inputDose}
            onInputChange={(e, v) => {
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
          {/* Highlight total_dosage dynamically */}
          <Typography
            style={{
              color: total_dosage !== 0 ? "green" : "black", // Green for non-zero, black for zero
            }}
          >
            Total Dosage: {total_dosage}
          </Typography>
        </Box>
        <Box width={'40%'} className={classes.box}>
          <Box className="cancelLogic">
            <Button id="giveButton"
              className={classes.button}
              style={{ backgroundColor: buttonColor }}
              onClick={() => {
                if (confirm === true) {
                  setConfirm(false);
                  setButtonColor("green");
                  setCancelButton(false);
                  const ts = new Date().getTime();
                  dispatch(add({
                    'timestamp': ts,
                    'name'     : config.name,
                    'total_dosage': parseFloat(dose)
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
                } else {
                  setConfirm(true);
                  setButtonColor("orange");
                  setCancelButton(true);
                }
              }}
            >
              {confirm ? "Confirm" : "Give"}
            </Button>
            {cancelButton && (
                <button
                  className={classes.cancelButton}
                  onClick={() => {
                    setConfirm(false);
                    setButtonColor("green");
                    setCancelButton(false);
                  }}
                >
                  Cancel
                </button>
              )}
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default MedicationCard;

const ComboEntry = ({ drug, order, setOrder, dispatch, kEndpoint }) => {
  const classes = useStyles();
  const [confirm, setConfirm] = useState(false);
  const [buttonColor, setButtonColor] = useState("green");
  const [cancelButton, setCancelButton] = useState(false);
  const [dose, setDose] = useState(drug.dosage[0]);
  const [inputDose, setInputDose] = useState(drug.dosage[0]);

  const handleGiveClick = () => {
    if (confirm) {
      setConfirm(false);
      setButtonColor("green");
      setCancelButton(false);

      const ts = new Date().getTime();
      dispatch(
        add({
          timestamp: ts,
          name: drug.name,
          total_dosage: Number(order[drug.name].dose),
        })
      );
      kEndpoint.sendMessage(
        JSON.stringify({
          destination: "datastore",
          eventName: "record_dose",
          eventArgs: [drug.name, ts, order[drug.name].dose],
        })
      );
    } else {
      setConfirm(true);
      setButtonColor("orange");
      setCancelButton(true);
    }
  };
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
        renderInput={(params) => <TextField {...params} label="dosage" />}
        value={order[drug.name].dose}
        onChange={(e, v) => setOrder({
          ...order,
          [drug.name]: {
            ...order[drug.name],
            "dose": v
          }
        })}
        inputValue={order[drug.name].inputDose}
        onInputChange={(e, v) => setOrder({
          ...order,
          [drug.name]: {
            ...order[drug.name],
            "inputDose": v
          }
        })}
      />
      <Typography className={classes.unit}>{drug.unit}</Typography>
      <Button
        className={classes.button}
        style={{ backgroundColor: buttonColor }}
        onClick={handleGiveClick}
      >
        {confirm ? "Confirm" : "Give"}
      </Button>
      {cancelButton && (
        <button
          className={classes.cancelButton}
          onClick={() => {
            setConfirm(false);
            setButtonColor("green");
            setCancelButton(false);
          }}
        >
          Cancel
        </button>
      )}
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

  return (
    <Grid item xs={12} className={classes.card} key={config.title}>
      <Typography className={classes.title}>{config.title}</Typography>
      {config.drugs.map((drug, idx) =>
        // <ComboEntry key={idx} {...{ drug, order , setOrder }}/>
        // <MedicationCard key={idx} {...{ drug, order , setOrder }}/>
        // const conf = { ...config, ...drug };
        // return <MedicationCard key={idx} config={conf} />;

        <ComboEntry key={idx} {...{ drug, order, setOrder, dispatch, kEndpoint }}/>

      )}
      {/* <Box className="cancelLogic">
        <Button
          className={classes.button}
          style={{ backgroundColor: buttonColor }}
          sx ={{marginRight: "10px", marginBottom:"10px"}}
          onClick={() => {
            if (confirm === true) {
              setConfirm(false);
              setButtonColor("green");
              setCancelButton(false);

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
            } else {
              setConfirm(true);
              setButtonColor("orange");
              setCancelButton(true);
            }
          }}
        >
          {confirm ? "Confirm" : "Give"}
        </Button>
        {cancelButton && (
          <button
            className={classes.cancelButton}
            onClick={() => {
              setConfirm(false);
              setButtonColor("green");
              setCancelButton(false);
            }}
          >
            Cancel
          </button>
        )}

      </Box> */}
    </Grid>
  )
}
