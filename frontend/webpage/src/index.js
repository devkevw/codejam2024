// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App';
// import './styles.css';

// const container = document.getElementById('root');
// const root = createRoot(container);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App';
import theme from './theme'; // Import custom theme

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent baseline styles */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
