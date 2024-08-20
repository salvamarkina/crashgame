import { useEffect, useState } from 'react';
import { Grid, Typography, TextField, List, ListItem, IconButton } from '@mui/material';
import { darken, useTheme } from '@mui/system';
import { useWeb3React } from '@web3-react/core';
import { blue, grey, orange } from '@mui/material/colors';
import TelegramIcon from '@mui/icons-material/Telegram';
import { io } from 'socket.io-client';
import { brandColor } from 'themes/constants';
import { getSocket } from 'useSocket';

const ChatPanel = () => {
    const theme = useTheme();
    const { account } = useWeb3React();
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const socket = getSocket();

    useEffect(() => {
        socket.on('receiveMessage', (msg) => {
            console.log('Received message:', msg);
            setChatMessages((prevMessages) => [...prevMessages, msg]);
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

    const sendMessage = () => {
        if (message.trim() !== '') {
            const chatMessage = {
                account, // Username is the address
                message
            };
            console.log('Sending message:', chatMessage);
            socket.emit('sendMessage', chatMessage);
            setMessage(''); // Clear the input after sending
        }
    };

    return (
        <>
            <Grid
                item
                width="100%"
                sx={{
                    height: 300,
                    bgcolor: theme.palette.card.main,
                    borderRadius: 3,
                    mt: { lg: 2, md: 1, sm: 2, xs: 2 },
                    border: 2,
                    borderColor: grey[700],
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
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
                        background: '#17191f'
                    }}
                >
                    <Typography sx={{ color: brandColor, fontWeight: 700 }}>IMPORTANT:</Typography>
                    <Typography sx={{ color: grey[200], fontWeight: 500, fontSize: 14, ml: 1 }}>
                        This game is still in Beta! If you experience problems, please contact an admin!
                    </Typography>
                </Grid>

                <List
                    sx={{
                        flexGrow: 1, // Allows the List to grow and take up available space
                        overflow: 'auto',
                        bgcolor: 'transparent',
                        mt: 1 // Optional margin at the top
                    }}
                >
                    {chatMessages.map((msg, index) => (
                        <ListItem key={index} sx={{ bgcolor: 'transparent', height: 25, ':hover': { bgcolor: grey[700] } }}>
                            <Typography sx={{ color: grey[100], fontWeight: 700 }}>{formatAccount(msg.account)}:</Typography>
                            <Typography sx={{ color: grey[200], ml: 1 }}>{msg.message}</Typography>
                        </ListItem>
                    ))}
                </List>

                <TextField
                    fullWidth
                    variant="filled"
                    size="small"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => (e.key === 'Enter' ? sendMessage() : null)}
                    sx={{
                        height: 40,
                        mb: 0.3,
                        alignItems: 'center',
                        backgroundColor: '#17191f', // Custom background color
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderTop: `2px solid ${grey[700]}`, // Custom top border
                        borderBottom: 'none', // No bottom border
                        '& .MuiFilledInput-root': {
                            height: 40,
                            backgroundColor: '#17191f', // Ensures the filled variant respects the custom background color
                            '&:hover': {
                                backgroundColor: '#17191f' // Hover background color
                            },
                            '&.Mui-focused': {
                                backgroundColor: '#17191f' // Background color when focused
                            },
                            borderRadius: '0 0 10px 10px' // Ensures the bottom corners are rounded
                        },
                        '& .MuiInputBase-input': { color: theme.palette.text.invertedthird, fontSize: 14, mt: -1, mb: 1 }
                    }}
                    InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                            <IconButton
                                size="small"
                                onClick={sendMessage}
                                sx={{ bgcolor: brandColor, ':hover': { bgcolor: darken(brandColor, 0.2) } }}
                            >
                                <TelegramIcon sx={{ fontSize: 15, color: grey[900] }} />
                            </IconButton>
                        )
                    }}
                />
            </Grid>
        </>
    );
};

export default ChatPanel;
