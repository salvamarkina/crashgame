// CoinFlip.js
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import './CoinFlip.css';

const Coin = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState('');

    const startFlip = () => {
        setIsSpinning(true);
        setResult('');

        setTimeout(() => {
            const flipResult = Math.random() > 0.5 ? 'heads' : 'tails';
            setResult(flipResult);
            setIsSpinning(false);
        }, 2800); // Duration of the spin minus the smooth transition time
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Box className={`coin ${isSpinning ? 'spin' : ''} ${!isSpinning && result ? result : ''}`} />
            <Button variant="contained" onClick={startFlip} disabled={isSpinning} sx={{ mt: 3 }}>
                Flip Coin
            </Button>
            {result && (
                <Box mt={2} fontSize="24px">
                    {result.charAt(0).toUpperCase() + result.slice(1)}
                </Box>
            )}
        </Box>
    );
};

export default Coin;
