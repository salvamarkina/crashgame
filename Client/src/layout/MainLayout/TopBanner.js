import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import { brandColor } from 'themes/constants';

// ==============================|| MAIN LAYOUT ||============================== //

const TopBanner = () => {
    const theme = useTheme();
    // State to manage the visibility of the TopBanner
    const [isVisible, setIsVisible] = useState(true);

    // Function to handle close button click
    const handleClose = () => {
        setIsVisible(false); // Set visibility to false
    };

    // Render nothing if isVisible is false
    if (!isVisible) return null;

    return (
        <Grid
            container
            sx={{
                background: 'linear-gradient(to right, #893fbb, #3e6597, #1b7086)',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                p: 2
            }}
        >
            <Grid container xs={11} display="flex" justifyContent="center">
                <Typography sx={{ color: brandColor, fontWeight: 700, fontSize: { lg: 14, md: 13, sm: 13, xs: 13 } }}>
                    PHISHING WARNING:
                </Typography>
                <Typography sx={{ color: grey[300], fontWeight: 800, mx: 0.5, fontSize: { lg: 14, md: 13, sm: 13, xs: 13 } }}>
                    please make sure you`re visiting
                </Typography>
                <Typography sx={{ color: grey[50], fontWeight: 800, fontSize: { lg: 14, md: 13, sm: 13, xs: 13 } }}>
                    https://alphadao.finance
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <IconButton size="small" onClick={handleClose} sx={{ mx: 0.5 }}>
                    <CloseIcon sx={{ color: theme.palette.text.invertedprimary, fontSize: 20 }} />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default TopBanner;
