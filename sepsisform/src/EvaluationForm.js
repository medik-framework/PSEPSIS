import { useState } from "react";
import { useSelector } from "react-redux";

import { useForm, Controller } from "react-hook-form";
import { Button, Grid, Typography, TextField } from "@mui/material";

import { OrganDTConfig } from "./resources/DigitalTwinConfigReorganized";
import { MedicalAssessment } from "./resources/MedicalAssessmentConfig";
import { PatientBasic } from "./resources/PatientConfig";

import { FormSection } from "./components/FormSection";

const apiUrl = "https://psepsis.herokuapp.com/submit";

const OrganSelection = ({ selectedDT, setSelectedDT }) => {
  return (
    <Grid container sx={{ marginTop: "10px" }}>
      {OrganDTConfig.map((value, index) => {
        console.log(value)
        return (
          <Grid item xs={4} key={value.name}>
            <Button
              variant="contained"
              sx={{
                height: "50px",
                width: "100%",
                backgroundColor: selectedDT === index ? "#0062cc" : "#1976d2",
              }}
              onClick={() => setSelectedDT(index)}
            >
              {value.name}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

const OrganForm = ({ selectedDT, control }) => {
  const selectedOrganDTConfig = OrganDTConfig[selectedDT];
  const measurementsValue = useSelector((state) => state.OrganDT[OrganDTConfig[selectedDT].name]);
  // console.log(measurementsValue)
  return (
    <Grid container>
      {Object.keys(measurementsValue).map((key) => {
        if (selectedOrganDTConfig.measurements[key].type === "group") {
          return (
            <>{
                Object.keys(selectedOrganDTConfig.measurements[key].content).map((contentKey) => {
                  console.log(contentKey);
                  console.log(selectedOrganDTConfig.measurements[key].content[contentKey]);
                  return (
                    <Grid xs={4} item key={contentKey}>
                    <Typography>
                        {contentKey} {selectedOrganDTConfig.measurements[key].content[contentKey].unit
                      ? `(${selectedOrganDTConfig.measurements[key].content[contentKey].unit})`
                      : null}
                    </Typography>
                    <Controller
                      key={contentKey}
                      name={contentKey}
                      control={control}
                      render={({ field }) => <TextField variant="filled" {...field} />}
                      
                    />
                  </Grid>
                )
              })
            }</>
          )
        } else {
          return (
            <Grid xs={4} item key={key}>
              <Typography>
                  {key} {selectedOrganDTConfig.measurements[key]?.unit
                ? `(${selectedOrganDTConfig.measurements[key]?.unit})`
                : null}
              </Typography>
              <Controller
                key={key}
                name={key}
                control={control}
                render={({ field }) => <TextField variant="filled" {...field} />}
              />
            </Grid>
          )
        }
      })}
    </Grid>
  )
};

export const EvaluationForm = () => {
  const { handleSubmit, control, formState } = useForm({});
  const [selectedDT, setSelectedDT] = useState(0);
  
  const onSubmit = (data) => {console.log(data)
    data.timeStamp = new Date();
    fetch(apiUrl, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <OrganSelection {...{ selectedDT, setSelectedDT }}/>
      <OrganForm {...{ selectedDT, control }}/>
      {/* {OrganDTConfig.map((organDT) => (
        <FormSection control={control} organDT={organDT} key={organDT.name} />
      ))}
      <input type="submit" /> */}
    </form>
  );
};
