import React, { useState } from 'react';
import { 
  Grid, 
  Typography, 
  Button, 
  Paper, 
  Box 
} from '@mui/material';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  eachDayOfInterval,
  format,
  isSameDay,
  isSameMonth,
} from 'date-fns';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate the days to display in the calendar grid
  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const firstDayOfCalendar = startOfWeek(firstDayOfMonth);
  const lastDayOfCalendar = endOfWeek(lastDayOfMonth);

  const days = eachDayOfInterval({ start: firstDayOfCalendar, end: lastDayOfCalendar });

  // Handlers for navigating months
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button variant="contained" onClick={handlePrevMonth}>
          Prev
        </Button>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {format(currentMonth, 'MMMM yyyy')}
        </Typography>
        <Button variant="contained" onClick={handleNextMonth}>
          Next
        </Button>
      </Box>

      {/* Days of the Week Header */}
      <Grid container spacing={1}>
        {daysOfWeek.map((day) => (
          <Grid item xs={1.71} key={day}>
            <Typography align="center" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Calendar Grid */}
      <Grid container spacing={1}>
        {days.map((day) => (
          <Grid
            item
            xs={1.71}
            key={day.toString()}
          >
            <Box
              onClick={() => setSelectedDate(day)}
              sx={{
                textAlign: 'center',
                padding: 2,
                borderRadius: 2,
                backgroundColor: isSameDay(day, selectedDate)
                  ? 'primary.main'
                  : isSameMonth(day, currentMonth)
                  ? 'background.paper'
                  : 'grey.200',
                color: isSameDay(day, selectedDate) ? 'white' : 'text.primary',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: isSameDay(day, selectedDate) ? 'primary.dark' : 'grey.300',
                },
              }}
            >
              <Typography variant="body1">{format(day, 'd')}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Calendar;
