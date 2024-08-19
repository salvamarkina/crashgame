// theme.js
import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { lightColorUI, mainColorUI } from './constants';

// Light Theme
export const lightTheme = createTheme({
    // Define your light theme properties here
    palette: {
        mode: 'light',
        primary: {
            main: '#1976D2'
        },
        secondary: {
            main: '#388E3C'
        },
        headerbuttons: {
            primary: '#46568B'
        },
        text: {
            transparent: 'transparent',
            primary: grey[100],
            secondary: grey[200],
            third: grey[300],
            invertedprimary: grey[800],
            invertedsecondary: grey[700],
            invertedthird: grey[700],
            invertedfourth: grey[500],
            brandUI: lightColorUI,
            walletbalancechange: lightColorUI,
            walletbuttons: lightColorUI,
            marketscardprimary: grey[700],
            marketscardsecondary: '#414141'
        },
        button: {
            send: mainColorUI
        },
        background: {
            default: grey[200],
            paper: grey[200]
        },
        card: {
            main: grey[50],
            secondary: grey[300],
            third: grey[400],
            ultra: grey[100],
            balancescard: grey[300],
            dashboardcard: grey[300],
            light: grey[600]
        },
        btcharttimeframebutton: {
            main: grey[200]
        },
        settingsicon: {
            main: grey[600]
        },
        multichainicon: {
            main: grey[200],
            secondary: grey[700]
        },
        appbar: {
            main: grey[900]
        },
        govcardcirclebuttontext: {
            main: grey[700]
        }
    },
    typography: {
        fontFamily: 'Ubuntu Sans'
    }
});

// Dark Theme
export const darkTheme = createTheme({
    // Define your dark theme properties here
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976D2'
        },
        secondary: {
            main: '#388E3C'
        },
        headerbuttons: {
            primary: '#1b2030'
        },
        text: {
            transparent: 'transparent',
            primary: grey[800],
            secondary: grey[700],
            third: grey[600],
            invertedprimary: grey[100],
            invertedsecondary: grey[200],
            invertedthird: grey[300],
            invertedfourth: grey[400],
            brandUI: lightColorUI,
            walletbalancechange: '#48C69F',
            walletbuttons: '#48C69F',
            marketscardprimary: grey[700],
            marketscardsecondary: '#B2B2B2'
        },
        button: {
            send: lightColorUI
        },
        background: {
            default: '#17191f',
            paper: '#17191f'
            // paper: '#010e3d'
        },
        card: {
            main: '#272d3a',
            alternative: '#42445b',
            secondary: grey[700],
            third: grey[600],
            ultra: grey[900],
            balancescard: grey[900],
            dashboardcard: grey[800],
            light: '#323c48'
        },
        btcharttimeframebutton: {
            main: grey[800]
        },
        settingsicon: {
            main: grey[400]
        },
        multichainicon: {
            main: grey[800],
            secondary: grey[300]
        },
        appbar: {
            main: '#090909'
        },
        govcardcirclebuttontext: {
            main: grey[400]
        }
    },
    typography: {
        fontFamily: 'Antonio'
    }
});
