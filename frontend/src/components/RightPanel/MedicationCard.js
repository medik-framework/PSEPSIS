import { useSelector, useDispatch } from "react-redux";

import { TextField, MenuItem, Button, Grid, Checkbox } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

import { FLUIDS } from "../../resources/AntibioticsList";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  select: {
    marginTop: "10px",
  },
  button: {
    textAlign: "center",
    height: "30px",
    backgroundColor: "gray",
    color: "white",
  },
}));

const MedicationCard = (props) => {
  const classes = useStyles();
  const { FLUIDS, key2: key } = props;

  return (
    <Grid item xs={6} sx={{ backgroundColor: "mediumseagreen" }}>
      {key}
      {FLUIDS[key].value} {FLUIDS[key].unit}
      <Grid container>
        <Grid item xs={6}>
          Count
          <br />
          Last time
        </Grid>
        <Grid item xs={6}>
          <Button className={classes.button}>Give</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MedicationCard;
