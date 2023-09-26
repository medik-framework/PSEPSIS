import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Button, Box, Typography } from "@mui/material";
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs';

import makeStyles from "@mui/styles/makeStyles";

import {
  MedicationCategories,
  MedicationConfig,
  AntibioticsSetConfig
} from "../../resources/MedicationConfig";
import MedicationCard, { ComboCard } from "./MedicationCard";
import { unsetHighlight } from "../../redux/reducers/highlight";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderLeft: "solid 1px",
    borderTop: "solid 1px",
    borderRadius: "2px",
    height: "auto",
    maxHeight: "85vh",
    overflowY: "scroll",
    overflowX: "hidden",
    alignContent: "flex-start"
  },
  card: {
    borderRight: "solid 1px",
    borderBottom: "solid 1px",
    borderColor: "black",
    borderRadius: "2px",
    height: "100px",
    width:  "100%",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "none",
    fontSize: "14px",
  },
  returnbtn: {
    textTransform: "none",
    fontSize: "14px"
  }
}));

export default function MedicationTable() {
  const classes = useStyles();
  const selectedCategory = useSelector((state) => state.highlight.selectedMedicationTab);
  const medList = MedicationConfig[MedicationCategories[selectedCategory]];

  return (
    <Grid container
      direction={"row"}
      className={classes.root}
      key={selectedCategory}
    >
      {medList.map((med, idx) => {
        return <MedicationCard key={idx} {...med} />;
      })}
    </Grid>
  );
}

export const AntibioticsSetTable = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState(-1);
  const highlighted = useSelector((state) => state.highlight.highlightedMedication);
  const dispatch = useDispatch();

  return(
    <>
      {selected < 0 && <Grid container className={classes.root}>
        {Object.keys(AntibioticsSetConfig).map((name, idx) =>
            <Button
              key={String("AS"+idx)}
              className={classes.card}
              onClick={() => {
                dispatch(unsetHighlight(name));
                setSelected(idx);
              }}
              sx = {{background: highlighted.includes(name)? "yellow":"lightcyan"}}
            >
              <Box height={"100%"} width={"80%"}>
                <Typography>{name}</Typography>
              </Box>
              <Box height={"100%"} width={"20%"}>
                <BsFillArrowRightSquareFill size={50}/>
              </Box>
            </Button>
        )}
      </Grid>}
      {selected >= 0 &&
        <>
          <Button
            className={classes.returnbtn}
            onClick={() => setSelected(-1)}
          >
            <BsFillArrowLeftSquareFill /> Return to Antibiotics sets selection
          </Button>
          <Grid container className={classes.root}>
            {AntibioticsSetConfig[Object.keys(AntibioticsSetConfig)[selected]].map((config, idx) => {
              if (config.drugs) return <ComboCard key={"Combo"+selected+idx} {...{config}} />
              else return <Typography className={classes.card}>{config.title}</Typography>
            })}
          </Grid>
        </>
      }
    </>

  )
}
