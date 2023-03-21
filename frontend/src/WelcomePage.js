import { Button, Box, Typography } from "@mui/material";

const WelcomePage = ({ startSession, isKConnActive }) => {
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
        </Box>
    )
};

export default WelcomePage;
