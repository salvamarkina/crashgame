import ChatPanel from './ChatPanel';
import { useTheme } from '@mui/system';
import PlaceBetsPanel from './PlaceBetsPanel';
import settings from '../../../assets/settings.svg';
import mainlogo from '../../../assets/mainlogo.svg';
import { useEffect, useState, useMemo } from 'react';
import leaderboard from '../../../assets/leaderboard.svg';
import { Grid, Typography, ListItem } from '@mui/material';
import { green, grey, yellow } from '@mui/material/colors';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import ConnButtonColorful from 'components/wallet/ConnButtonColorful';
import { YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';
import BettersPanel from './BettersPanel';
import { io } from 'socket.io-client';

const CrashGameMain = () => {
    const theme = useTheme();
    const [data, setData] = useState([]);
    const [bettingCountdown, setBettingCountdown] = useState(30);
    const [gameState, setGameState] = useState('');
    const [crashMessage, setCrashMessage] = useState('');
    const [onlinePlayers, setOnlinePlayers] = useState(0);
    const [multiplier, setMultiplier] = useState('1.00x');
    const [bettingPhase, setBettingPhase] = useState(false);
    const [lastCrashValues, setLastCrashValues] = useState([]);
    const [socket] = useState(() => io('http://alphax.social:3002'));

    useEffect(() => {
        const handleCountdown = ({ countdown }) => {
            setBettingCountdown(countdown);
        };

        socket.on('bettingCountdown', handleCountdown);

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('totalConnections', (count) => {
            console.log(`Total connected clients: ${count}`);
            setOnlinePlayers(count);
        });

        socket.on('lastCrashValues', (values) => {
            setLastCrashValues(values);
        });

        socket.on('bettingPhaseStarted', () => {
            setBettingPhase(true);
            setCrashMessage('');
            setMultiplier('1.00x');
            setData([]);
            console.log('Betting phase started');
        });

        socket.on('bettingPhaseEnded', () => {
            setBettingPhase(false);
            console.log('Betting phase ended, game started');
        });

        socket.on('gameState', (data) => {
            setGameState(data.state);
        });

        socket.on('multiplierUpdate', (data) => {
            setMultiplier(`${data.multiplier}x`);
            setData((prevData) => {
                const newData = [...prevData, { name: `${prevData.length + 1}s`, multiplier: data.multiplier }];
                return newData;
            });
            console.log('Multiplier Update:', data.multiplier);
        });

        socket.on('crash', (data) => {
            setCrashMessage(`Crashed at ${data.crashMultiplier}x!`);
            console.log('Game crashed at:', data.crashMultiplier);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            socket.disconnect();
            socket.off('bettingCountdown', handleCountdown);
        };
    }, [socket]);

    const yAxisMaxLimit = useMemo(() => {
        const maxMultiplier = Math.max(...data.map((d) => d.multiplier), 1); // Ensure at least 1 as a base multiplier
        return maxMultiplier * 1.25; // Add 20% to the maximum multiplier
    }, [data]);

    let StateText;
    if (gameState === 'betting') {
        StateText = `Game starts in ${bettingCountdown}. Place your bets.`;
    } else if (gameState === 'inProgress') {
        StateText = multiplier;
    } else if (gameState === 'assigningData') {
        StateText = 'Rewarding users on-chain!';
    } else if (gameState === 'idle') {
        StateText = 'New round starts shortly...';
    } else if (gameState === 'failed') {
        StateText = 'Fetching data...';
    }

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
            <Grid container display="flex" justifyContent="center" mt={0}>
                <Grid
                    container
                    display="flex"
                    sx={{ justifyContent: { lg: 'space-between', md: 'space-between', sm: 'center', xs: 'center' } }}
                    width="97%"
                    mt={3}
                >
                    <Grid
                        container
                        sx={{ width: { lg: '66%', md: '66%', sm: '95%', xs: '95%' } }}
                        display="flex"
                        justifyContent="space-between"
                    >
                        <Grid
                            item
                            lg={7.5}
                            md={7.5}
                            xs={12}
                            sx={{ height: 400, bgcolor: theme.palette.card.main, borderRadius: 3, border: 2, borderColor: grey[700] }}
                        >
                            <Grid
                                container
                                sx={{
                                    background: '#17191f',
                                    display: 'flex',
                                    height: 28,
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                {lastCrashValues.map((value, index) => (
                                    <ListItem key={index} sx={{ display: 'inline', width: 'auto', padding: '0 8px' }}>
                                        <Typography sx={{ color: value > 2 ? green[600] : grey[200] }}>
                                            {(value * 100).toFixed(0)}%
                                        </Typography>
                                    </ListItem>
                                ))}
                            </Grid>
                            <ResponsiveContainer width="100%" height={400}>
                                <AreaChart data={data} margin={{ bottom: 50 }}>
                                    <CartesianGrid stroke={grey[700]} strokeDasharray="3 3" vertical={false} />
                                    <defs>
                                        <linearGradient id="colorPrice1" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={yellow[500]} stopOpacity={1} />
                                            <stop offset="95%" stopColor="transparent" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <YAxis
                                        orientation="right"
                                        tickCount={3}
                                        domain={[0.8, yAxisMaxLimit]}
                                        tickFormatter={(value) => (value === 0.8 ? '' : value)}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="multiplier"
                                        stroke={yellow[500]}
                                        fill="url(#colorPrice1)"
                                        fillOpacity={1}
                                        strokeWidth={2}
                                        dot={false}
                                        activeDot={{ r: 8 }}
                                        isAnimationActive={false}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                            <Grid
                                container
                                sx={{
                                    background: 'transparent',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mt: -40
                                }}
                            >
                                <Typography sx={{ color: grey[100], fontWeight: 900, fontSize: 26 }}>{crashMessage || null}</Typography>
                                <Grid container width="100%" display="flex" justifyContent="center" zIndex={999}>
                                    <Typography sx={{ color: grey[100], fontWeight: 900, fontSize: 26 }}>{StateText}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <PlaceBetsPanel />
                        <ChatPanel />
                    </Grid>
                    <Grid
                        item
                        sx={{
                            bgcolor: theme.palette.card.main,
                            borderRadius: 3,
                            height: { lg: 'auto', md: 'auto', sm: 400, xs: 400 },
                            mt: { lg: 0, md: 0, sm: 2, xs: 2 },
                            border: 2,
                            borderColor: grey[700],
                            width: { lg: '33%', md: '33%', sm: '95%', xs: '95%' }
                        }}
                    >
                        <BettersPanel />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default CrashGameMain;
