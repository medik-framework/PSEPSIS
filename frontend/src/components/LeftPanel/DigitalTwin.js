import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";

import { pick } from "lodash";
import { Button, Grid, Typography, Box, Tabs, Tab } from "@mui/material";
import { TabUnstyled, TabPanelUnstyled } from '@mui/base';

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { OrganDTConfig } from "../../resources/DigitalTwinConfigReorganized";
import InputDialog from "../DialogContent/InputDialog";

import { DialogConfig } from "../../resources/DialogConfig";

const assessments = ["Age", "Weight"];

const PaitentBasic = () => {
  const age = useSelector((state) => state.patientBasic['Age'])
  const weight = useSelector((state) => state.patientBasic['Weight'])
  const [open, setOpen] = useState(false)
  const [info, setInfo] = useState({})

  return (
    <Grid>
      <Button
        onClick={() => {
          setInfo({"args": ["getAge"]})
          setOpen(true);
        }}
      >
        Age:{age.value ? (" "+age.value+" "+age.unit) : ''}
      </Button>
      <Button
        onClick={() => {
          setInfo({"args": ["getWeight"]})
          setOpen(true);
        }}
      >
        Weight:{weight.value ? (" "+weight.value+" "+weight.unit) : ''}
      </Button>
      {open && <InputDialog {...{ open, setOpen, info }}/>}
    </Grid>
  );
};

const DigitalTwinForm = ({ selectedDT }) => {
  const organName = OrganDTConfig[selectedDT].name;
  const measurements = OrganDTConfig[selectedDT].measurements;
  const organDTValue = useSelector((state) => state.organDT[organName]);
  const ageObject = useSelector((state) => state.patientBasic['Age']);

  const get_colorcode = (measurement, value) => {
    if (!value) return 'lightgray';
    if(measurement.type === 'choices') {
      if (measurement.options[value] === 2) return 'green';
      else return 'red';
    }
    else {
      const range = measurement.getThres ? measurement.getThres(ageObject) : {low: 0, high: 0}
      if(value > range.high || value < range.low) return 'red';
      if(value < range.high && value > range.low) return 'green';
    }
  }

  const msecondToString = (msec) => {
    let min = Math.floor(Math.round(msec/1000)/60);
    let minstr = min >= 10 ?  min : '0' + min;
    let sec = Math.round(msec/1000) % 60;
    let secstr = sec >= 10 ? sec : '0' + sec;
    return minstr +':'+ secstr
  }

  return (
    <Grid container>
      {Object.keys(measurements).map((key) => {
        const measurement = measurements[key];
        const mname = measurement.name;
        const colorcode = get_colorcode(measurement, organDTValue[mname]['value'])
        const timestamp = organDTValue[mname]['time'];
        const timediff = timestamp ? new Date().getTime() - timestamp : null

        return (
          <Grid
            item
            xs={6}
            sx={{
              height: "80px",
              backgroundColor: colorcode,
            }}
            key={mname}
          >
            <div>
              {mname}{" "}{measurement.unit}
            </div>
            <div>{organDTValue[mname]['value'] ? organDTValue[mname]['value'] : ""}</div>
            <div>{timestamp ? msecondToString(timediff)+' ago' : ''}</div>
          </Grid>
        );
      })}
    </Grid>
  );
};

// const SystematicAssessmentForm = ({ selectedDT }) => {
//   const assessments = { Sepsis: '', "Septic shock": '', SIRS: '', PEW: '' };
//   return (
//     <>
//       <Grid container>
//         <Grid
//           item
//           xs={12}
//           sx={{
//             height: "30px",
//             boxShadow:
//               "2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset",
//             backgroundColor: "yellow",
//           }}
//         >
//           <div>Screening Status: Presume Sepsis</div>
//         </Grid>
//         {Object.keys(assessments).map((key) => {
//           return (
//             <Grid
//               item
//               xs={3}
//               sx={{
//                 height: "50px",
//                 boxShadow:
//                   "2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset",
//                 backgroundColor: "yellow",
//               }}
//             >
//               <div>
//                 {key}: {assessments[key]}
//                 {/* <br />
//                 30s ago */}
//               </div>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </>
//   );
// };

// const OrganAssessmentForm = ({ selectedDT }) => {
//   const assessments = OrganDTConfig[selectedDT].assessments;
//   if (!assessments) {
//     return null;
//   }
//   const count = Object.keys(assessments).length;
//   return (
//     <>
//       <Grid container>
//         {Object.keys(assessments).map((key) => {
//           return (
//             <Grid
//               item
//               xs={12 / count}
//               sx={{
//                 height: "80px",
//                 boxShadow:
//                   "2px 0 0 0 #888, 0 2px 0 0 #888, 2px 2px 0 0 #888,2px 0 0 0 #888 inset, 0 2px 0 0 #888 inset",
//                 backgroundColor: "lightyellow",
//               }}
//             >
//               <div>
//                 {assessments[key].name}{": "}
//                 {assessments[key].value ? assessments[key].value : null}
//               </div>
//               {/* <div>Last updated time:</div> */}
//             </Grid>
//           );
//         })}
//       </Grid>
//     </>
//   );
// };

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
  const apiURL = "127.0.0.1:4000";
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `ws://${apiURL}/get_organdt_upadte`
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (lastMessage !== null) {
      const d = lastMessage.data.replace(/'/g, '"');
      dispatch({ type: "organDT/update_all", payload: JSON.parse(d)});
    }
  }, [lastMessage]);

  return (
    <Box width='100%' height='100%' display='flex' flexDirection='column'>
      {/* <Typography height='5%' variant="h4" component="div">
        Patient Digital Twin
      </Typography> */}
      <PaitentBasic />
      {/* <SystematicAssessmentForm {...{ selectedDT }} /> */}
      <OrganSelection {...{ selectedDT, setSelectedDT }} />
      {/* <OrganAssessmentForm {...{ selectedDT }} /> */}
      <DigitalTwinForm {...{ selectedDT }} />
    </Box>
  );
};

export default DigitalTwin;
