import { Box, Tabs, Tab } from "@mui/material";
import { OrganDTConfig } from "../resources/DigitalTwinConfigReorganized";

const OrganSelection = ({ selectedDT, setSelectedDT }) => {
    return (
        <Box>
            <Tabs
                orientation="vertical"
                value={selectedDT} 
                onChange={(e, v) => setSelectedDT(v)}
                textColor="primary"
                indicatorColor="primary"
            >
                {OrganDTConfig.map((organ, index) => {
                return (
                    <Tab label={organ.name} value={index} key={index}/>
                );
                })}
            </Tabs>
        </Box>
    )
};

export default OrganSelection;