import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Collapse, Grid, IconButton, List, Switch, ListItemButton, ListItemText, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import alphaxlogo from '../../assets/alxlogo.svg';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useState } from 'react';
import PropTypes from 'prop-types';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5
            }
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff'
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
        }
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500
        })
    }
}));

export default function MenuDrawer({ isOpen, onClose }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [isLightTheme, setIsLightTheme] = useState(true);
    const handleToggle = () => {
        setIsLightTheme(!isLightTheme);
        dispatch({ type: 'TOGGLE_THEME' });
    };
    const [openDAO, setOpenDAO] = React.useState(false);
    const handleClickDAO = () => {
        setOpenDAO(!openDAO);
    };
    const list = () => (
        <List sx={{ width: '100vw', bgcolor: 'background.paper', height: '100vh' }} component="nav">
            <Grid container justifyContent="space-between" mb={2} bgcolor="background.paper" mt={-1} pb={1}>
                <img src={alphaxlogo} alt="alphaxlogo" width={35} height={35} style={{ marginLeft: 20, marginTop: 10 }} />
                <IconButton onClick={onClose} sx={{ width: 35, height: 35, mt: 0.8, mr: 2 }}>
                    <CloseIcon sx={{ color: theme.palette.text.invertedthird }} />
                </IconButton>
            </Grid>
            <Grid container>
                <Typography sx={{ color: theme.palette.text.invertedfourth, fontSize: 14, pl: 3, pt: 1 }}>Menu</Typography>
            </Grid>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <ListItemButton onClick={onClose} sx={{ m: 1, '&:hover': { bgcolor: 'unset', color: 'unset' } }}>
                    <ListItemText>
                        <Typography sx={{ color: theme.palette.text.invertedprimary, fontSize: 20, fontWeight: 600, letterSpacing: '1px' }}>
                            Dashboard
                        </Typography>
                    </ListItemText>
                </ListItemButton>
            </Link>
            <Link to="/lease" style={{ textDecoration: 'none' }}>
                <ListItemButton
                    onClick={onClose}
                    sx={{
                        m: 1,
                        color: grey[300],
                        '&:hover': { bgcolor: 'unset', color: grey[300] }
                    }}
                >
                    <ListItemText>
                        <Typography sx={{ color: theme.palette.text.invertedprimary, fontSize: 20, fontWeight: 600, letterSpacing: '1px' }}>
                            Lease
                        </Typography>
                    </ListItemText>
                </ListItemButton>
            </Link>
            <Link to="/lendborrow" style={{ textDecoration: 'none' }}>
                <ListItemButton
                    onClick={onClose}
                    sx={{
                        m: 1,
                        color: grey[300],
                        '&:hover': { bgcolor: 'unset', color: grey[300] }
                    }}
                >
                    <ListItemText>
                        <Typography sx={{ color: theme.palette.text.invertedprimary, fontSize: 20, fontWeight: 600, letterSpacing: '1px' }}>
                            Lend and borrow
                        </Typography>
                    </ListItemText>
                </ListItemButton>
            </Link>
            <ListItemButton
                onClick={handleClickDAO}
                sx={{
                    m: 1,
                    color: theme.palette.text.invertedsecondary,
                    '&:hover': { bgcolor: 'unset', color: theme.palette.text.invertedprimary }
                }}
            >
                <ListItemText>
                    <Typography sx={{ color: theme.palette.text.invertedprimary, fontSize: 20, fontWeight: 600, letterSpacing: '1px' }}>
                        DAO
                    </Typography>
                </ListItemText>
                {openDAO ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openDAO} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Link to="/governance" style={{ textDecoration: 'none' }}>
                        <ListItemButton onClick={onClose} sx={{ pl: 4, color: grey[400] }}>
                            <ListItemText>
                                <Typography sx={{ color: theme.palette.text.invertedthird, fontWeight: 400, letterSpacing: '1px' }}>
                                    Governance
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    </Link>
                    <Link to="/staking" style={{ textDecoration: 'none' }}>
                        <ListItemButton onClick={onClose} sx={{ pl: 4, color: grey[400] }}>
                            <ListItemText>
                                <Typography sx={{ color: theme.palette.text.invertedthird, fontWeight: 400, letterSpacing: '1px' }}>
                                    Staking
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    </Link>
                </List>
            </Collapse>
            <Link to="/analytics" style={{ textDecoration: 'none' }}>
                <ListItemButton
                    onClick={onClose}
                    sx={{
                        borderBottom: 1,
                        px: 3,
                        pb: 3,
                        borderColor: grey[500],
                        color: grey[300],
                        '&:hover': { bgcolor: 'unset', color: grey[300] }
                    }}
                >
                    <ListItemText>
                        <Typography sx={{ color: theme.palette.text.invertedprimary, fontSize: 20, fontWeight: 600, letterSpacing: '1px' }}>
                            Analytics
                        </Typography>
                    </ListItemText>
                </ListItemButton>
            </Link>
            <Grid container mt={4}>
                <Typography sx={{ color: theme.palette.text.invertedfourth, fontSize: 14, pl: 3 }}>Global settings</Typography>
            </Grid>
            <Grid container justifyContent="space-between" display="flex" px={3} alignItems="center">
                <Grid item mt={2}>
                    <Typography sx={{ color: theme.palette.text.invertedprimary, fontWeight: 505, fontSize: 14 }}>Light mode</Typography>
                </Grid>
                <Grid item mt={2} display="flex" alignItems="center">
                    <Typography sx={{ color: theme.palette.text.invertedprimary, fontWeight: 505, fontSize: 14, pr: 1 }}>
                        {isLightTheme ? 'Off' : 'On'}
                    </Typography>
                    <IOSSwitch checked={!isLightTheme} onClick={handleToggle} />
                </Grid>
            </Grid>
            <Grid container justifyContent="space-between" display="flex" px={3} alignItems="center">
                <Grid item mt={2}>
                    <Typography sx={{ color: theme.palette.text.invertedprimary, fontWeight: 505, fontSize: 14 }}>Network</Typography>
                </Grid>
                <Grid item mt={2}>
                    <Typography sx={{ color: theme.palette.text.invertedprimary, fontWeight: 505, fontSize: 14 }}>BSC</Typography>
                </Grid>
            </Grid>
            <Grid container mt={4} borderTop={1} borderColor={grey[500]}>
                <Typography sx={{ color: theme.palette.text.invertedfourth, fontSize: 14, pl: 3, pt: 3.5 }}>Links</Typography>
            </Grid>
            <Grid container display="flex" px={3} alignItems="center" mt={2}>
                <HelpOutlineOutlinedIcon sx={{ color: theme.palette.text.invertedprimary, fontSize: 20 }} />
                <Typography sx={{ color: theme.palette.text.invertedprimary, fontWeight: 505, fontSize: 14, pl: 1 }}>FAQ</Typography>
            </Grid>
            <Grid container display="flex" px={3} alignItems="center" mt={2}>
                <AutoStoriesOutlinedIcon sx={{ color: theme.palette.text.invertedprimary, fontSize: 20 }} />
                <Typography sx={{ color: theme.palette.text.invertedprimary, fontWeight: 505, fontSize: 14, pl: 1 }}>Developers</Typography>
            </Grid>
        </List>
    );

    return (
        <div>
            <Drawer anchor="right" open={isOpen} onClose={onClose}>
                <Box
                    sx={{
                        borderRadius: 10,
                        bgcolor: theme.palette.background.default,
                        right: 0
                    }}
                >
                    {list()}
                </Box>
            </Drawer>
        </div>
    );
}

// Define prop types for MenuDrawer
MenuDrawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};
