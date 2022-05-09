import "./App.css";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux';
import { update, increment } from './organDataSlice';
import { updateURL } from "./miscSlice";
import { useInterval } from 'usehooks-ts';

import { Button, Grid, Typography, TextField, Select, MenuItem, Box, Tabs, Tab } from "@mui/material";
import { OrganDTConfig } from "./resources/DigitalTwinConfigReorganized";

const OrganSelection = ({ selectedDT, setSelectedDT }) => {
  return (
    <Box sx={{ 
      borderBottom: 1, 
      borderColor: 'divider',
    }}>
      <Tabs value={selectedDT} onChange={(e, v) => setSelectedDT(v)}>
        {OrganDTConfig.map((organ, index) => {
          return (
            <Tab label={organ.name} value={index} key={index}/>
          );
        })}
      </Tabs>
    </Box>
  )
};

const OrganPage = ({ selectedDT }) => {
  const selectedOrganDTConfig = OrganDTConfig[selectedDT];
  return (
    <Grid container>
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
      
  }, [ delay, setDelay, elapse, setElapse, period, target, organName, config, dispatch])

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
    <Grid xs={3} item key={config.name} 
      sx={{ 
        margin:'2px', 
        backgroundColor:'#F0F8FF', 
        border: '2px solid #6495ED',
        borderRadius: '5px',
      }}
    >
      <Grid item xs={12}>
        <Typography sx={{fontSize:'24px', padding:'1px'}}>
            {config.name} {config.unit ? `(${config.unit})` : null}: {value ? +value.toFixed(2):null}
        </Typography>
      </Grid>
      <Grid container direction='row' sx={{margin:'2px'}}>
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
      {!delay && <Grid container direction='row' sx={{ margin:'2px' }}>
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
      {delay&&<Grid container direction='row' hidden={delay}>
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
    <Grid xs={3} item key={config.name} 
      sx={{ 
        margin:'2px', 
        backgroundColor:'#F0F8FF', 
        border: '2px solid #6495ED',
        borderRadius: '5px',
      }}
    >
      <Typography sx={{fontSize:'24px', padding:'1px'}}>
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
  const data = useSelector((state) => state.organData);
  const apiURL = useSelector((state) => state.misc['apiURL']);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(apiURL, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).catch(error => {
      console.log('Post error:', error)
    })
  }, [data, apiURL])

  return (
    <div className="App">
      <TextField
        id="url"
        sx={{fontSize:'18px', backgroundColor:'white', width:'50%'}}
        variant="outlined"
        value={apiURL}
        onChange={(e) => dispatch(updateURL(e.target.value))}
      />
      <OrganSelection {...{ selectedDT, setSelectedDT }}/>
      <OrganPage {...{ selectedDT }}/>
    </div>
  );
}

export default App;
