import { useSelector, useDispatch } from "react-redux";

import {
  TextField, MenuItem, Button, Grid, Checkbox, Autocomplete, Typography, Box
} from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

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

  return (
    <Grid item xs={6} sx={{ backgroundColor: "mediumseagreen" }} key={config.name}>
      <Typography>{config.name}</Typography>
      <Box>
        <Box width={'60%'} display={'inline-block'}>
          <DoseDropdown options={config.dosage} />
        </Box>
        <Box width={'40%'} display={'inline-block'} textAlign={'center'}>
          {config.unit}
        </Box>
      </Box>
      <Box>
        <Box width={'60%'} display={'inline-block'}>
          <Typography>Count</Typography>
          <Typography>Last time</Typography>
        </Box>
        <Box width={'40%'} display={'inline-block'}>
          <Button className={classes.button}>Give</Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default MedicationCard;
