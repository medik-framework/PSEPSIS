import { useState } from "react";
import { Grid, Button, Box, Typography } from "@mui/material";
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs';

import makeStyles from "@mui/styles/makeStyles";

import {
  MedicationCategories,
  MedicationConfig,
  AntibioticsSetConfig
} from "../../resources/MedicationConfig";
import MedicationCard, { ComboCard } from "./MedicationCard";

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
    background: "lightcyan",
    borderRight: "solid 1px",
    borderBottom: "solid 1px",
    borderRadius: "2px",
    height: "100px",
    width:  "100%",
    textTransform: "none",
  },
  returnbtn: {
    textTransform: "none",
    fontSize: "20px",
    height: "50px"
  },
  box: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    display:"flex"
  }
}));

export default function MedicationTable({selectedCategory}) {
  const classes = useStyles();
  const medList = MedicationConfig[MedicationCategories[[selectedCategory]]];

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

  return(
    <>
      {selected < 0 && <Grid container className={classes.root}>
        {Object.keys(AntibioticsSetConfig).map((name, idx) =>
          <Button
            key={String("AS"+idx)}
            className={classes.card}
            onClick={() => setSelected(idx)}
          >
            <Box className={classes.box} width={"80%"}>
              <Typography>{name}</Typography>
            </Box>
            <Box className={classes.box} width={"20%"}>
              <BsFillArrowRightSquareFill size={50}/>
            </Box>
          </Button>
        )}
      </Grid>}
      {[0,1,2,5].includes(selected) &&
        <>
          <Button
            className={classes.returnbtn}
            onClick={() => setSelected(-1)}
          >
            <BsFillArrowLeftSquareFill /> &nbsp; Return to Antibiotics sets selection
          </Button>
          <Grid container className={classes.root}>
            {AntibioticsSetConfig[Object.keys(AntibioticsSetConfig)[selected]].map((config, idx) =>
              <ComboCard key={"Combo"+selected+idx} {...{config}} />
            )}
          </Grid>
        </>
      }
      {[3, 4].includes(selected) &&
        <>
          <Button
            className={classes.returnbtn}
            onClick={() => setSelected(-1)}
          >
            <BsFillArrowLeftSquareFill /> &nbsp; Return to Antibiotics sets selection
          </Button>
          <Typography
            className={classes.card}
            sx={{
              textAlign: "center",
              border: "1px solid",
              verticalAlign:"middle",
              display:"table-cell",
              padding:"10px"
            }}
          >
            {AntibioticsSetConfig[Object.keys(AntibioticsSetConfig)[selected]]}
          </Typography>
        </>
      }
    </>

  )
}
