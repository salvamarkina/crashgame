import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { contractAbi } from './abis';

function Test() {
    const { activate, active, account, library } = useWeb3React();
    const [balance, setBalance] = useState('0');
    const [web3, setWeb3] = useState(null);

    useEffect(() => {
        if (active && account) {
            const provider = new Web3(window.ethereum);
            setWeb3(provider);
            provider.eth.getBalance(account).then((balance) => {
                setBalance(Web3.utils.fromWei(balance, 'ether'));
            });
        }
    }, [active, account, library]);

    const deposit = async () => {
        if (!active || !account || !web3) return;

        const contractAddress = '0x1BA2D8C92787C175CB24D22C2aA16903e7D94c63';
        const contract = new web3.eth.Contract(contractAbi, contractAddress);
        const value = Web3.utils.toWei('0.1', 'ether'); // Adjust the value as needed

        contract.methods
            .deposit()
            .send({
                from: account, // The user's account address
                value, // Amount of Ether to send
                gas: 300000 // Gas limit, you can adjust as needed
            })
            .then(() => {
                alert('Deposit successful');
            })
            .catch((err) => {
                console.error('Deposit failed:', err);
                alert('Deposit failed');
            });
    };

    const requestCashout = async () => {
        try {
            const response = await axios.post('http://localhost:3001/cashout', { playerAddress: account });
            if (response.data.success) {
                alert(`Cashout successful: Tx Hash ${response.data.txHash}`);
            } else {
                alert('Cashout failed');
            }
        } catch (error) {
            console.error(error);
            alert('Error during cashout');
        }
    };

    return (
        <Container>
            <Typography variant="h3">Crash Game</Typography>
            {active ? (
                <div>
                    <Typography variant="body1">Connected as {account}</Typography>
                    <Typography variant="body1">Balance: {balance} ETH</Typography>
                    <Button variant="contained" color="primary" onClick={deposit}>
                        Deposit 0.1 ETH
                    </Button>
                    <Button variant="contained" color="secondary" onClick={requestCashout}>
                        Cashout
                    </Button>
                </div>
            ) : (
                <Button variant="contained" color="primary">
                    Connect Wallet
                </Button>
            )}
        </Container>
    );
}

export default Test;
