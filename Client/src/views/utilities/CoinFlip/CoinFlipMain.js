import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import Coin from './Coin';

const CoinFlipMain = () => {
    const theme = useTheme();

    return (
        <>
            <Grid container display="flex" justifyContent="center">
                <Coin />
            </Grid>
        </>
    );
};

export default CoinFlipMain;
