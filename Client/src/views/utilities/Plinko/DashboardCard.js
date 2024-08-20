import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { useState, useRef } from 'react';
import PlinkoBoard from './PlinkoBoard';
import { green, grey, yellow } from '@mui/material/colors';
import InfoIcon from '@mui/icons-material/Info';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ArticleIcon from '@mui/icons-material/Article';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import bnblogo from '../../../assets/bnblogo.svg';
import Test from './Test';

const DashboardCard = () => {
    const theme = useTheme();
    const [rows, setRows] = useState(12);
    const plinkoRef = useRef();

    const handleChange = (event) => {
        setRows(event.target.value);
    };

    const handleDropBall = () => {
        if (plinkoRef.current) {
            plinkoRef.current.handleDropBall(); // Call the function defined in PlinkoBoard
        }
    };

    return (
        <>
            <Grid container sx={{ p: { lg: 10, md: 7, sm: 3, xs: 1 } }}>
                <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', mt: 20 }}>
                    <Grid container lg={3} md={5} sm={10} xs={12}>
                        <Grid
                            container
                            sx={{ bgcolor: theme.palette.card.alternative, borderRadius: 2, justifyContent: 'space-between', p: 2, mt: 1 }}
                        >
                            <Grid container width="50%" alignItems="center">
                                <Typography sx={{ color: grey[200], fontSize: 18, fontWeight: 500 }}>Bet Amount</Typography>
                                <InfoIcon sx={{ color: grey[300], fontSize: 18 }} />
                            </Grid>
                            <Grid container width="50%" justifyContent="right">
                                <Typography sx={{ color: grey[200], fontSize: 18, fontWeight: 500 }}>0.0000000 BNB</Typography>
                            </Grid>
                            <Grid container lg={6.7} mt={2}>
                                <TextField
                                    value="0.00"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            color: '#FFFFFF', // Change text color here
                                            fontWeight: 600,
                                            backgroundColor: theme.palette.card.main // Change background color here
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: 0
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            border: 0
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            border: 0
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid container lg={5} display="flex" justifyContent="space-evenly" flexDirection="row" mt={2}>
                                <Button sx={{ bgcolor: theme.palette.card.main, color: grey[200], fontSize: 16 }}>½</Button>
                                <Button sx={{ bgcolor: theme.palette.card.main, color: grey[200], fontSize: 16 }}>x2</Button>
                            </Grid>
                            <Box sx={{ width: '100%', mt: 3 }}>
                                <FormControl fullWidth sx={{ bgcolor: theme.palette.card.main, borderRadius: 2 }}>
                                    <InputLabel id="demo-simple-select-label">Rows</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        size="small"
                                        value={rows}
                                        label="Rows"
                                        sx
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={12}>12</MenuItem>
                                        <MenuItem value={16}>16</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Grid container mt={2}>
                                <Button
                                    fullWidth
                                    onClick={handleDropBall}
                                    size="large"
                                    sx={{ bgcolor: green[400], textTransform: 'none', color: grey[900] }}
                                >
                                    Bet
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            sx={{ bgcolor: theme.palette.card.alternative, borderRadius: 2, justifyContent: 'space-between', p: 2, mt: 2 }}
                        >
                            <Typography sx={{ color: grey[200], fontSize: 24, fontWeight: 500 }}>Statistics</Typography>
                            <QueryStatsIcon sx={{ color: green[400], fontSize: 40 }} />
                            <Grid container lg={12} mt={2} justifyContent="space-between" display="flex">
                                <Typography sx={{ color: grey[300], fontSize: 16, fontWeight: 500 }}>24h Volume</Typography>
                                <Typography sx={{ color: grey[400], fontSize: 16, fontWeight: 500, alignItems: 'center', display: 'flex' }}>
                                    0.00 BNB ($0.00)
                                    <img src={bnblogo} alt="bnblogo" width={18} height={18} style={{ marginLeft: 5 }} />
                                </Typography>
                            </Grid>
                            <Grid container lg={12} mt={2} justifyContent="space-between" display="flex">
                                <Typography sx={{ color: grey[300], fontSize: 16, fontWeight: 500 }}>My Total Bets</Typography>
                                <Typography sx={{ color: grey[400], fontSize: 16, fontWeight: 500, alignItems: 'center', display: 'flex' }}>
                                    0.00 BNB ($0.00)
                                    <img src={bnblogo} alt="bnblogo" width={18} height={18} style={{ marginLeft: 5 }} />
                                </Typography>
                            </Grid>
                            <Grid container mt={2}>
                                <Button
                                    fullWidth
                                    endIcon={<ArticleIcon />}
                                    size="large"
                                    sx={{
                                        bgcolor: theme.palette.card.main,
                                        textTransform: 'none',
                                        color: grey[200],
                                        border: 1,
                                        borderColor: grey[700],
                                        ':hover': { bgcolor: grey[200], color: theme.palette.card.main }
                                    }}
                                >
                                    View docs
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            sx={{ bgcolor: theme.palette.card.alternative, borderRadius: 2, justifyContent: 'space-between', p: 2, mt: 2 }}
                        >
                            <Typography sx={{ color: grey[200], fontSize: 24, fontWeight: 500 }}>Rewards</Typography>
                            <EmojiEventsIcon sx={{ color: yellow[400], fontSize: 40 }} />
                            <Grid container lg={12} mt={2} justifyContent="space-between" display="flex">
                                <Typography sx={{ color: grey[300], fontSize: 16, fontWeight: 500 }}>Pending Rewards</Typography>
                                <Typography sx={{ color: grey[400], fontSize: 16, fontWeight: 500, alignItems: 'center', display: 'flex' }}>
                                    0.00 BNB ($0.00)
                                    <img src={bnblogo} alt="bnblogo" width={18} height={18} style={{ marginLeft: 5 }} />
                                </Typography>
                            </Grid>
                            <Grid container mt={2}>
                                <Button
                                    fullWidth
                                    size="large"
                                    sx={{
                                        bgcolor: theme.palette.card.main,
                                        textTransform: 'none',
                                        color: grey[200],
                                        border: 1,
                                        borderColor: grey[700],
                                        ':hover': { bgcolor: grey[200], color: theme.palette.card.main }
                                    }}
                                >
                                    Claim
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ width: '75%', bgcolor: theme.palette.card.main, display: 'flex', justifyContent: 'center' }}>
                        <PlinkoBoard ref={plinkoRef} />
                    </Grid>
                    <Test />
                </Grid>
            </Grid>
        </>
    );
};

export default DashboardCard;
