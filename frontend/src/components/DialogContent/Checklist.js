import { useEffect, useState } from "react";

import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const Checklist = ({ inputConfig, setStoreDict, setRetDict }) => {
  const [state, setState] = useState(inputConfig.options.reduce((p, v) => ({ ...p, [v]: false}), {}));

  useEffect(() => {
    setRetDict( prev => ({
      ...prev,
      eventArgs: Object.values(state)
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
