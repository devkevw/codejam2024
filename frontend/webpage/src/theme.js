// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#98CEED', // light blue
    },
    secondary: {
      main: '#438fc2', // darker blue
    },
    background: {
      default: '#f9f9f9', // Light gray
      paper: '#ffffff', // White for Paper components
    },
    text: {
      primary: '#000000', // Dark text
      secondary: '#CCCCCC', // Light gray text
    },
  },
  typography: {
    fontFamily: 'Parkinsans, sans-serif', // Global font
    h1: {
      fontSize: '2.5rem',
      fontWeight: 400,

    }, 
    h5: {
        fontWeight: 500,

    },
    h6: {
        fontWeight: 500,
    },

    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    subtitle1: {
        fontWeight:500,

    },
    button: {
      textTransform: 'none',
    },
  },
  shadows: Array(25).fill('none'),
});

export default theme;
