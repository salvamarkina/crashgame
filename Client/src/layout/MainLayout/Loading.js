import { Grid, Typography } from '@mui/material';
import alxlogo from '../../assets/alxlogo.svg';

const Loading = () => (
    <Grid
        item
        sx={{
            backgroundColor: 'black',
            display: 'flex',
            justifyContent: 'center',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            position: 'absolute'
        }}
    >
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 15 }}>
            <img src={alxlogo} alt="sigmalogo" width={250} height={250} />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: -15 }}>
            <Typography sx={{ fontSize: 22, color: 'red', textAlign: 'center' }}>AlphaDAO is loading... Please wait</Typography>
        </Grid>
    </Grid>
);

export default Loading;
