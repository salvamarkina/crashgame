import io from 'socket.io-client';
import { useTheme } from '@mui/system';
import { useEffect, useState } from 'react';
import { grey } from '@mui/material/colors';
import bnblogo from '../../../assets/bnbfulllogo.svg';
import { Grid, Typography, List, ListItem } from '@mui/material';

const BettersPanel = () => {
    const theme = useTheme();
    const [bets, setBets] = useState([]);
    const [gameState, setGameState] = useState('idle');
    const [usersCashouts, setUsersCashouts] = useState([]);
    const [bettingPhase, setBettingPhase] = useState(false);
    const [gameInProgress, setGameInProgress] = useState(false);
    const [socket] = useState(() => io('http://alphax.social:3002'));

    useEffect(() => {
        socket.on('betPlaced', (data) => {
            console.log('Bet placed:', data);
            setBets((prevBets) => [...prevBets, data]);
        });

        socket.on('playerCashedOut', (data) => {
            console.log('Bet placed:', data);
            setUsersCashouts((prevBets) => [...prevBets, data]);
        });

        socket.on('bettingPhaseStarted', () => {
            setBets([]);
            setBettingPhase(true);
            setGameInProgress(false);
        });

        socket.on('crash', (data) => {
            setGameInProgress(false);
            console.log('Game crashed at:', data.crashMultiplier);
        });
    }, [socket]);

    const formatAccount = (account) => {
        if (account && account.length > 8) {
            const firstPart = account.slice(0, 4);
            const lastPart = account.slice(-4);
            return `${firstPart}...${lastPart}`;
        }
        return 'undefined'; // return the original if it's too short
    };

    const getCashoutMultiplierByAddress = (address) => {
        const user = usersCashouts.find((user) => user.playerAddress === address);
        return user ? `${parseFloat(user.cashoutMultiplier).toFixed(0)}%` : 'Pending'; // Returns betAmount if found, otherwise returns null
    };

    const getCashoutMultiplierByAddress2 = (address) => {
        const user = usersCashouts.find((user) => user.playerAddress === address);
        return user ? parseFloat(user.cashoutMultiplier).toFixed(0) : 'Pending'; // Returns betAmount if found, otherwise returns null
    };

    return (
        <>
            <Grid
                item
                sx={{
                    height: { lg: 35, md: 35, sm: 35, xs: 50 },
                    display: 'flex',
                    px: 1,
                    alignItems: 'center',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderBottom: 2,
                    borderColor: grey[700],
                    background: '#17191f',
                    justifyContent: 'space-between'
                }}
            >
                <Grid item display="flex" width="35%" justifyContent="center">
                    <Typography sx={{ color: grey[100], fontWeight: 700 }}>Player</Typography>
                </Grid>
                <Grid item display="flex" width="20%" justifyContent="center">
                    <Typography sx={{ color: grey[100], fontWeight: 700 }}>Bet</Typography>
                </Grid>
                <Grid item display="flex" width="22.5%" justifyContent="center">
                    <Typography sx={{ color: grey[100], fontWeight: 700 }}>Cash-out</Typography>
                </Grid>
                <Grid item display="flex" width="22.5%" justifyContent="center">
                    <Typography sx={{ color: grey[100], fontWeight: 700 }}>Payout</Typography>
                </Grid>
            </Grid>
            <List
                sx={{
                    flexGrow: 1, // Allows the List to grow and take up available space
                    overflow: 'auto',
                    bgcolor: 'transparent'
                }}
            >
                {bets.map((data, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            bgcolor: 'transparent',
                            height: 25,
                            px: 1,
                            ':hover': { bgcolor: grey[700] }
                        }}
                    >
                        <Grid item display="flex" width="35%" justifyContent="left">
                            <Typography sx={{ color: grey[400], pl: 1.5, fontSize: 14, letterSpacing: '1px' }}>
                                {formatAccount(data.playerAddress)}
                            </Typography>
                        </Grid>
                        <Grid item display="flex" width="20%" justifyContent="center">
                            <Typography sx={{ color: grey[400], fontSize: 14, letterSpacing: '1px' }}>{data.betAmount / 10e18}</Typography>
                            <img src={bnblogo} alt="logo" width={15} style={{ marginLeft: 5, marginTop: 2 }} />
                        </Grid>
                        <Grid item display="flex" width="22.5%" justifyContent="center">
                            <Typography textAlign="center" sx={{ color: grey[400], fontSize: 14, letterSpacing: '1px' }}>
                                {getCashoutMultiplierByAddress(data.playerAddress)}
                            </Typography>
                        </Grid>
                        <Grid item display="flex" width="22.5%" justifyContent="center">
                            <Typography textAlign="center" sx={{ color: grey[400], fontSize: 14, letterSpacing: '1px' }}>
                                {((getCashoutMultiplierByAddress2(data.playerAddress) * parseFloat(data.betAmount)) / 100 / 10e18).toFixed(
                                    3
                                )}
                            </Typography>
                        </Grid>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default BettersPanel;
