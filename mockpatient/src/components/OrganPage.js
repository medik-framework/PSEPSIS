import { Grid } from "@mui/material";
import { OrganDTConfig } from "../resources/DigitalTwinConfigReorganized";

import MeasurementNumeric from "./MeasurementNumeric";
import MeasurementSelect from "./MeasurementSelect";

const OrganPage = ({ selectedDT, kSendMessage }) => {
    const selectedOrganDTConfig = OrganDTConfig[selectedDT];
    return (
        <Grid container columns={{ xs: 6, sm: 6, md: 12, lg: 18, xl: 24}} spacing={1} p={1} sx={{ alignItems: 'stretch' }}>
        {Object.keys(selectedOrganDTConfig.measurements).map((key) => {
            const config = selectedOrganDTConfig.measurements[key];
            if (config.type === 'number') {
            return (
                <MeasurementNumeric
                key={`${selectedOrganDTConfig.name}.${config.name}`}
                { ...{ organName: selectedOrganDTConfig.name,
                        config: config,
                        kSendMessage: kSendMessage
                }}
                />
            )
            } else {
            return (
                <MeasurementSelect
                key={`${selectedOrganDTConfig.name}.${config.name}`}
                { ...{ organName: selectedOrganDTConfig.name,
                        config: config,
                        kSendMessage: kSendMessage
                }}
                />
            )
            }
        })}
        </Grid>
    )
};

export default OrganPage;
