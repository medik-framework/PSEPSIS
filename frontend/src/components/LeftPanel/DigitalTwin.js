import { useState } from "react";
import { Button, Grid, Typography, Box } from "@mui/material";

import { organDTs } from "../../resources/DigitalTwinConfigReorganized";

const DigitalTwinSelection = ({ selectedDT, setSelectedDT }) => {
  return (
    <Grid container>
      {organDTs.map((value) => {
        return (
          <Grid item xs={4} key={value}>
            <Button
              variant="contained"
              sx={{
                height: "50px",
                width: "100%",
              }}
              onClick={() => setSelectedDT(value.name)}
            >
              {value.name}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

const DigitalTwinForm = ({ selectedDT }) => {
  return (
    <>
      <Box sx={{ border: "1px solid black", width: "100%" }}>
        <Typography align="center" variant="h6" gutterBottom component="div">
          Current Score: 0
        </Typography>
      </Box>
      <Grid container>
        {organDTs[0].map((value) => {
          return (
            <Grid
              item
              xs={6}
              sx={{
                height: "100px",
                border: "1px solid black"
              }}
            >
              <div>
                {value?.name} {value?.unit === "" ? null : `(${value?.unit})`}
              </div>
              <div>Last updated time:</div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

const DigitalTwin = () => {
  const [selectedDT, setSelectedDT] = useState(
    organDTs[0].name
  );
  return (
    <>
      <Typography variant="h5" gutterBottom component="div">
        Digital Twins
      </Typography>
      <DigitalTwinSelection {...{ selectedDT, setSelectedDT }} />
      <DigitalTwinForm {...{ selectedDT }} />
    </>
  );
};

export default DigitalTwin;
