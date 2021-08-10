import { useState } from "react";

import {
  TextField,
  MenuItem,
  Button,
  Grid,
  makeStyles,
} from "@material-ui/core";

const checkLists = { "Culture Checklist": [], "History & General Condition Checklist": [] };

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  select: {
    marginTop: "10px"
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
              <Button className={classes.button}>{value}</Button>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
