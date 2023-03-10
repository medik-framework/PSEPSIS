import { useEffect, useState } from "react";
import { Box, TextField, Typography, MenuItem } from "@mui/material";

const NumericInput = ({ inputConfig, setStoreDict, setRetDict }) => {
  const [value, setValue] = useState("");
  const initUnit = Array.isArray(inputConfig.unit) ? inputConfig.unit[0] : inputConfig.unit;
  const [unit, setUnit] = useState(initUnit);

  useEffect(() => {
    if (value !== "") {
      setRetDict( prev => ({
        ...prev,
        eventArgs: [inputConfig.processReturn ? inputConfig.processReturn(value, unit) : value],
      }));
      setStoreDict( prev => ({
        ...prev,
        label: inputConfig.label,
        value: value,
        unit: unit
      }));
    }
  }, [value, unit, inputConfig, setStoreDict, setRetDict])

  const getUnitComp = (unitinputConfig) => {
    if (Array.isArray(unitinputConfig)) {
      return(
        <TextField
          select
          sx={{width: '50%'}}
          label='Unit'
          onChange={(e) => setUnit(e.target.value)}
          value={unit}
          defaultValue={unit}
        >
          {unitinputConfig.map((i, id) => <MenuItem key={id} value={i}>{i}</MenuItem>)}
        </TextField>
      )
    } else {
      return (
      <Typography
        width='50%'
        margin='auto'
        textAlign='center'
      >{unitinputConfig}</Typography>)
    }
  }

  return(
    <Box display='flex' flexDirection='row' margin={2}>
      <TextField
        width='50%'
        label={inputConfig.label}
        type={inputConfig.type}
        value={value}
        onChange={(e) => {
          if (inputConfig.type === 'number') { setValue(Number(e.target.value)) }
          else { setValue(e.target.value) }
        }}
      />
      {getUnitComp(inputConfig.unit)}
    </Box>
  )
}

export default NumericInput;
