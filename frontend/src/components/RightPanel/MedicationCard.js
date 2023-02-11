import { useSelector, useDispatch } from "react-redux";
import { add } from "../../redux/reducers/drugs";

import {
  TextField, Button, Grid, Autocomplete, Typography, Box
} from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  card:{
    background: "lightcyan",
    borderRight: "solid 1px",
    borderBottom: "solid 1px",
    borderColor: "black",
    borderRadius: "2px",
    height: "150px"
  },
  box:{
    display: "block",
    height: "100%",
    marginLeft: "10px",
    marginRight: "10px",
  },
  title: {
    background: "white",
    textAlign: "center",
    fontWeight: "bold"
  },
  unit: {
    float: "right",
    marginTop: "10px"
  },
  button: {
    textAlign: "center",
    height: "40px",
    backgroundColor: "gray",
    color: "white",
    float: "right",
    marginTop: "5px"
  },
}));

const DoseDropdown = ({options}) => {
  return (
    <Autocomplete
      freeSolo
      options={options}
      renderInput={(params) => <TextField {...params} label="dosage" />}
    />
  );
}

const MedicationCard = (config) => {
  const classes = useStyles();
  const [inputCount, setInputCount] = useState(config.dosage[0]);
  const count = useSelector((state) => state.drug[config.name].count);
  const lastts = useSelector((state) => state.drug[config.name].lastts);
  const dispatch = useDispatch();

  return (
    <Grid item xs={6} className={classes.card} key={config.name}>
      <Typography className={classes.title}>{config.name}</Typography>
      <Box display={'flex'} marginTop={"10px"}>
        <Box width={'60%'} className={classes.box}>
          <DoseDropdown options={config.dosage} />
        </Box>
        <Box width={'40%'} className={classes.box}>
          <Typography className={classes.unit}>{config.unit}</Typography>
        </Box>
      </Box>
      <Box display={'flex'}>
        <Box width={'60%'} className={classes.box}>
          <Typography>Count: {count}</Typography>
          <Typography>Last time: {lastts}</Typography>
        </Box>
        <Box width={'40%'} className={classes.box}>
          <Button className={classes.button}>Give</Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default MedicationCard;
