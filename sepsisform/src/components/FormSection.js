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
                <Typography>
                    {key} {organDT.measurements[key]?.unit
                  ? `(${organDT.measurements[key]?.unit})`
                  : null}
                </Typography>
              <Controller
                key={key}
                name={key}
                control={control}
                render={({ field }) => <TextField variant="filled" {...field} />}
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
