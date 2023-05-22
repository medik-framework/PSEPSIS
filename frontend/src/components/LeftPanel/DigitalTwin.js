import { useState } from "react";
import { useSelector } from "react-redux";
import { useInterval } from "react-use";

import { Button, Grid, Typography, Box, Tabs, Tab } from "@mui/material";

import { OrganDTConfig } from "../../resources/DigitalTwinConfigReorganized";

import InputDialog from "../DialogContent/InputDialog";

const PaitentBasic = () => {
  const age = useSelector((state) => state.patientBasic['Age'])
  const weight = useSelector((state) => state.patientBasic['Weight'])
  const [open, setOpen] = useState(false)
  const [info, setInfo] = useState({})

  return (
    <Grid>
      <Button
        sx={{
          width:'50%',
          textAlign:'left',
          fontSize: '16px'
        }}
        onClick={() => {
          setInfo({"args": ["get age"]})
          setOpen(true);
        }}
      >
        Age:{age.value ? (" "+age.value+" "+age.unit) : ''}
      </Button>
      <Button
        sx={{
          width:'50%',
          fontSize: '16px'
        }}
        onClick={() => {
          setInfo({"args": ["get weight"]})
          setOpen(true);
        }}
      >
        Weight:{weight.value ? (" "+weight.value+" "+weight.unit) : ''}
      </Button>
      {open && <InputDialog {...{ open, setOpen, info }}/>}
    </Grid>
  );
};

const DigitalTwinCell = ({ measurement, valueCombo, organName, ageObject}) => {
  const value = valueCombo.value;
  const timestamp = valueCombo.time;
  const mname = measurement.name;

  const get_colorcode = (measurement, value) => {
    if (!value || !ageObject) return 'lightgray';
    if(measurement.type === 'choices') {
      if (measurement.options[value] === 2) return '#33ff33';
      else return '#ff4c4c';
    }
    else {
      const range = measurement.getThres ? measurement.getThres(ageObject) : {low: 0, high: 0}
      if(value > range.high || value < range.low) return '#ff4c4c';
      if(value < range.high && value > range.low) return '#33ff33';
    }
  }

  const msecondToString = (msec) => {
    let min = Math.floor(Math.round(msec/1000)/60);
    let minstr = min >= 10 ?  min : '0' + min;
    let sec = Math.round(msec/1000) % 60;
    let secstr = sec >= 10 ? sec : '0' + sec;
    return minstr +':'+ secstr
  }

  const getDisplayValue = (oname, value, measurement) => {
    if (!value && value !== 0) return null;
    if (oname === 'Neurologic' && measurement.type === 'choices'){
      return measurement.options[value];
    } else return value;
  }

  const colorcode = get_colorcode(measurement, value);
  const [timeDiff, setTimeDiff] = useState(null);
  const displayValue = getDisplayValue(organName, value, measurement);

  useInterval(() => {
    if(timestamp) setTimeDiff(new Date().getTime() - timestamp)
  }, 1000);

  return (
    <Grid item xs={6}
      sx={{
        height: "80px",
        backgroundColor: colorcode,
        paddingLeft: "5px",
        border: '0.5px solid black',
        borderColor: 'black'
      }}
    >
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 'bold',
          display:'block'
        }}
      >
        {mname}
      </Typography>
      <Box
        sx={{
          width:'50%',
          display:'inline-block'
        }}
      >
        <Typography
        >
          {" "}{measurement.unit ? "("+measurement.unit+")":""}
        </Typography>
        <Typography sx={{alignSelf:"bottom"}}>
          {timestamp ? msecondToString(timeDiff)+' ago' : ''}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: '24px',
          width:'50%',
          float: 'right',
          display: 'inline-block',
          margin: 'auto'
        }}
      >
        {(displayValue || displayValue === 0) ? displayValue : ""}
      </Typography>
    </Grid>
  );
}

const DigitalTwinForm = ({ selectedDT }) => {
  const organName = OrganDTConfig[selectedDT].name;
  const measurements = OrganDTConfig[selectedDT].measurements;
  const organDTValue = useSelector((state) => state.organDT[organName]);
  const ageObject = useSelector((state) => state.patientBasic['Age']);


  return (
    <Grid container>
      {Object.keys(measurements).map((key) =>
        <DigitalTwinCell
          key={measurements[key].name}
          {...{
            measurement: measurements[key],
            valueCombo: organDTValue[measurements[key].name],
            organName: organName,
            ageObject: ageObject
          }}
        />
      )}
    </Grid>
  );
};

const SystematicAssessmentForm = ({ selectedDT }) => {
  const config = [
    { displayName: "Sepsis", storeName: "sepsis"},
  ]
  const diagnosisValue = useSelector((state) => state.diagnosis)

  return (
      <Grid container>
        {config.map((diagnosis, idx) => {
          return (
            <Grid
              item
              xs={6}
              sx={{
                height: "50px",
                backgroundColor: "white",
                border: '0.5px solid black',
              }}
              key={idx}
            >
              <div>
                { diagnosis.displayName }: {
                  diagnosisValue[diagnosis.storeName] === null ?
                  "" : (diagnosisValue[diagnosis.storeName]).toString()
                }
              </div>
            </Grid>
          );
        })}
      </Grid>
  );
};

const OrganSelection = ({ selectedDT, setSelectedDT }) => {
  return (
    <Tabs
      value={selectedDT}
      onChange={(e, v) => setSelectedDT(v)}
      textColor="primary"
      indicatorColor="primary"
    >
      {OrganDTConfig.map((organ, index) =>
        <Tab
          sx={{
            padding: 1,
            minWidth: 0,
          }}
          icon={<img
            hight={50}
            width={50}
            src={process.env.PUBLIC_URL + 'organicons/'+organ.name+'.png'}
            alt={organ.name+'_icon'}
          />}
          value={index}
          key={index}
        />
      )}
    </Tabs>
  )
};

const DigitalTwin = () => {
  const [selectedDT, setSelectedDT] = useState(0);

  return (
    <Box width='100%' height='100%' display='flex' flexDirection='column'>
      <PaitentBasic />
      <SystematicAssessmentForm {...{ selectedDT }} />
      <OrganSelection {...{ selectedDT, setSelectedDT }} />
      <DigitalTwinForm {...{ selectedDT }} />
    </Box>
  );
};

export default DigitalTwin;
