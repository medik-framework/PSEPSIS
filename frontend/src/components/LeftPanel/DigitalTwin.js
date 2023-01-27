import { useState } from "react";
import { useSelector } from "react-redux";
import { pick } from "lodash";
import { Button, Grid, Typography, Box, Tabs, Tab } from "@mui/material";
import { TabUnstyled, TabPanelUnstyled } from '@mui/base';
import { OrganDTConfig } from "../../resources/DigitalTwinConfigReorganized";
import InputDialog from "../DialogContent/InputDialog";

const assessments = ["Age", "Weight"];

const PaitentBasic = () => {
  return (
    <Grid container >
      <Button>
        Age:
      </Button>
      <Button>
        Weight:
      </Button>
      {/* {Object.keys(assessments).map((key) => {
        return (
          <Grid
            item
            xs={3}
            sx={{
              height: "30px",
              backgroundColor: "lightgray",
            }}
          >
            <div>
              {key}: {assessments[key]}
            </div>
          </Grid>
        );
      })} */}
    </Grid>
  );
};

const DigitalTwinForm = ({ selectedDT }) => {
  const organName = OrganDTConfig[selectedDT].name;
  const measurements = OrganDTConfig[selectedDT].measurements;
  const organDTValue = useSelector((state) => state.organDT[organName]);

  const get_colorcode = (range, value) => {
    if(value > range.high || value < range.low) return 'red';
    if(value < range.high && value > range.low) return 'green';
    else return 'lightgray';
    // if(isNaN(value) || isNaN(range)) return 'lightgray';
  }

  return (
    <Grid container>
      {Object.keys(measurements).map((key) => {
        const range = measurements[key].getThres ? measurements[key].getThres({}) : {low: 0, high: 0}
        const mname = measurements[key].name
        const colorcode = get_colorcode(range, organDTValue[mname]['value'])
        // organDTValue[mname]['value'] > range?.high || organDTValue[mname]['value'] < range?.low ? "red" : "green"

        return (
          <Grid
            item
            xs={6}
            sx={{
              height: "80px",
              boxShadow:
                "2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset",
              backgroundColor: colorcode,
            }}
          >
            <div>
              {measurements[key]?.name}{" "}
              {measurements[key]?.unit
                ? `(${measurements[key]?.unit})`
                : null}
            </div>
            <div>{organDTValue[mname]['value']}</div>
            <div>{/*Last updated time:*/}</div>
          </Grid>
        );
      })}
    </Grid>
  );
};

const SystematicAssessmentForm = ({ selectedDT }) => {
  const assessments = { Sepsis: '', "Septic shock": '', SIRS: '', PEW: '' };
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            height: "30px",
            boxShadow:
              "2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset",
            backgroundColor: "yellow",
          }}
        >
          <div>Screening Status: Presume Sepsis</div>
        </Grid>
        {Object.keys(assessments).map((key) => {
          return (
            <Grid
              item
              xs={3}
              sx={{
                height: "50px",
                boxShadow:
                  "2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset",
                backgroundColor: "yellow",
              }}
            >
              <div>
                {key}: {assessments[key]}
                {/* <br />
                30s ago */}
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

const OrganAssessmentForm = ({ selectedDT }) => {
  const assessments = OrganDTConfig[selectedDT].assessments;
  if (!assessments) {
    return null;
  }
  const count = Object.keys(assessments).length;
  return (
    <>
      <Grid container>
        {Object.keys(assessments).map((key) => {
          return (
            <Grid
              item
              xs={12 / count}
              sx={{
                height: "80px",
                boxShadow:
                  "2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset",
                backgroundColor: "lightyellow",
              }}
            >
              <div>
                {assessments[key].name}{": "}
                {assessments[key].value ? assessments[key].value : null}
              </div>
              {/* <div>Last updated time:</div> */}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

const OrganSelection = ({ selectedDT, setSelectedDT }) => {
  return (
    <Tabs
      value={selectedDT}
      onChange={(e, v) => setSelectedDT(v)}
      textColor="primary"
      indicatorColor="primary"
    >
      {OrganDTConfig.map((organ, index) =>
        <Tab
          sx={{
            padding: 1,
            minWidth: 0,
          }}
          icon={<img
            hight={50}
            width={50}
            src={process.env.PUBLIC_URL + 'organicons/'+organ.name+'.png'}
          />}
          value={index}
          key={index}
        />
      )}
    </Tabs>
  )
};

const DigitalTwin = () => {
  const [selectedDT, setSelectedDT] = useState(0);
  return (
    <Box width='100%' height='100%' display='flex' flexDirection='column'>
      {/* <Typography height='5%' variant="h4" component="div">
        Patient Digital Twin
      </Typography> */}
      <PaitentBasic />
      <SystematicAssessmentForm {...{ selectedDT }} />
      <OrganSelection {...{ selectedDT, setSelectedDT }} />
      <OrganAssessmentForm {...{ selectedDT }} />
      <DigitalTwinForm {...{ selectedDT }} />
    </Box>
  );
};

export default DigitalTwin;
