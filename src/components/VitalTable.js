import {useState} from "react";

import {Button, Grid, makeStyles} from '@material-ui/core';

import {sepsisCategory, sepsisMeasurements} from "./VitalTableSchema"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "400px"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState(sepsisCategory[0])
  
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {sepsisCategory.map(value => {
            return (
        <Grid item xs={4}>
          <Button className={classes.paper} onClick={() => setSelectedCategory(value)}>{value}</Button>
        </Grid>
            )
        })}
      </Grid>
      
      <Grid container spacing={3}>
        {sepsisMeasurements[selectedCategory].map(value => {
            return (
        <Grid item xs={6}>
          {value.name} {value.unit === "" ? null : `(${value.unit})`}
          
        </Grid>
            )
        })}
      </Grid>
    </div>
  );
}
