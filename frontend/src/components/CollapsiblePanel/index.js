import { Button, Grid, Typography } from "@mui/material";

const CollapsiblePanel = () => {
    const buttons = ["history", "flowchart", "checklists", "references"]
    return (
        <div style={{ height: "100vh", overflow: "hidden" }}>
            <Grid container sx={{marginTop: '10px'}}>
                {buttons.map(value => {
                    return (
                        <Grid item xs={12} key={value}>
                            <Button
                                sx={{
                                    height: "50px",
                                    width: "100%",
                                }}
                            >
                            {value}
                            </Button>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}

export default CollapsiblePanel;