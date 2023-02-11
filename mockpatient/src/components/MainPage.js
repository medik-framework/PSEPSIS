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
import { set } from "react-hook-form";

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
    const dispatch = useDispatch();
    const apiURL = useSelector((state) => state.misc['apiURL']);
    const [selectedDT, setSelectedDT] = useState(0);
    const [open, setOpen] = useState(false);
    const [id, setID] = useState(1);
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
            <Box>
                <TextField
                    label="Set backend server API URL"
                    id="url"
                    sx={{fontSize:'18px', backgroundColor:'white', width:'40%', bottom: 0, right: 0, position:'absolute'}}
                    variant="outlined"
                    value={apiURL}
                    onChange={(e) => dispatch(updateURL(e.target.value))}
                />
            </Box>
            <Button
                onClick={() => {
                    const data ={
                        "id": id,
                        "source": 0,
                        "args": [ "getAge" ],
                        "response_to": -1,
                        "need_response": true,
                        "timestamp": 4008
                    }
                    fetch(apiURL+'add_to_q', {
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
                    }).catch(error => {
                        console.log('Post error:', error)
                    })
                    setID(id + 1);
                }}
            >
                Test Q
            </Button>
            {open && <ExitConfirmationDialog open={open} handleCancel={()=>setOpen(false)} handleOk={exitSession}/>}
        </Box>
    );
}

export default MainPage;
