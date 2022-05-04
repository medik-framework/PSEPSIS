import "./App.css";
import { useState, useEffect } from "react";
import store from './store'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { update, increment } from './organDataSlice'
import { useInterval } from 'usehooks-ts'

import { Button, Grid, Typography, TextField, Select, MenuItem } from "@mui/material";
import { OrganDTConfig } from "./resources/DigitalTwinConfigReorganized";

const OrganSelection = ({ selectedDT, setSelectedDT }) => {
  return (
    <Grid container sx={{ marginTop: "10px" }}>
      {OrganDTConfig.map((value, index) => {
        return (
          <Grid item xs={4} key={value.name}>
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

const OrganPage = ({ selectedDT }) => {
  const selectedOrganDTConfig = OrganDTConfig[selectedDT];
  return (
    <Grid container >
      {Object.keys(selectedOrganDTConfig.measurements).map((key) => {
        const config = selectedOrganDTConfig.measurements[key];
        if (config.type === 'number') {
          return (
            <MeasurementNumeric
              key={`${selectedOrganDTConfig.name}.${config.name}`}
              { ...{ organName: selectedOrganDTConfig.name, 
                     config: config
              }}
            />
          )
        } else {
          return (
            <MeasurementSelect
              key={`${selectedOrganDTConfig.name}.${config.name}`}
              { ...{ organName: selectedOrganDTConfig.name, 
                     config: config
              }}
            />
          )
        }
      })}
    </Grid>
  )
};

const MeasurementNumeric = ({ organName, config }) => {
  const [inputValue, setInputValue] = useState(null);
  const [delay, setDelay] = useState(null);
  const [delayTarget, setDelayTarget] = useState(null);
  const value = useSelector((state) => state.organData[organName][config.name]);
  const dispatch = useDispatch();
  let   itvl = null;
  let   nsteps = 0;

  function gradualUpdate(startValue, targetValue, delay) {
    const step = (targetValue - startValue)/delay;
    const stepCount = (targetValue - startValue)/step;
    itvl = setInterval(stepUpdate, 1000, step, stepCount, targetValue);
  }

  function stepUpdate(step, stepCount, targetValue) {
    dispatch(increment({
      value: step, 
      organName: organName, 
      measurementName: config.name
    }));
    nsteps++;
    if (stepCount === nsteps) {
      clearInterval(itvl);
      nsteps = 0;
      itvl = null;
      dispatch(update({value: targetValue, organName: organName, measurementName: config.name}));
    }
  }

  return (
    <Grid xs={4} item key={config.name}>
        <Typography>
            {config.name} {config.unit ? `(${config.unit})` : null}
        </Typography>
        <Typography>
            Current value: {value ? +value.toFixed(2):null}
        </Typography>
        <TextField
            id={config.name}
            variant="filled" 
            type="number"
            onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
            onClick={() => {
              dispatch(update({
                value: Number(inputValue), 
                organName: organName,
                measurementName: config.name
              }));
            }}
        >
            Confrim
        </Button>
        <TextField
            id='delay'
            variant="filled" 
            type="number"
            onChange={(e) => setDelayTarget(Number(e.target.value))}
        />
        <TextField
            id='target'
            variant="filled" 
            type="number"
            onChange={(e) => setDelay(Number(e.target.value))}
        />
        <Button
            disabled={isNaN(value)}
            onClick={() => gradualUpdate(value, delayTarget, delay)}
        >
            delay
        </Button>
    </Grid>
  )
}

const MeasurementSelect = ({ organName, config }) => {
  const value = useSelector((state) => state.organData[organName][config.name]);
  const dispatch = useDispatch();

  return (
    <Grid xs={4} item key={config.name}>
      <Typography>
          {config.name} {config.unit ? `(${config.unit})` : null}
      </Typography>
      <Select
        value={value? value:''}
        onChange={(e) => dispatch(update({value: e.target.value, organName: organName, measurementName: config.name}))}
      >
        {Object.keys(config.options).map((key) =>
          <MenuItem key={key} value={key}>{key}</MenuItem>
        )}
      </Select>
    </Grid>
  )
}

function App() {
  const [selectedDT, setSelectedDT] = useState(0);
  return (
    <div className="App">
      <Provider store={store}>
        <OrganSelection {...{ selectedDT, setSelectedDT }}/>
        <OrganPage {...{ selectedDT }}/>
      </Provider>
    </div>
  );
}

export default App;
