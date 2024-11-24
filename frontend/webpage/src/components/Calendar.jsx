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
  addDays,
  subDays,
} from 'date-fns';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Determine the days to display based on the view mode
  const getDaysToDisplay = () => {
    if (viewMode === 'week' && selectedDate) {
      const firstDayOfWeek = startOfWeek(selectedDate);
      const lastDayOfWeek = endOfWeek(selectedDate);
      return eachDayOfInterval({ start: firstDayOfWeek, end: lastDayOfWeek });
    } else {
      const firstDayOfMonth = startOfMonth(currentMonth);
      const lastDayOfMonth = endOfMonth(currentMonth);
      const firstDayOfCalendar = startOfWeek(firstDayOfMonth);
      const lastDayOfCalendar = endOfWeek(lastDayOfMonth);
      return eachDayOfInterval({ start: firstDayOfCalendar, end: lastDayOfCalendar });
    }
  };

  const fetchData = async (date) => {
    // Fetches data required for the calendar month
  try {
    const year = date.getFullYear(); // Extract the year
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Extract and zero-pad the month
    //ZERO PADDING THE MONTH MIGHT THROW OFF OUR CODE IN THE BACKEND

    // Construct the URL
    const response = await fetch(`/journalentry/${year}/${month}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log('Fetched data:', data); // Handle data as needed
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  // Handle the previous button click
  const handlePrev = async () => {
    if (viewMode === 'month') {
      const newMonth = subMonths(currentMonth, 1);
      setCurrentMonth(newMonth);
      await fetchData(newMonth); // Fetch data for the new month
    } else {
      const newDate = subDays(selectedDate, 7); // Move one week back
      setSelectedDate(newDate);
      setCurrentMonth(startOfMonth(newDate)); // Update currentMonth to the new date's month
      await fetchData(startOfWeek(newDate)); // Fetch data for the new week
    }
  };

  // Handle the next button click
  const handleNext = async () => {
    if (viewMode === 'month') {
      const newMonth = addMonths(currentMonth, 1);
      setCurrentMonth(newMonth);
      await fetchData(newMonth); // Fetch data for the new month
    } else {
      const newDate = addDays(selectedDate, 7); // Move one week forward
      setSelectedDate(newDate);
      setCurrentMonth(startOfMonth(newDate)); // Update currentMonth to the new date's month
      await fetchData(startOfWeek(newDate)); // Fetch data for the new week
    }
  };

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
              onClick={
                isSameMonth(day, currentMonth) || viewMode === 'week'
                  ? () => {
                      setSelectedDate(day);
                      setCurrentMonth(startOfMonth(day)); // Update currentMonth to the selected date's month
                    }
                  : undefined
              }
              sx={{
                textAlign: 'center',
                padding: 2,
                borderRadius: 2,
                backgroundColor:
                  isSameDay(day, selectedDate)        // Is this the selected day?
                    ? 'primary.main'                  // Highlight the selected day
                    : isSameMonth(day, currentMonth)  // Is this day in the current month?
                      ? 'background.paper'            // Show it with normal background
                      : 'grey.200',                   // Otherwise, grey it out
                color: isSameDay(day, selectedDate) ? 'white' : 'text.primary',
                cursor: isSameMonth(day, currentMonth) || viewMode === 'week' ? 'pointer' : 'not-allowed',
                '&:hover': {
                  backgroundColor:
                    isSameDay(day, selectedDate)
                      ? 'primary.dark'
                      : isSameMonth(day, currentMonth)
                        ? 'grey.300'
                        : 'grey.200', // Prevent hover effect for non-current month days
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
