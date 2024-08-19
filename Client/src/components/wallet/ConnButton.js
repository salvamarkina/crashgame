/* eslint-disable no-nested-ternary */
import { useWeb3React } from '@web3-react/core';
import { useTheme } from '@mui/material/styles';
import { injected } from './connectors';
import { Button, Grid, Typography, Modal, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { brandColor } from 'themes/constants';

const EXPECTED_CHAIN_ID = 97;

function formatString(str) {
    if (str.length <= 8) {
        return str;
    }
    return `${str.slice(0, 2)}...${str.slice(-4)}`;
}

const ConnButton = () => {
    const { activate, active, account, chainId } = useWeb3React();
    const [formattedAccount, setFormattedAccount] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isWrongChain, setIsWrongChain] = useState(false);
    const theme = useTheme();

    const handleCloseChain = () => {
        setIsWrongChain(false);
    };

    const connect = async () => {
        try {
            await activate(injected);
        } catch (ex) {
            console.log(ex);
        }
    };

    useEffect(() => {
        if (account) {
            setFormattedAccount(formatString(account));
            setIsWrongChain(chainId !== EXPECTED_CHAIN_ID);
            setIsOpen(chainId !== EXPECTED_CHAIN_ID);
        } else {
            setFormattedAccount('');
        }
    }, [account, chainId]);
    return (
        <div>
            <Grid item sx={{ borderRadius: 2, backgroundColor: 'transparent' }}>
                <Button
                    sx={{
                        background: theme.palette.headerbuttons.primary,
                        borderRadius: 1,
                        color: grey[100],
                        fontWeight: 700,
                        fontSize: 16,
                        width: '100%',
                        borderTopRightRadius: 50,
                        borderBottomRightRadius: 50,
                        borderTopLeftRadius: account || active ? 0 : 50,
                        borderBottomLeftRadius: account || active ? 0 : 50,
                        height: 32,
                        letterSpacing: '0.4px',
                        textTransform: 'none'
                    }}
                    endIcon={account ? isWrongChain ? <CancelOutlinedIcon /> : <ArrowForwardIosIcon style={{ fontSize: 13 }} /> : null}
                    onClick={() => {
                        connect();
                    }}
                    variant="contained"
                >
                    {account ? (
                        <Grid container sx={{ position: 'absolute', bgcolor: 'transparent', width: 'auto', display: 'flex', left: -25 }}>
                            <AccountBalanceWalletIcon
                                sx={{
                                    borderRadius: '50%',
                                    color: brandColor,
                                    bgcolor: theme.palette.card.light,
                                    fontSize: 34,
                                    p: 0.55,
                                    border: 2
                                }}
                            />
                        </Grid>
                    ) : null}
                    {account ? (isWrongChain ? 'Wrong network' : formattedAccount) : 'Connect wallet'}
                </Button>
                <Modal open={isOpen} onClose={handleCloseChain}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: { xs: '90%', sm: '70%', md: '40%', lg: '30%' },
                            backdropFilter: 'blur(10px)',
                            bgcolor: 'rgba(30, 50, 115, 0.4)',
                            border: 0,
                            borderRadius: 2,
                            boxShadow: 24,
                            p: 4
                        }}
                    >
                        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <HighlightOffOutlinedIcon sx={{ color: 'red', fontSize: 70 }} />
                        </Grid>
                        <Grid container sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Typography sx={{ textAlign: 'center', fontSize: 16, color: theme.palette.text.invertedfourth }}>
                                Please switch to BSC Testnet.
                            </Typography>
                        </Grid>
                        <Grid container sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Button
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                                sx={{
                                    background: `linear-gradient(45deg, #EB4308, #f9774b)`,
                                    textTransform: 'none',
                                    borderRadius: 1.5,
                                    width: { lg: '40%', md: '45%', sm: '100%', xs: '100%' },
                                    color: grey[200],
                                    ':disabled': {
                                        background: grey[600],
                                        color: grey[100]
                                    }
                                }}
                            >
                                Close
                            </Button>
                        </Grid>
                    </Box>
                </Modal>
            </Grid>
        </div>
    );
};

export default ConnButton;
