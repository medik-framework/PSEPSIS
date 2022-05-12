import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Box, TextField, Typography, MenuItem } from "@mui/material";

const NumericInput = ({ config, setRetDict }) => {
  const [value, setValue] = useState("");
  const initUnit = Array.isArray(config.unit) ? config.unit[0] : config.unit;
  const [unit, setUnit] = useState(initUnit);
  const dispatch = useDispatch();

  useEffect(() => {
    if (value != "") {
      setRetDict( prev => ({ 
        ...prev, 
        [config.label]: config.processReturn ? config.processReturn(value, unit) : value,
      }));
      dispatch({ 
        type: config.storage, 
        payload: { 
          label: config.label, 
          value: config.processStorage ? config.processStorage(value, unit) : value
        }
      });
    }
  }, [value, unit, setRetDict])

  const getUnitComp = (unitConfig) => {
    if (Array.isArray(unitConfig)) {
      return(
        <TextField
          select
          sx={{width: '50%'}}
          label='Unit'
          onChange={(e) => setUnit(e.target.value)}
          value={unit}
          defaultValue={unit}
        >
          {unitConfig.map((i, id) => <MenuItem key={id} value={i}>{i}</MenuItem>)}
        </TextField>
      )
    } else {
      return (
      <Typography 
        width='50%' 
        margin='auto'
        textAlign='center'
      >{unitConfig}</Typography>)
    }
  }
  
  return(
    <Box display='flex' flexDirection='row' margin={2}>
      <TextField
        width='50%'
        label={config.label} 
        type={config.type}
        value={value}
        onChange={(e) => {
          if (config.type === 'number') { setValue(Number(e.target.value)) }
          else { setValue(e.target.value) }
        }}
      />
      {getUnitComp(config.unit)}
    </Box>
  )
}

export default NumericInput;