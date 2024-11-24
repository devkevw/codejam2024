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
  set,
  addDays,
  subDays,
} from 'date-fns';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [journalEntry, setJournalEntry] = useState('');
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Determine the days to display based on the view mode
  const getDaysToDisplay = () => {
    if (viewMode === 'week' && selectedDate) {
      const firstDayOfWeek = startOfWeek(selectedDate);
      const lastDayOfWeek = endOfWeek(selectedDate);
      return eachDayOfInterval({ start: firstDayOfWeek, end: lastDayOfWeek });
    } else {
      // Calculate the days to display in the calendar grid
      const firstDayOfMonth = startOfMonth(currentMonth);
      const lastDayOfMonth = endOfMonth(currentMonth);
      const firstDayOfCalendar = startOfWeek(firstDayOfMonth);
      const lastDayOfCalendar = endOfWeek(lastDayOfMonth);
      return eachDayOfInterval({ start: firstDayOfCalendar, end: lastDayOfCalendar });
    }
  };

  // Handle the previous button click
  const handlePrev = () => {
    viewMode === 'month' ? 
      setCurrentMonth(subMonths(currentMonth, 1)) : 
      setSelectedDate(subDays(selectedDate, 7));
  };

  // Handle the next button click
  const handleNext = () => {
    viewMode === 'month' ? 
      setCurrentMonth(addMonths(currentMonth, 1)) : 
      setSelectedDate(addDays(selectedDate, 7));
  }
  
  const days = getDaysToDisplay();

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button variant="contained" onClick={handlePrev}>
          Prev
        </Button>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {format(currentMonth, 'MMMM yyyy')}
        </Typography>
        <Button variant="contained" onClick={handleNext}>
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
                  ? 'primary.main' : isSameMonth(day, currentMonth)
                  ? 'background.paper' : 'grey.200',
                color: isSameDay(day, selectedDate) ? 'white' : 'text.primary',
                cursor: 'pointer', '&:hover': {
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
