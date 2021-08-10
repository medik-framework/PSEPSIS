import { useState } from "react";

import {
  TextField,
  MenuItem,
  Button,
  Grid,
  makeStyles,
} from "@material-ui/core";

const checkLists = { "high Risk List": [] };

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "400px",
  },
  button: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "30px",
  },
  tableCell: {
    height: "100px",
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
        id="standard-select-currency"
        select
        label="Select"
        value={checkListName}
        onChange={(event) => setCheckListName(event.target.value)}
        helperText="Please select your currency"
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
              <Button className={classes.button}>{value}</Button>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
