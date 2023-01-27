import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const Checklist = ({ inputConfig, setRetDict }) => {
  const [state, setState] = useState(inputConfig.options.reduce((p, v) => ({ ...p, [v]: false}), {}));
  const dispatch = useDispatch();

  useEffect(() => {
    const v = Object.keys(state).reduce((p, v) => state[v]===true ? p+1 : p, 0);
    setRetDict( prev => ({
      ...prev,
      [inputConfig.label]: v
    }));
    dispatch({
      type: inputConfig.storage,
      payload: {
        label: inputConfig.label,
        value: state
      }
    });
  }, [state, inputConfig])

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
