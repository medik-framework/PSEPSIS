import { useState, useEffect } from "react";
import { Button, Box, Typography, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { updateURL } from "./redux/reducers/misc";


const WelcomePage = ({ startSession, isKConnActive }) => {
    const dispatch = useDispatch();
    const apiURL = useSelector((state) => state.misc['apiURL']);
    const [inputURL, setInputURL] = useState(apiURL);


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100vw',
                height: '100vh',
                backgroundImage: `url(${process.env.PUBLIC_URL + 'bgimg.jpg'})`,
                position: 'relative',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                alignItems: 'center',
                justifyContent: "center"
            }}
        >
            <Typography fontSize={36} color='white'>
                Pediatric Sepsis Guidance System
            </Typography>
            <Button
                variant="contained"
                size="large"
                disabled={!isKConnActive}
                sx={{
                    marginTop: '50px',
                    color: '#FFFAFA',
                    backgroundColor: '#32CD32',
                    fontWeight: 'bold',
                    fontSize: '24px'
                }}
                onClick={() => isKConnActive && startSession()}
            >
                Start New Session
            </Button>

            <Box
                sx={{fontSize:'18px', backgroundColor:'white', marginTop:"20px"}}
            >
                <TextField
                    label="Set backend server API URL"
                    id="url"
                    variant="outlined"
                    value={inputURL}
                    onChange={(e) => setInputURL(e.target.value)}
                />
                <Button
                    onClick={() => dispatch(updateURL(inputURL))}
                >
                    Confirm
                </Button>
            </Box>
        </Box>
    )
};

export default WelcomePage;
