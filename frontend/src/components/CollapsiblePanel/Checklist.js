import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../redux/reducers/checklist.js"
import { checklists } from "../../resources/ChecklistConfig.js"

import {
  TextField,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

export default function Checklist() {
  const [checklistName, setChecklistName] = useState(
    Object.keys(checklists)[0]
  );

  const dispatch = useDispatch();

  const checkedItems = useSelector((state) => state.checklist);

  const checkItem = (label) => {
    dispatch(toggle({
      checklist: checklistName,
      item: label,
    }));
  };

  return (
    <div>
      <TextField
        select
        fullWidth
        value={checklistName}
        sx={{
          marginTop: "10px",
        }}
        onChange={(event) => setChecklistName(event.target.value)}
      >
        {Object.keys(checklists).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <FormGroup>
        {checklists[checklistName].map((value) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems[checklistName]?.includes(value)}
                />
              }
              label={value}
              onChange={() => checkItem(value)}
              sx={{
                backgroundColor: checkedItems[checklistName]?.includes(value)
                  ? "yellow"
                  : "white",
              }}
              key={value}
            />
          );
        })}
      </FormGroup>
    </div>
  );
}
