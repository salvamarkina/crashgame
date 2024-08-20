import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import PropTypes from 'prop-types';

function CountdownTimer({ targetTimestamp }) {
    const theme = useTheme();
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetTimestamp - now;

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({
                days: days < 10 ? `0${days}` : days.toString(),
                hours: hours < 10 ? `0${hours}` : hours.toString(),
                minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
                seconds: seconds < 10 ? `0${seconds}` : seconds.toString()
            });

            if (difference < 0) {
                clearInterval(timer);
                setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetTimestamp]);

    return (
        <Typography sx={{ color: theme.palette.text.invertedsecondary, fontWeight: 600, fontSize: 14 }}>
            {timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
        </Typography>
    );
}

CountdownTimer.propTypes = {
    targetTimestamp: PropTypes.number.isRequired
};

export default CountdownTimer;
