import { useDispatch, useSelector } from "react-redux";
import { set } from "../../redux/reducers/checklist.js"
import { checklists } from "../../resources/ChecklistConfig.js"

import {
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

const Checklist = ({ checklistName }) => {
  const dispatch = useDispatch();
  const items = checklists[checklistName];
  const checkedItems = useSelector((state) => state.checklist);
  const kEndpoint = useSelector((state) => state.endpoints.kEndpoint);

  const checkItem = (label) => {
    if (checkedItems[checklistName].includes(label)) {
      return;
    } else {
      dispatch(set({
        checklist: checklistName,
        item: label,
      }));
      if (Object.keys(checklists).includes(checklistName + " events")) {
        const idx = items.findIndex(i => i === label);
        const eventName = checklists[checklistName + " events"][idx];
        const data = {
          'source': 1,
          "timestamp": Date.now(),
          "eventName": eventName,
          "eventArgs": []
        }
        kEndpoint.sendMessage(JSON.stringify(data));
      }
    }
  };

  return (
    <FormGroup>
      {items.map((value) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems[checklistName]?.includes(value)}
              />
            }
            label={value}
            onChange={() => checkItem(value)}
            key={value}
          />
        );
      })}
    </FormGroup>
  );
}

export default Checklist;
