import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { update, setGradualUpdate, resetGradualUpdate } from '../redux/organDataSlice';
import { Button, Grid, Typography, TextField, Box} from "@mui/material";

const MeasurementNumeric = ({ organName, config, kSendMessage }) => {
    const dispatch = useDispatch();
    const measurementState = useSelector((state) => state.OrganDT[organName]?.[config.name] ?? {});
    const value = measurementState?.value ?? null;
    const target = measurementState?.target ?? null;
    const period = measurementState?.period ?? null;
    const elapse = measurementState?.elapse ?? 0;
    const delay = measurementState?.delay ?? null;
    const [inputValue, setInputValue] = useState(null);
    const [targetValue, setTargetValue] = useState("");
    const [periodValue, setPeriodValue] = useState("");

    useEffect(() => {
        if (delay && elapse >= period) {
            dispatch(resetGradualUpdate({ organName, measurementName: config.name }));
            dispatch(update({ value: target, organName, measurementName: config.name }));
        }
    }, [delay, elapse, period, target, organName, config.name, dispatch]);

    const gradualUpdate = () => {
        const parsedTarget = Number(targetValue);
        const parsedPeriod = Number(periodValue);

        if (!isNaN(parsedTarget) && !isNaN(parsedPeriod) && parsedPeriod > 0) {
            const stepValue = (parsedTarget - value) / parsedPeriod;

            dispatch(setGradualUpdate({
                organName,
                measurementName: config.name,
                target: parsedTarget,
                period: parsedPeriod,
                step: stepValue,
                delay: 1000
            }));
        }
    };

    return (
        <Grid item key={config.name} xs={6}>
        <Box bgcolor='#F0F8FF' border={2} borderColor='#6495ED' borderRadius={2} p={1} sx={{ height: '160px'}}>
            <Typography sx={{ fontSize:'24px', width:'100%', display:'inline-block', textAlign:'center' }}>
                {config.name} {config.unit ? `(${config.unit})` : null}: {value ? +value.toFixed(2):null}
            </Typography>
            <Box sx={{ width:'100%', display:'inline-flex', flexDirection:'row', marginBottom:'5px'}}>
            <Typography sx={{ fontSize:'14px', width:'20%', margin:'auto', textAlign:'center'}}>
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
                sx={{ fontSize:'14px', width:'25%', marginLeft:'5px'}}
                variant="outlined"
                color="error"
                onClick={() => {
                    dispatch(resetGradualUpdate({ organName, measurementName: config.name }));
                    dispatch(update({
                        value: Number(inputValue),
                        organName: organName,
                        measurementName: config.name
                    }));
                    const data = {
                        organ: organName,
                        measurement: config.name,
                        value: Number(inputValue),
                        timeStamp: new Date().getTime(),
                        config: config
                    };
                    kSendMessage(JSON.stringify(data));
                }}
            >
                Confirm
            </Button>
            </Box>
            {!delay &&
            <Box sx={{ width:'100%', display:'inline-flex', flexDirection:'row'}}>
                <Typography sx={{ fontSize:'14px', width:'20%', margin:'auto', textAlign:'center'}}>
                    Gradually update to:
                </Typography>
                <TextField
                    id='target'
                    variant="outlined"
                    sx={{ fontSize:'18px', backgroundColor:'white', width:'20%', height:'100%', margin:'auto' }}
                    type="number"
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setTargetValue(e.target.value)
                        if (!isNaN(val) && val > 0) {
                            dispatch(setGradualUpdate({
                                organName,
                                measurementName: config.name,
                                target: val,
                                period: measurementState.period ?? 1,
                                step: measurementState.step,
                                delay: measurementState.delay
                            }));
                        }
                    }}
                />
                <Typography sx={{ fontSize:'14px', width:'7.5%', margin:'auto', textAlign:'center'}}>
                    in
                </Typography>
                <TextField
                    id='period'
                    variant="outlined"
                    sx={{ fontSize:'18px', backgroundColor:'white', width:'20%', height:'100%', margin:'auto' }}
                    type="number"
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        setPeriodValue(e.target.value)
                        if (!isNaN(val) && val > 0) {
                            dispatch(setGradualUpdate({
                                organName,
                                measurementName: config.name,
                                target: measurementState.target ?? 0,
                                period: val,
                                step: measurementState.step,
                                delay: measurementState.delay
                            }));
                        }
                    }}
                />
                <Typography sx={{ fontSize:'14px', width:'7.5%', margin:'auto', textAlign:'center'}}>
                    sec
                </Typography>
                <Button
                    sx={{ fontSize:'14px', width:'25%', marginLeft:'5px' }}
                    variant="outlined"
                    color="error"
                    disabled={isNaN(value) || isNaN(measurementState?.target) || isNaN(measurementState?.period) || measurementState?.period <= 0}
                    onClick={gradualUpdate}
                >
                    Confirm
                </Button>
            </Box>
            }

        </Box>
        </Grid>
    )
}

export default MeasurementNumeric;
