import io from 'socket.io-client';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import settings from '../../../assets/settings.svg';
import mainlogo from '../../../assets/mainlogo.svg';
import leaderboard from '../../../assets/leaderboard.svg';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import ConnButtonColorful from 'components/wallet/ConnButtonColorful';

const Header = () => {
    const [onlinePlayers, setOnlinePlayers] = useState(0);

    const [socket] = useState(() => io('http://localhost:3001'));

    useEffect(() => {
        socket.on('totalConnections', (count) => {
            console.log(`Total connected clients: ${count}`);
            setOnlinePlayers(count);
        });
    }, [socket]);

    return (
        <>
            <Grid
                container
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ px: { lg: 5, md: 5, sm: 4, xs: 2 }, background: '#17191f' }}
                py={1}
                borderBottom={1}
            >
                <Grid container width="auto">
                    <img src={mainlogo} alt="logo" height={70} />
                </Grid>
                <Grid container width="auto">
                    <Grid
                        container
                        width="auto"
                        display="flex"
                        justifyContent="center"
                        sx={{
                            filter: 'brightness(90%)',
                            transition: 'filter 0.3s ease-in-out',
                            '&:hover': {
                                filter: 'brightness(130%)'
                            }
                        }}
                    >
                        <PeopleRoundedIcon sx={{ color: grey[100], fontSize: 45 }} />
                        <Grid container width="100%" display="flex" justifyContent="center">
                            <Typography
                                textAlign="center"
                                sx={{ color: grey[100], fontWeight: 900, fontSize: { lg: 18, md: 18, sm: 12, xs: 13 } }}
                            >
                                ONLINE: {onlinePlayers}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        width="auto"
                        display="flex"
                        justifyContent="center"
                        sx={{
                            filter: 'brightness(90%)',
                            transition: 'filter 0.3s ease-in-out',
                            '&:hover': {
                                filter: 'brightness(130%)'
                            }
                        }}
                    >
                        <img
                            src={leaderboard}
                            width={45}
                            alt="icon"
                            style={{ filter: 'brightness(100%)', '&:hover': { filter: 'brightness(20%)' } }}
                        />
                        <Grid container width="100%" display="flex" justifyContent="center">
                            <Typography
                                textAlign="center"
                                sx={{ color: grey[100], fontWeight: 900, fontSize: { lg: 18, md: 18, sm: 12, xs: 13 } }}
                            >
                                LEADERBOARD
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        width="auto"
                        display="flex"
                        justifyContent="center"
                        sx={{
                            filter: 'brightness(90%)',
                            transition: 'filter 0.3s ease-in-out',
                            '&:hover': {
                                filter: 'brightness(130%)'
                            }
                        }}
                    >
                        <img src={settings} width={45} alt="icon" />
                        <Grid container width="100%" display="flex" justifyContent="center">
                            <Typography
                                textAlign="center"
                                sx={{ color: grey[100], fontWeight: 900, fontSize: { lg: 18, md: 18, sm: 12, xs: 13 } }}
                            >
                                SETTINGS
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container width="auto" justifyContent="center" sx={{ display: { lg: 'flex', md: 'flex', sm: 'flex', xs: 'none' } }}>
                    <ConnButtonColorful />
                </Grid>
            </Grid>
        </>
    );
};

export default Header;
