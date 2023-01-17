import { useState } from "react";

import { Button, Box } from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

import OrganSelection from "./OrganSelection";
import OrganPage from "./OrganPage";

const ExitConfirmationDialog = ({ open, handleCancel, handleOk }) => {
    return(
        <Dialog open={open}>
            <DialogTitle>Exit Session</DialogTitle>
            <DialogContent>
                Clear all data and exit?
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    )
}

const MainPage = ({ exitSession }) => {
    const [selectedDT, setSelectedDT] = useState(0);
    const [open, setOpen] = useState(false);
    return (
        <Box sx={{ display:'flex', flexDirection:'column' }}>
            <Box sx={{ display:'flex', width:'100vw' }}>
                <Box sx={{ height:'100vh', width:'15vw' }}>
                    <OrganSelection {...{ selectedDT, setSelectedDT }}/>
                    <Button 
                        sx={{ position:'absolute', 
                              bottom:'5px',
                              width: '15vw',
                              fontSize: '25px'
                        }}
                        onClick={() => setOpen(true)}
                    >
                        Exit
                    </Button>
                </Box>
                <Box sx={{ height:'100vh', width:'85vw' }}>
                    <OrganPage {...{ selectedDT }}/>
                </Box>
            </Box>
            {/* <Box>
                <Button>Submit</Button>
                <TextField
                    label="Set backend server API URL"
                    id="url"
                    sx={{fontSize:'18px', backgroundColor:'white', width:'40%', bottom: 0, right: 0, position:'absolute'}}
                    variant="outlined"
                    value={apiURL}
                    onChange={(e) => dispatch(updateURL(e.target.value))}
                />
            </Box> */}
            {open && <ExitConfirmationDialog open={open} handleCancel={()=>setOpen(false)} handleOk={exitSession}/>}
        </Box>
    );
}

export default MainPage;