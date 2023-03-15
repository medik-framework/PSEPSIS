import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Button, Box } from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import TextField from "@mui/material/TextField";

import OrganSelection from "./OrganSelection";
import OrganPage from "./OrganPage";

import { updateURL } from "../redux/miscSlice";

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

const MainPage = ({ exitSession, kWebSocket }) => {
    const dispatch = useDispatch();
    const apiURL = useSelector((state) => state.misc['apiURL']);
    const [selectedDT, setSelectedDT] = useState(0);
    const [open, setOpen] = useState(false);
    const [id, setID] = useState(1);
    const kSendMessage = kWebSocket.sendMessage;
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
                    <OrganPage {...{ selectedDT, kSendMessage }}/>
                </Box>
            </Box>
            {open && <ExitConfirmationDialog open={open} handleCancel={()=>setOpen(false)} handleOk={exitSession}/>}
        </Box>
    );
}

export default MainPage;
