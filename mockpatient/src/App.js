import "./App.css";
import { useState, useEffect, useRef } from "react";
import store from './store'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { update, increment } from './organDataSlice'
import { useInterval } from 'usehooks-ts'

import { Button, Grid, Typography, TextField, Select, MenuItem, Card } from "@mui/material";
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
  const [target, setTarget] = useState(null);
  const [period, setPeriod] = useState(null);
  const [elapse, setElapse] = useState(0);
  const [step, setStep] = useState(0);
  const value = useSelector((state) => state.organData[organName][config.name]);
  const dispatch = useDispatch();

  const resetInterval = () => {
    setDelay(null);
    setElapse(0);
  }

  useEffect(() => {
    if (delay && elapse === period){
      resetInterval();
      dispatch(update({value: target, organName: organName, measurementName: config.name}));
    }
      
  }, [ delay, setDelay, elapse, setElapse, period, target, organName, config])

  useInterval(() => {
    dispatch(increment({
      value: step, 
      organName: organName, 
      measurementName: config.name
    }));
    setElapse(elapse + 1);
  }, delay);

  const gradualUpdate = (startValue) => {
    setStep((target - startValue)/period);
    setDelay(1000);
  }

  return (
    <Grid xs={3} item spacing={1} key={config.name} 
      sx={{ 
        margin:'2px', 
        backgroundColor:'#F0F8FF', 
        border: '2px solid #6495ED',
        borderRadius: '5px',
      }}
    >
      <Grid xs={12}>
        <Typography sx={{fontSize:'24px', padding:'1px'}}>
            {config.name} {config.unit ? `(${config.unit})` : null}: {value ? +value.toFixed(2):null}
        </Typography>
      </Grid>
      <Grid container direction='row' xs={12} sx={{margin:'2px'}}>
        <Grid item xs={3}>
          <Typography sx={{fontSize:'16px'}}>
              Instantly update to: 
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id={config.name}
            sx={{fontSize:'18px', backgroundColor:'white'}}
            variant="outlined" 
            type="number"
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
              onClick={() => {
                resetInterval();
                dispatch(update({
                  value: Number(inputValue), 
                  organName: organName,
                  measurementName: config.name
                }));
              }}
          >
              Confrim
          </Button>
        </Grid>
      </Grid>
      {!delay && <Grid container direction='row' xs={12} sx={{ margin:'2px' }}>
        <Grid item xs={3}>
          <Typography>
              Gradually update to: 
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <TextField
              id='target'
              variant="outlined"
              sx={{fontSize:'18px', backgroundColor:'white'}}
              type="number"
              onChange={(e) => setTarget(Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={1}>
          <Typography>
              in
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <TextField
              id='period'
              variant="outlined"
              sx={{fontSize:'18px', backgroundColor:'white'}}
              type="number"
              onChange={(e) => setPeriod(Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={1}>
          <Typography>
              sec
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
              disabled={isNaN(value)}
              onClick={() => gradualUpdate(value)}
          >
              Confirm
          </Button>
        </Grid>
      </Grid>}
      {delay&&<Grid container direction='row' xs={12} hidden={delay}>
        <Grid item xs={9}>
          <Typography>
              Gradually updating to {target} in {period-elapse} secs.
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
              onClick={() => resetInterval()}
          >
              Cancel
          </Button>
        </Grid>
      </Grid>}
    </Grid>
  )
}

const MeasurementSelect = ({ organName, config }) => {
  const value = useSelector((state) => state.organData[organName][config.name]);
  const dispatch = useDispatch();

  return (
    <Grid xs={3} item spacing={1} key={config.name} 
      sx={{ 
        margin:'2px', 
        backgroundColor:'#F0F8FF', 
        border: '2px solid #6495ED',
        borderRadius: '5px',
      }}
    >
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
