// material-ui
import { grey } from '@mui/material/colors';
import { Grid, Button, Box, Typography } from '@mui/material';
import { injected } from '../../components/wallet/connectors';
import { useWeb3React } from '@web3-react/core';
import { useTheme } from '@mui/system';

const ConnectWalletCard = ({ text }) => {
    const { activate } = useWeb3React();
    const theme = useTheme();
    const connect = async () => {
        try {
            await activate(injected);
        } catch (ex) {
            console.log(ex);
        }
    };

    return (
        <>
            <Grid container xs={11.7} lg={9.7} md={9.7} display="flex" justifyContent="center" flexDirection="row">
                <Box sx={{ bgcolor: theme.palette.card.main, width: '100%', justifyContent: 'center', px: 3, py: 5, borderRadius: 2 }}>
                    <Typography sx={{ textAlign: 'center', fontWeight: 700, color: theme.palette.text.invertedprimary, fontSize: 19 }}>
                        Please, connect your wallet
                    </Typography>
                    <Grid container width="100%" display="flex" justifyContent="center" mt={1}>
                        <Typography sx={{ fontSize: 14, textAlign: 'center', color: theme.palette.text.invertedthird }}>
                            We couldn’t detect a wallet. Connect a wallet to {text}.
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
                </Box>
            </Grid>
        </>
    );
};

export default ConnectWalletCard;
