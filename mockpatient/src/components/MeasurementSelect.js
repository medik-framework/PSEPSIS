import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../redux/organDataSlice';

import { Grid, Typography, Select, MenuItem, Box } from "@mui/material";

const MeasurementSelect = ({ organName, config, kSendMessage }) => {
    const value = useSelector((state) => state.OrganDT[organName][config.name]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (value) {
            const data = {
                organ: organName,
                measurement: config.name,
                value: value,
                timeStamp: new Date().getTime()
            }
            kSendMessage(JSON.stringify(data))
        }
    }, [value, organName, config, kSendMessage])

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
