import { useEffect, useState } from "react";

import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const Checklist = ({ inputConfig, setStoreDict, setRetDict }) => {
  const [state, setState] = useState(inputConfig.options.reduce((p, v) => ({ ...p, [v]: false}), {}));

  useEffect(() => {
    const v = Object.keys(state).reduce((p, v) => state[v]===true ? p+1 : p, 0);
    setRetDict( prev => ({
      ...prev,
      eventArgs: [v]
    }));
    setStoreDict( prev => ({
      ...prev,
      label: inputConfig.label,
      value: state
    }));
  }, [state, inputConfig, setStoreDict, setRetDict])

  return(
    <FormGroup>
      {inputConfig.options.map((i, id) =>
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
