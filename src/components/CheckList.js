import { useState } from "react";

import {
  TextField,
  MenuItem,
  Button,
  Grid,
  Checkbox,
  makeStyles,
} from "@material-ui/core";

const checkLists = {
  "Culture Checklist": [
    "Urine culture obtained",
    "Blood culture obtained from venipuncture",
    "Blood culture obtained from line",
    "IV catheter culture obtained",
  ],
  "History & General Condition Checklist": [
    "High risk for pulmonary edema?",
    "History of renal insufficiency?",
    "History of immunodeficiency?",
    "Chronic steroid use/adrenal insufficiency?",
    "Unrepaired congenital heart disease?",
    "Indwelling vascular catheter or other invasive devices?",
    "History of pneumonia?",
  ],
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  select: {
    marginTop: "10px",
  },
  button: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "30px",
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const [checkListName, setCheckListName] = useState(
    Object.keys(checkLists)[0]
  );

  return (
    <div className={classes.root}>
      <TextField
        select
        fullWidth
        value={checkListName}
        className={classes.select}
        onChange={(event) => setCheckListName(event.target.value)}
      >
        {Object.keys(checkLists).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Grid container spacing={3}>
        {checkLists[checkListName].map((value) => {
          return (
            <Grid item xs={12}>
              <Checkbox />
              <Button className={classes.button}>{value}</Button>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
