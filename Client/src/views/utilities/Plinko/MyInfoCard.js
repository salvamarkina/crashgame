import { Button, Grid, IconButton, Paper, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { grey } from '@mui/material/colors';
import { injected } from '../../../components/wallet/connectors';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';
import usdticon from '../../../assets/UsdtLogo.png';

const MyInfoCard = () => {
    const theme = useTheme();
    const { active, account, activate } = useWeb3React();
    const connect = async () => {
        try {
            await activate(injected);
        } catch (ex) {
            console.log(ex);
        }
    };
    const [ethBalance, setEthBalance] = useState('0.00');
    const [bnbPrice, setBnbPrice] = useState('0.00');
    const [totalClaimableUSDT, setTotalClaimableUSDT] = useState('');
    const [availableToVote, setAvailableToVote] = useState('0.00');
    const [popText, setPopText] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchBNBPrice = async () => {
            const url = 'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd';
            try {
                const response = await fetch(url);
                const data = await response.json();
                setBnbPrice(data.binancecoin.usd);
            } catch (error) {
                console.error('Error fetching BNB price:', error);
            }
        };
        fetchBNBPrice();
    }, [account, active]);

    return (
        <>
            <Grid container xs={11.7} zIndex={999} sx={{ borderRadius: 2, bgcolor: theme.palette.card.main, p: 4, alignItems: 'start' }}>
                <Grid container display="flex" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ color: theme.palette.text.invertedprimary, fontSize: 20, fontWeight: 405 }}>My info</Typography>
                    <IconButton>
                        <SettingsOutlinedIcon sx={{ color: theme.palette.text.invertedthird, fontSize: 25 }} />
                    </IconButton>
                </Grid>
                {account && active ? (
                    <Grid container display="flex" flexDirection="row" width="100%" mt={3}>
                        <Grid
                            container
                            sx={{
                                background: theme.palette.card.alternative,
                                borderRadius: 3,
                                width: '2.75rem',
                                height: '2.75rem',
                                p: 1,
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                boxShadow: 0
                            }}
                        >
                            <AccountBalanceWalletIcon sx={{ color: grey[300] }} />
                        </Grid>
                        <Grid container display="flex" width="auto" ml={2} alignItems="center">
                            <Typography color={theme.palette.text.invertedsecondary} letterSpacing="0.5px" fontSize={15}>
                                Wallet balance
                            </Typography>
                            <Grid container>
                                <Typography color={theme.palette.text.invertedprimary} fontWeight={505} fontSize={15}>
                                    {ethBalance}
                                </Typography>
                                <Typography color={theme.palette.text.invertedfourth} pl={0.5} fontWeight={505} fontSize={15}>
                                    BNB
                                </Typography>
                                <Typography color={theme.palette.text.invertedfourth} fontWeight={505} pl={0.5} fontSize={15}>
                                    (${(bnbPrice * ethBalance).toLocaleString('en-US', { maximumFractionDigits: 2 })})
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            display="flex"
                            width="100%"
                            alignItems="center"
                            justifyContent="space-between"
                            borderTop={1}
                            borderColor={theme.palette.text.invertedfourth}
                            mt={3.5}
                            pt={4}
                        >
                            <Grid container width="100%">
                                <Typography color={theme.palette.text.invertedsecondary} letterSpacing="0.5px" fontSize={14}>
                                    Pending rewards
                                </Typography>
                            </Grid>
                            <Grid container width="70%" sx={{ alignItems: 'center', display: 'flex' }}>
                                <Typography mr={0.5} color={theme.palette.text.invertedprimary} fontWeight={505} fontSize={15}>
                                    {account ? (totalClaimableUSDT / 1e18).toLocaleString('en-US', { maximumFractionDigits: 2 }) : '0.00'}
                                </Typography>
                                <img src={usdticon} alt="icon" width={15} height={15} />
                                <Grid item width="100%">
                                    <Typography color={theme.palette.text.invertedfourth} fontWeight={505} fontSize={13}>
                                        $
                                        {account
                                            ? (totalClaimableUSDT / 1e18).toLocaleString('en-US', { maximumFractionDigits: 2 })
                                            : '0.00'}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item width="30%" justifyContent="right" display="flex">
                                <Link to="/staking" style={{ textDecoration: 'none' }}>
                                    <Button
                                        disabled={!active}
                                        sx={{
                                            background: `linear-gradient(45deg, #EB4308, #f9774b)`,
                                            color: grey[200],
                                            width: '6rem',
                                            textTransform: 'none',
                                            ':disabled': { background: grey[700], color: grey[50] }
                                        }}
                                    >
                                        Claim
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container display="flex" width="100%" alignItems="center" justifyContent="space-between" pt={4}>
                            <Grid container width="100%" alignItems="center">
                                <Typography color={theme.palette.text.invertedsecondary} letterSpacing="0.5px" fontSize={14}>
                                    AlphaDAO voting power
                                </Typography>
                                <IconButton
                                    sx={{ bgcolor: 'transparent', ':hover': { bgcolor: 'transparent' } }}
                                    onClick={() => {
                                        setPopText(
                                            'The display indicates the total tokens available for voting, requiring each stake to be active for a minimum of 48 hours to qualify.'
                                        );
                                        setModalOpen(true);
                                    }}
                                >
                                    <InfoOutlinedIcon sx={{ color: theme.palette.text.invertedfourth, fontSize: 15 }} />
                                </IconButton>
                            </Grid>
                            <Grid container width="70%">
                                <Typography color={theme.palette.text.invertedprimary} fontWeight={505} fontSize={15}>
                                    {account ? availableToVote : '0.00'}
                                </Typography>
                                <Typography
                                    sx={{
                                        letterSpacing: '1px',
                                        fontSize: 15,
                                        pl: 0.5,
                                        fontWeight: 505,
                                        color: '#f9774b'
                                    }}
                                >
                                    ALP
                                </Typography>
                                <Grid item width="100%">
                                    <Typography color={theme.palette.text.invertedfourth} fontWeight={505} fontSize={13}>
                                        {availableToVote}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item width="30%" justifyContent="right" display="flex">
                                <Link to="/staking" style={{ textDecoration: 'none' }}>
                                    <Button
                                        disabled={!active}
                                        sx={{
                                            background: `linear-gradient(45deg, #EB4308, #f9774b)`,
                                            color: grey[200],
                                            width: '6rem',
                                            textTransform: 'none',
                                            ':disabled': {
                                                background: grey[700],
                                                color: grey[50]
                                            }
                                        }}
                                    >
                                        Increase
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                        <Paper
                            width="100%"
                            display="flex"
                            justifyContent="left"
                            alignItems="center"
                            elevation={0}
                            style={{ padding: 15, borderRadius: 5, boxShadow: 0, marginTop: 30 }}
                        >
                            <Typography color="#48C2E5" fontWeight={550} fontSize={13}>
                                To participate in the governance you need to secure the AlphaDAO by staking ALX tokens.
                            </Typography>
                        </Paper>
                    </Grid>
                ) : (
                    <Grid container sx={{ justifyContent: 'center', p: 2, mt: 5 }}>
                        <Typography sx={{ textAlign: 'center', fontWeight: 700, color: theme.palette.text.invertedprimary, fontSize: 19 }}>
                            Please, connect your wallet
                        </Typography>
                        <Grid container width="100%" display="flex" justifyContent="center" mt={1}>
                            <Typography sx={{ fontSize: 14, textAlign: 'center', color: theme.palette.text.invertedthird }}>
                                We couldn’t detect a wallet. Connect a wallet to view your information.
                            </Typography>
                        </Grid>
                        <Grid container width="100%" display="flex" justifyContent="center" mt={2}>
                            <Button
                                onClick={() => {
                                    connect();
                                }}
                                sx={{
                                    background: 'linear-gradient(to right, #f9774b, #CD3201)',
                                    px: 2,
                                    color: grey[50],
                                    textTransform: 'none'
                                }}
                            >
                                Connect wallet
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
            <PopUpInfo open={modalOpen} setOpen={setModalOpen} text={popText} />
        </>
    );
};

export default MyInfoCard;
