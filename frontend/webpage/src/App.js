import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import Header from './components/Header';
import Calendar from './components/Calendar';

function App() {
  return (
    <div>
      <CssBaseline />
      <Header />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Calendar />
      </Container>
    </div>
  );
}

export default App;
