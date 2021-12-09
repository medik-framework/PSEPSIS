import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

import { TextField } from "@mui/material";

import { Controller } from "react-hook-form";

export const FormSection = ({ organDT, control }) => {
  return (
    <Accordion expanded>
      <AccordionSummary>
        <Typography>{organDT.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          {Object.keys(organDT.measurements).map((key) => (
            <Grid xs={4} item>
              <Controller
                key={key}
                name={key}
                control={control}
                rules={{ required: true }}
                render={({ field }) => <TextField {...field} />}
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
