import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../redux/organDataSlice';

import { Grid, Typography, Select, MenuItem, Box } from "@mui/material";

const MeasurementSelect = ({ organName, config }) => {
    const value = useSelector((state) => state.OrganDT[organName][config.name]);
    const dispatch = useDispatch();
    const apiURL = useSelector((state) => state.misc['apiURL']);

    useEffect(() => {
        if (value) {
            const method = apiURL + 'update_data';
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

    return (
        <Grid item key={config.name} xs={6}>
        <Box Box bgcolor='#F0F8FF' border={2} borderColor='#6495ED' borderRadius={2} p={1} sx={{ height: '160px'}}>
            <Typography sx={{ fontSize:'24px', width:'100%', display:'inline-block', textAlign:'center' }}>
                {config.name} {config.unit ? `(${config.unit})` : null}
            </Typography>
            <Select
                sx={{ fontSize:'18px', display:'block', margin:'auto', marginTop:'20px', backgroundColor:'white', width:'70%' }}
                value={value? value:''}
                onChange={(e) => dispatch(update({value: e.target.value, organName: organName, measurementName: config.name}))}
            >
            {Object.keys(config.options).map((key) =>
                <MenuItem key={key} value={key}>{key}</MenuItem>
            )}
            </Select>
        </Box>
        </Grid>
    )
}

export default MeasurementSelect;
