/* eslint-disable no-nested-ternary */
import { useWeb3React } from '@web3-react/core';
import { injected } from './connectors';
import { Button, Grid } from '@mui/material';
import { grey, yellow } from '@mui/material/colors';
import { useState, useEffect } from 'react';

const EXPECTED_CHAIN_ID = 97;

function formatString(str) {
    if (str.length <= 8) {
        return str;
    }
    return `${str.slice(0, 2)}...${str.slice(-4)}`;
}

const ConnButtonColorful = () => {
    const { activate, account, chainId } = useWeb3React();
    const [formattedAccount, setFormattedAccount] = useState('');
    const [isWrongChain, setIsWrongChain] = useState(false);

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
        } else {
            setFormattedAccount('');
        }
    }, [account, chainId]);
    return (
        <div>
            <Grid item sx={{ borderRadius: 2, backgroundColor: 'transparent' }}>
                <Button
                    fullWidth
                    sx={{
                        background: `linear-gradient(to right, ${yellow[300]}, ${yellow[800]})`,
                        borderRadius: 1,
                        color: grey[900],
                        fontWeight: 700,
                        fontSize: 16,
                        height: 40,
                        textTransform: 'none'
                    }}
                    onClick={() => {
                        connect();
                    }}
                    variant="contained"
                >
                    {account ? (isWrongChain ? 'Wrong network' : formattedAccount) : 'Connect wallet'}
                </Button>
            </Grid>
        </div>
    );
};

export default ConnButtonColorful;
