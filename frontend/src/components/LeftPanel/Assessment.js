import { useState } from "react";
import { Button, Grid } from "@mui/material";

import { assessments } from "../../resources/DigitalTwinConfigReorganized";

const Assessment = () => {
  const [selectedCategory, setSelectedCategory] = useState(assessments[0]);
  return (
    <Grid container>
      {Object.keys(assessments).map((value) => {
        return (
          <Grid item xs={3}>
            <Button
              variant="contained"
              sx={{
                textAlign: "center",
                height: "40px",
                width: "100%",
              }}
              onClick={() => setSelectedCategory(value)}
            >
              {value}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Assessment;
