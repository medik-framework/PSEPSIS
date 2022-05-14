import "./App.css";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux';
import { update, increment } from './redux/organDataSlice';
import { updateURL } from "./redux/miscSlice";
import { useInterval } from 'usehooks-ts';

import { Button, Grid, Typography, TextField, Select, MenuItem, Box, Tabs, Tab } from "@mui/material";
import { OrganDTConfig } from "./resources/DigitalTwinConfigReorganized";

const OrganSelection = ({ selectedDT, setSelectedDT }) => {
  return (
    <Box>
      <Tabs
        orientation="vertical"
        value={selectedDT} 
        onChange={(e, v) => setSelectedDT(v)}
        textColor="primary"
        indicatorColor="primary"
      >
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
    <Grid container columns={{ xs: 6, sm: 6, md: 12, lg: 18, xl: 24}} spacing={1} p={1} sx={{ alignItems: 'stretch' }}>
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
    setTarget(null);
    setPeriod(null);
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
    <Grid item key={config.name} xs={6}>
      <Box bgcolor='#F0F8FF' border={2} borderColor='#6495ED' borderRadius={2} p={1} sx={{ height: 'calc(100% - 20px)'}}>
        <Typography sx={{ fontSize:'24px', width:'100%', display:'inline-block', textAlign:'center' }}>
            {config.name} {config.unit ? `(${config.unit})` : null}: {value ? +value.toFixed(2):null}
        </Typography>
        <Box sx={{ width:'100%', display:'inline-flex', flexDirection:'row', marginBottom:'5px'}}>
          <Typography sx={{ fontSize:'16px', width:'20%', margin:'auto', textAlign:'center'}}>
            Instantly update to: 
          </Typography>
          <TextField
            id={config.name}
            sx={{ fontSize:'18px', backgroundColor:'white', width:'55%', height:'100%', margin:'auto' }}
            variant="outlined" 
            type="number"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            disabled={!inputValue}
            sx={{ fontSize:'16px', width:'25%', marginLeft:'5px'}}
            variant="outlined"
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
        </Box>
        {!delay && 
          <Box sx={{ width:'100%', display:'inline-flex', flexDirection:'row'}}>
            <Typography sx={{ fontSize:'16px', width:'20%', margin:'auto', textAlign:'center'}}>
                Gradually update to: 
            </Typography>
            <TextField
                id='target'
                variant="outlined"
                sx={{ fontSize:'18px', backgroundColor:'white', width:'20%', height:'100%', margin:'auto' }}
                type="number"
                onChange={(e) => setTarget(Number(e.target.value))}
            />
            <Typography sx={{ fontSize:'16px', width:'7.5%', margin:'auto', textAlign:'center'}}>
                in
            </Typography>
            <TextField
                id='period'
                variant="outlined"
                sx={{ fontSize:'18px', backgroundColor:'white', width:'20%', height:'100%', margin:'auto' }}
                type="number"
                onChange={(e) => setPeriod(Number(e.target.value))}
            />
            <Typography sx={{ fontSize:'16px', width:'7.5%', margin:'auto', textAlign:'center'}}>
                sec
            </Typography>
            <Button
                sx={{ fontSize:'16px', width:'25%', marginLeft:'5px' }}
                variant="outlined"
                disabled={isNaN(value) || !target || !period}
                onClick={() => gradualUpdate(value)}
            >
                Confirm
            </Button>
          </Box>
        }
        {delay&&
          <Box sx={{ width:'100%', display:'inline-flex', flexDirection:'row'}}>
            <Typography sx={{ fontSize:'16px', width:'75%', margin:'auto', textAlign:'left'}}>
                Gradually updating to {target} in {period-elapse} secs.
            </Typography>
            <Button
                sx={{ fontSize:'16px', width:'25%', marginLeft:'5px' }}
                variant="outlined"
                onClick={() => resetInterval()}
            >
                Cancel
            </Button>
          </Box>
        }
      </Box>
    </Grid>
  )
}

const MeasurementSelect = ({ organName, config }) => {
  const value = useSelector((state) => state.organData[organName][config.name]);
  const dispatch = useDispatch();

  return (
    <Grid item key={config.name} xs={6}>
      <Box Box bgcolor='#F0F8FF' border={2} borderColor='#6495ED' borderRadius={2} p={1} sx={{ height: 'calc(100% - 20px)'}}>
        <Typography sx={{ fontSize:'24px', width:'100%', display:'inline-block', textAlign:'center' }}>
            {config.name} {config.unit ? `(${config.unit})` : null}
        </Typography>
        <Select
          sx={{ fontSize:'18px', display:'block', margin:'auto', marginTop:'20px', backgroundColor:'white', width:'70%' }}
          value={value? value:''}
          onChange={(e) => dispatch(update({value: e.target.value, organName: organName, measurementName: config.name}))}
        >
          {Object.keys(config.options).map((key) =>
            <MenuItem key={key} value={key}>{key}</MenuItem>
          )}
        </Select>
      </Box>
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
    <Box sx={{ display:'flex', flexDirection:'column' }}>
      <Box sx={{ display:'flex', width:'100vw' }}>
        <Box 
          sx={{ 
            height:'90vh', 
            width:'15vw', 
          }}
        >
          <OrganSelection {...{ selectedDT, setSelectedDT }}/>
        </Box>
        <Box 
          sx={{ 
            height:'90vh', 
            width:'85vw', 
          }}
        >
          <OrganPage {...{ selectedDT }}/>
        </Box>
      </Box>
      <Box>
        <TextField
          label="Set backend server API URL"
          id="url"
          sx={{fontSize:'18px', backgroundColor:'white', width:'40%', bottom: 0, right: 0, position:'absolute'}}
          variant="outlined"
          value={apiURL}
          onChange={(e) => dispatch(updateURL(e.target.value))}
        />
      </Box>
    </Box>
  );
}

export default App;
