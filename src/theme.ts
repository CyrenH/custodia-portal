import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0E1116',
            paper: '#171B21',
        },
        primary: {
            main: '#B8935A',
            contrastText: '#241B0E',
        },
        text: {
            primary: '#E8E6E0',
            secondary: '#9C978C',
        },
    },
    typography: {
        fontFamily: '"Inter", sans-serif',
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: 18,
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    height: 60,
                    fontSize: 18,
                    backgroundColor: '#0E1116',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: 16,
                    color: '#9C978C',
                },
            },
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                },
            },
        },
    },
});