import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { createTheme } from '@mui/system';
import { lightTheme, darkTheme } from 'themes/theme'; // Import your themes
// routing
import Routes from 'routes';

// project imports
// ==============================|| APP ||============================== //
const App = () => {
    // const customization = useSelector((state) => state.customization);
    const themeMode = useSelector((state) => state.theme.mode);

    const theme = createTheme(themeMode === 'dark' ? lightTheme : darkTheme, {
        typography: {
            fontFamily: [
                'Ubuntu Sans' // Your font name here
            ].join(',')
        }
    });

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes />
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
