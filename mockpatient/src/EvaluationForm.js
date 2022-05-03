import { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { Button, Grid, Typography, TextField, Select, MenuItem } from "@mui/material";

import { OrganDTConfig } from "./resources/DigitalTwinConfigReorganized";

const apiUrl = "https://psepsis.herokuapp.com/submit";

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

const MeasurementInput = ({ control, register, getValues, setValue, organName, measurement }) => {
  if (measurement.type === "choices") {
    return(
      <Grid xs={4} item key={measurement.name}>
        <Typography>
            {measurement.name} {measurement.unit ? `(${measurement.unit})` : null}
        </Typography>
        <select {...register(`${organName}.${measurement.name}`)}>
          {Object.keys(measurement.options).map((key) =>
            <option key={key} value={measurement.options[key]}>{key}</option>
          )}
        </select>
      </Grid>
    )
  } else {
    console.log(getValues(`${organName}.${measurement.name}`))
    return(
      <Grid xs={4} item key={measurement.name}>
        <Typography>
            {measurement.name} {measurement.unit ? `(${measurement.unit})` : null}
        </Typography>
        <Typography>
            Current value: {getValues(`${organName}.${measurement.name}`)}
        </Typography>
        <TextField
          variant="filled" 
          {...register(`${organName}.${measurement.name}`)}
        />
      </Grid>
    )
  }

}

const OrganForm = ({ selectedDT, control, register, getValues, setValue }) => {
  const selectedOrganDTConfig = OrganDTConfig[selectedDT];
  return (
    <Grid container >
      {Object.keys(selectedOrganDTConfig.measurements).map((key) => (
        <MeasurementInput
          key={`${selectedOrganDTConfig.name}.${selectedOrganDTConfig.measurements[key].name}`}
          { ...{ control,
                 register,
                 getValues,
                 setValue,
                 organName: selectedOrganDTConfig.name, 
                 measurement: selectedOrganDTConfig.measurements[key]
          }}
        />
      ))}
    </Grid>
  )
};

export const EvaluationForm = () => {
  const initialState = {}
  OrganDTConfig.map((organ) => {
    const measurements = organ.measurements;
    initialState[organ.name] = Object.keys(measurements).reduce((prev, measurementKey) => {
      prev[measurements[measurementKey].name] = null;
      return prev;
    }, {});
  });
  const { register, handleSubmit, control, getValues, setValue } = useForm({
    defaultValues: initialState
  });
  // console.log(getValues());
  const [selectedDT, setSelectedDT] = useState(0);
  
  const onSubmit = (data) => {console.log(data)
    data.timeStamp = new Date();
    fetch(apiUrl, {
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
      });};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="submit" />
      <OrganSelection {...{ selectedDT, setSelectedDT }}/>
      <OrganForm {...{ selectedDT, control, register, getValues, setValue }}/>
    </form>
  );
};
