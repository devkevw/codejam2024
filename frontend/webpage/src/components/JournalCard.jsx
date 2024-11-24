import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const JournalCard = ({ date, message }) => {
  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        {date ? (
          <>
            <Typography variant="h6">Journal Entry</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {date}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {message}
            </Typography>
          </>
        ) : (
          <Typography variant="body1">No date selected</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default JournalCard;
