import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const Checklist = ({ config, setRetDict }) => { 
  const [state, setState] = useState(config.options.reduce((p, v) => ({ ...p, [v]: false}), {}));
  const dispatch = useDispatch();

  useEffect(() => {
    const v = Object.keys(state).reduce((p, v) => state[v]===true ? p+1 : p, 0);
    setRetDict( prev => ({ 
      ...prev,
      [config.label]: v
    }));
    dispatch({ 
      type: config.storage, 
      payload: { 
        label: config.label, 
        value: state
      }
    });
  }, [state, config])

  return(
    <FormGroup>
      {config.options.map((i, id) => 
        <FormControlLabel 
          control={<Checkbox
            onChange={(e) => setState({...state, [i]:e.target.checked})}
          />} 
          label={i} 
          key={id}
        />
      )}
    </FormGroup>
  )
}

export default Checklist;