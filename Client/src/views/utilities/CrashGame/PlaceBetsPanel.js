import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Grid, Typography, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/system';
import { useWeb3React } from '@web3-react/core';
import { grey, yellow } from '@mui/material/colors';
import bnblogo from '../../../assets/bnblogo.svg';
import ConnButtonColorful from 'components/wallet/ConnButtonColorful';
import { init, getRewards, placeBet, cashout } from '../../../components/wallet/sharesABI';

const PlaceBetsPanel = () => {
    const theme = useTheme();
    const { account, active } = useWeb3React();
    const [hasBet, setHasBet] = useState(false);
    const [rewards, setRewards] = useState('0.000');
    const [betAmount, setBetAmount] = useState('0.0025'); // Default bet amount
    const [initialized, setInitialized] = useState(false);
    const [multiplier, setMultiplier] = useState('1.00x');
    const [bettingPhase, setBettingPhase] = useState(false);
    const [hasCashedout, setHasCashedout] = useState(false);
    const [cashedoutAmount, setCashedoutAmount] = useState('1.00x');
    const [buttonText, setButtonText] = useState('Join game');
    const [gameInProgress, setGameInProgress] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    const [socket] = useState(() => io('http://alphax.social:3002'));

    useEffect(() => {
        // Initialize Web3 and contract on component mount
        const initialize = async () => {
            await init();
            setInitialized(true);
        };
        initialize();
    }, []);

    const handleGetRewards = async () => {
        if (initialized) {
            const rewardAmount = await getRewards();
            console.log('Reward Amount:', rewardAmount);
            setRewards(rewardAmount);
        } else {
            console.log('Web3 not initialized yet.');
        }
    };

    useEffect(() => {
        if (socket) {
            socket.on('connect', () => {
                console.log('Connected to server');
            });

            socket.on('cashoutSuccess', (data) => {
                setHasCashedout(true);
                setCashedoutAmount(`${(data.cashoutMultiplier / 100).toFixed(2)}x`);
                console.log(`Cashed out successfully at ${data.cashoutMultiplier}x`);
            });

            socket.on('cashoutError', (error) => {
                console.error('Cashout error:', error);
                // Display an error message to the user
            });

            socket.on('bettingPhaseStarted', () => {
                handleGetRewards();
                setBettingPhase(true);
                setGameInProgress(false);
                console.log('Betting phase started');
            });

            socket.on('bettingPhaseEnded', () => {
                setBettingPhase(false);
                setGameInProgress(true);
            });

            socket.on('crash', () => {
                setHasBet(false);
                setGameInProgress(false);
            });

            socket.on('multiplierUpdate', (data) => {
                setMultiplier(`${data.multiplier}x`);
            });
        }
    }, [socket]);

    const handlePlaceBet = async (amount) => {
        if (initialized) {
            try {
                // Execute the placeBet function
                await placeBet(amount);

                // Emit a socket event to the server upon successful transaction
                socket.emit('betPlaced', {
                    playerAddress: account,
                    betAmount: amount * 10e18
                });

                setHasBet(true);
            } catch (error) {
                console.error('Error placing bet:', error);
            }
        } else {
            console.log('Web3 not initialized yet.');
        }
    };

    const handleCashout2 = () => {
        if (account && socket) {
            socket.emit('cashout', {
                playerAddress: account
            });
        }
    };

    const handleCashoutRewards = async () => {
        if (initialized) {
            await cashout();
            handleGetRewards(); // Optionally refresh rewards after cashing out
        } else {
            console.log('Web3 not initialized yet.');
        }
    };

    useEffect(() => {
        if (account && active && initialized) {
            handleGetRewards();
        }
    }, [account, active, initialized]);

    useEffect(() => {
        if (gameInProgress && hasBet && hasCashedout) {
            setButtonText(`Cashed at ${cashedoutAmount}`);
            setDisabledButton(true);
        } else if (gameInProgress && hasBet && !hasCashedout) {
            setButtonText(`Cashout at ${multiplier}`);
            setDisabledButton(false);
        } else if (gameInProgress && !hasBet) {
            setButtonText('Bets are closed');
            setDisabledButton(true);
        } else if (bettingPhase && hasBet) {
            setButtonText('Already bet');
            setDisabledButton(true);
        } else if (bettingPhase && !hasBet) {
            setButtonText('Join game');
            setDisabledButton(false);
        } else {
            setButtonText('Rewarding users...');
            setDisabledButton(true);
        }
    }, [gameInProgress, hasBet, bettingPhase, multiplier]);

    return (
        <Grid
            item
            lg={4.3}
            md={4.3}
            xs={12}
            sx={{
                height: 400,
                bgcolor: theme.palette.card.main,
                borderRadius: 3,
                border: 2,
                borderColor: grey[700],
                mt: { lg: 0, md: 0, xs: 2, sm: 2 }
            }}
        >
            <Grid
                container
                sx={{
                    background: '#17191f',
                    height: 40,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Typography sx={{ color: grey[100], fontSize: 22, mb: 0.5, fontWeight: 900 }}>PLACE YOUR BETS</Typography>
            </Grid>
            {account && active ? (
                <Grid container display="flex" justifyContent="center" p={2}>
                    <Grid container display="flex" width="100%" justifyContent="space-between">
                        <Grid item width="30%">
                            <Button
                                fullWidth
                                startIcon={<img src={bnblogo} alt="logo" width={20} />}
                                onClick={() => handlePlaceBet('0.0025')}
                                sx={{
                                    color: grey[100],
                                    border: 1,
                                    borderRadius: 1,
                                    bgcolor: theme.palette.card.light,
                                    borderColor: grey[700],
                                    boxShadow: 4,
                                    height: 40
                                }}
                            >
                                <Typography sx={{ color: grey[100], fontSize: 18, mb: 0.2 }}>0.0025</Typography>
                            </Button>
                        </Grid>
                        <Grid item width="30%">
                            <Button
                                fullWidth
                                startIcon={<img src={bnblogo} alt="logo" width={20} />}
                                onClick={() => handlePlaceBet('0.01')}
                                sx={{
                                    color: grey[100],
                                    border: 1,
                                    borderRadius: 1,
                                    bgcolor: theme.palette.card.light,
                                    borderColor: grey[700],
                                    boxShadow: 4,
                                    height: 40
                                }}
                            >
                                <Typography sx={{ color: grey[100], fontSize: 18, mb: 0.2 }}>0.01</Typography>
                            </Button>
                        </Grid>
                        <Grid item width="30%">
                            <Button
                                fullWidth
                                startIcon={<img src={bnblogo} alt="logo" width={20} />}
                                onClick={() => handlePlaceBet('0.02')}
                                sx={{
                                    color: grey[100],
                                    border: 1,
                                    borderRadius: 1,
                                    bgcolor: theme.palette.card.light,
                                    borderColor: grey[700],
                                    boxShadow: 4,
                                    height: 40
                                }}
                            >
                                <Typography sx={{ color: grey[100], fontSize: 18, mb: 0.2 }}>0.02</Typography>
                            </Button>
                        </Grid>
                        <Grid item width="30%" mt={2}>
                            <Button
                                fullWidth
                                startIcon={<img src={bnblogo} alt="logo" width={20} />}
                                onClick={() => handlePlaceBet('0.05')}
                                sx={{
                                    color: grey[100],
                                    border: 1,
                                    borderRadius: 1,
                                    bgcolor: theme.palette.card.light,
                                    borderColor: grey[700],
                                    boxShadow: 4,
                                    height: 40
                                }}
                            >
                                <Typography sx={{ color: grey[100], fontSize: 18, mb: 0.2 }}>0.05</Typography>
                            </Button>
                        </Grid>
                        <Grid item width="30%" mt={2}>
                            <Button
                                fullWidth
                                startIcon={<img src={bnblogo} alt="logo" width={20} />}
                                onClick={() => handlePlaceBet('0.1')}
                                sx={{
                                    color: grey[100],
                                    border: 1,
                                    borderRadius: 1,
                                    bgcolor: theme.palette.card.light,
                                    borderColor: grey[700],
                                    boxShadow: 4,
                                    height: 40
                                }}
                            >
                                <Typography sx={{ color: grey[100], fontSize: 18, mb: 0.2 }}>0.1</Typography>
                            </Button>
                        </Grid>
                        <Grid item width="30%" mt={2}>
                            <Button
                                fullWidth
                                startIcon={<img src={bnblogo} alt="logo" width={20} />}
                                onClick={() => handlePlaceBet('0.5')}
                                sx={{
                                    color: grey[100],
                                    border: 1,
                                    borderRadius: 1,
                                    bgcolor: theme.palette.card.light,
                                    borderColor: grey[700],
                                    boxShadow: 4,
                                    height: 40
                                }}
                            >
                                <Typography sx={{ color: grey[100], fontSize: 18, mb: 0.2 }}>0.5</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container mt={2}>
                        <TextField
                            fullWidth
                            value={betAmount}
                            variant="outlined"
                            size="small"
                            onChange={(e) => setBetAmount(e.target.value)}
                            sx={{
                                height: 40,
                                mb: 3,
                                alignItems: 'center',
                                backgroundColor: '#17191f',
                                '& .MuiFilledInput-root': {
                                    height: 40,
                                    backgroundColor: '#17191f',
                                    '&:hover': {
                                        backgroundColor: '#17191f'
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: '#17191f'
                                    }
                                },
                                '& .MuiInputBase-input': {
                                    textAlign: 'right',
                                    color: theme.palette.text.invertedthird,
                                    fontSize: 16,
                                    letterSpacing: '1px',
                                    fontWeight: 900
                                }
                            }}
                            InputProps={{
                                disableUnderline: true
                            }}
                        />
                    </Grid>
                    <Grid container>
                        <Button
                            fullWidth
                            onClick={() => {
                                if (gameInProgress && hasBet) {
                                    handleCashout2();
                                } else if (bettingPhase && !hasBet) {
                                    handlePlaceBet(betAmount);
                                }
                            }}
                            disabled={disabledButton}
                            sx={{
                                color: grey[900],
                                background: `linear-gradient(to right, ${yellow[300]}, ${yellow[800]})`,
                                border: disabledButton ? 0 : 2,
                                borderColor: yellow[300],
                                fontSize: 16,
                                fontWeight: 800,
                                ':disabled': { color: grey[100], background: `linear-gradient(to right, ${grey[600]}, ${grey[800]})` }
                            }}
                        >
                            {buttonText}
                        </Button>
                    </Grid>
                    <Grid container mt={2} mb={0.5}>
                        <Typography sx={{ color: grey[400], fontSize: 14, letterSpacing: '0.5px' }}>
                            Pending Rewards: {parseFloat(rewards).toFixed(4)} BNB
                        </Typography>
                    </Grid>
                    <Grid container>
                        <Button
                            fullWidth
                            onClick={handleCashoutRewards}
                            disabled={rewards === 0}
                            sx={{
                                color: grey[900],
                                background: `linear-gradient(to right, ${yellow[300]}, ${yellow[800]})`,
                                border: 2,
                                borderColor: yellow[300],
                                fontSize: 16,
                                fontWeight: 900
                            }}
                        >
                            CLAIM REWARDS
                        </Button>
                    </Grid>
                </Grid>
            ) : (
                <Grid container mt={-2} display="flex" height="100%" alignItems="center" justifyContent="center" flexDirection="column">
                    <Typography sx={{ color: grey[200], fontWeight: 700, pb: 2 }}>Connect wallet to place bets</Typography>
                    <ConnButtonColorful />
                </Grid>
            )}
        </Grid>
    );
};

export default PlaceBetsPanel;
