
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { update, increment } from '../redux/organDataSlice';
import { useInterval } from 'usehooks-ts';

import { Button, Grid, Typography, TextField, Box } from "@mui/material";

const MeasurementNumeric = ({ organName, config }) => {
    const [inputValue, setInputValue] = useState(null);
    const [delay, setDelay] = useState(null);
    const [target, setTarget] = useState(null);
    const [period, setPeriod] = useState(null);
    const [elapse, setElapse] = useState(0);
    const [step, setStep] = useState(0);
    const value = useSelector((state) => state.OrganDT[organName][config.name]);
    const dispatch = useDispatch();
    const apiURL = useSelector((state) => state.misc['apiURL']);

    const resetInterval = () => {
        setDelay(null);
        setTarget(null);
        setPeriod(null);
        setElapse(0);
    }

    useEffect(() => {
        if (delay && elapse === period){
        resetInterval();
        dispatch(update({value: target, organName: organName, measurementName: config.name}));
        }
    }, [ delay, setDelay, elapse, setElapse, period, target, organName, config, dispatch])

    useEffect(() => {
        if (value) {
            const method = apiURL + 'form_update';
            const data = {
                organ: organName, 
                measurement: config.name, 
                value: value,
                timeStamp: new Date().getTime()
            }
            fetch(method, {
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
        }
    }, [value, apiURL, organName, config])

    useInterval(() => {
        dispatch(increment({
            value: step, 
            organName: organName, 
            measurementName: config.name
        }));
        setElapse(elapse + 1);
    }, delay);

    const gradualUpdate = (startValue) => {
        setStep((target - startValue)/period);
        setDelay(1000);
    }

    return (
        <Grid item key={config.name} xs={6}>
        <Box bgcolor='#F0F8FF' border={2} borderColor='#6495ED' borderRadius={2} p={1} sx={{ height: '160px'}}>
            <Typography sx={{ fontSize:'24px', width:'100%', display:'inline-block', textAlign:'center' }}>
                {config.name} {config.unit ? `(${config.unit})` : null}: {value ? +value.toFixed(2):null}
            </Typography>
            <Box sx={{ width:'100%', display:'inline-flex', flexDirection:'row', marginBottom:'5px'}}>
            <Typography sx={{ fontSize:'16px', width:'20%', margin:'auto', textAlign:'center'}}>
                Instantly update to: 
            </Typography>
            <TextField
                id={config.name}
                sx={{ fontSize:'18px', backgroundColor:'white', width:'55%', height:'100%', margin:'auto' }}
                variant="outlined" 
                type="number"
                onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
                disabled={(!inputValue) || (Number(inputValue) === value)}
                sx={{ fontSize:'16px', width:'25%', marginLeft:'5px'}}
                variant="outlined"
                onClick={() => {
                resetInterval();
                dispatch(update({
                    value: Number(inputValue), 
                    organName: organName,
                    measurementName: config.name
                }));
                }}
            >
                Confrim
            </Button>
            </Box>
            {!delay && 
            <Box sx={{ width:'100%', display:'inline-flex', flexDirection:'row'}}>
                <Typography sx={{ fontSize:'16px', width:'20%', margin:'auto', textAlign:'center'}}>
                    Gradually update to: 
                </Typography>
                <TextField
                    id='target'
                    variant="outlined"
                    sx={{ fontSize:'18px', backgroundColor:'white', width:'20%', height:'100%', margin:'auto' }}
                    type="number"
                    onChange={(e) => setTarget(Number(e.target.value))}
                />
                <Typography sx={{ fontSize:'16px', width:'7.5%', margin:'auto', textAlign:'center'}}>
                    in
                </Typography>
                <TextField
                    id='period'
                    variant="outlined"
                    sx={{ fontSize:'18px', backgroundColor:'white', width:'20%', height:'100%', margin:'auto' }}
                    type="number"
                    onChange={(e) => setPeriod(Number(e.target.value))}
                />
                <Typography sx={{ fontSize:'16px', width:'7.5%', margin:'auto', textAlign:'center'}}>
                    sec
                </Typography>
                <Button
                    sx={{ fontSize:'16px', width:'25%', marginLeft:'5px' }}
                    variant="outlined"
                    disabled={isNaN(value) || !target || !period}
                    onClick={() => gradualUpdate(value)}
                >
                    Confirm
                </Button>
            </Box>
            }
            {delay&&
            <Box sx={{ width:'100%', display:'inline-flex', flexDirection:'row'}}>
                <Typography sx={{ fontSize:'16px', width:'75%', margin:'auto', textAlign:'left'}}>
                    Gradually updating to {target} in {period-elapse} secs.
                </Typography>
                <Button
                    sx={{ fontSize:'16px', width:'25%', marginLeft:'5px' }}
                    variant="outlined"
                    onClick={() => resetInterval()}
                >
                    Cancel
                </Button>
            </Box>
            }
        </Box>
        </Grid>
    )
}

export default MeasurementNumeric;