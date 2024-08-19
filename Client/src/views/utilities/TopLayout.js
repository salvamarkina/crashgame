import { Grid, Typography } from '@mui/material';
import bsclogo from '../../assets/bsclogo.svg';
import alxlogo from '../../assets/alxlogo.svg';
import { grey } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const TopLayout = ({ title, text }) => {
    const themeMode = useSelector((state) => state.theme.mode);

    return (
        <>
            <Grid
                container
                width="100vw"
                sx={{
                    display: 'flex',
                    justifyContent: 'left',
                    alignItems: 'center',
                    px: { lg: 3, md: 3, sm: 2, xs: 2 },
                    pt: 15,
                    zIndex: 999,
                    pb: 9,
                    flexDirection: 'column',
                    bgcolor: '#1b2030'
                }}
            >
                <Grid item lg={10} md={10} zIndex={999}>
                    <Grid container width="100%" display="flex" alignItems="center">
                        <Typography color={grey[300]} sx={{ pr: 1, fontSize: 13 }}>
                            Active network
                        </Typography>
                        <img src={bsclogo} alt="ethlogo" width={20} height={20} />
                        <Typography color={grey[300]} pl={1} sx={{ fontSize: 13 }}>
                            BSC Testnet
                        </Typography>
                    </Grid>
                    <Grid container width="100%" display="flex" alignItems="center" my={2}>
                        <img src={alxlogo} alt="alxlogo" width={35} height={35} />
                        <Typography color={grey[200]} sx={{ pl: 1, fontSize: 28, fontWeight: 700 }} letterSpacing="1px">
                            {title}
                        </Typography>
                    </Grid>
                    <Grid container display="flex" alignItems="center" lg={7}>
                        <Typography color={grey[400]} sx={{ pl: 1, fontSize: 15 }}>
                            {text}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

// Define prop types for TopLayout
TopLayout.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

export default TopLayout;
