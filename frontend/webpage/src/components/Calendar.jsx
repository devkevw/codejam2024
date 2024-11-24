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
import JournalCard from './JournalCard';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [journalMessage, setJournalMessage] = useState(''); // Message fetched from the backend
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Fetch journal message for a specific date
  const fetchJournalMessage = async (date) => {
    const year = format(date, 'yyyy');
    const month = format(date, 'M'); // 1-based month
    const day = format(date, 'd'); // Day of the month
    try {
      const response = await fetch(`http://localhost:8000/journalentry?year=${year}&month=${month}&day=${day}`);
      const data = await response.json();
      setJournalMessage(data?.message || 'No journal made on this day 😔');
    } catch (error) {
      console.error('Error fetching journal entry:', error);
      setJournalMessage('Error fetching journal entry');
    }
  };

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

  // Handle the previous button click
  const handlePrev = () => {
    if (viewMode === 'month') {
      setCurrentMonth(subMonths(currentMonth, 1));
    } else {
      const newDate = subDays(selectedDate, 7); // Move one week back
      setSelectedDate(newDate);
      setCurrentMonth(startOfMonth(newDate)); // Update currentMonth to the new date's month
    }
  };

  // Handle the next button click
  const handleNext = () => {
    if (viewMode === 'month') {
      setCurrentMonth(addMonths(currentMonth, 1));
    } else {
      const newDate = addDays(selectedDate, 7); // Move one week forward
      setSelectedDate(newDate);
      setCurrentMonth(startOfMonth(newDate)); // Update currentMonth to the new date's month
    }
  };

  const days = getDaysToDisplay();

  return (
    <>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        {/* Header Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Button variant="contained" onClick={handlePrev}>
            Prev
          </Button>
          <Typography variant="h5">
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
              <Typography align="center" variant="subtitle1">
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
                    ? async () => {
                        if (isSameDay(day, selectedDate)) {
                          // If the same date is clicked, unselect it
                          setSelectedDate(null);
                          setJournalMessage(''); // Clear the journal message
                        } else {
                          // Set selected date and fetch journal entry
                          setSelectedDate(day);
                          await fetchJournalMessage(day);
                        }
                      }
                    : undefined
                }
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
                  cursor: isSameMonth(day, currentMonth) || viewMode === 'week' ? 'pointer' : 'not-allowed',
                  '&:hover': {
                    backgroundColor: isSameDay(day, selectedDate)
                      ? 'primary.dark'
                      : isSameMonth(day, currentMonth)
                      ? 'grey.300'
                      : 'grey.200',
                  },
                }}
              >
                <Typography variant="body1">{format(day, 'd')}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Journal Card */}
      <JournalCard
        date={selectedDate ? format(selectedDate, 'MMMM d, yyyy') : null}
        message={journalMessage}
      />
    </>
  );
};

export default Calendar;
