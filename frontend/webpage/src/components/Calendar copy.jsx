import React, { useState } from 'react';
import { Grid, Box, Typography, Paper, Button, TextField } from '@mui/material';
import {
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  eachDayOfInterval,
  format,
  isSameDay,
} from 'date-fns';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Determine the days to display based on the view mode
  const getDays = () => {
    if (viewMode === 'week' && selectedDate) {
      const firstDayOfWeek = startOfWeek(selectedDate);
      const lastDayOfWeek = endOfWeek(selectedDate);
      return eachDayOfInterval({ start: firstDayOfWeek, end: lastDayOfWeek });
    } else {
      const firstDayOfCalendar = startOfWeek(currentMonth);
      const lastDayOfCalendar = endOfWeek(addMonths(currentMonth, 1));
      return eachDayOfInterval({ start: firstDayOfCalendar, end: lastDayOfCalendar });
    }
  };

  const handlePrev = () => {
    if (viewMode === 'month') {
      setCurrentMonth(subMonths(currentMonth, 1));
    } else if (viewMode === 'week') {
      setSelectedDate((prev) => startOfWeek(subMonths(prev, 1)));
    }
  };

  const handleNext = () => {
    if (viewMode === 'month') {
      setCurrentMonth(addMonths(currentMonth, 1));
    } else if (viewMode === 'week') {
      setSelectedDate((prev) => startOfWeek(addMonths(prev, 1)));
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setViewMode('week');
    setJournalEntry(`Journal entry for ${format(date, 'MMMM d, yyyy')}`); // Placeholder entry
  };

  const handleEntryChange = (e) => {
    setJournalEntry(e.target.value);
  };

  const handleBackToMonthView = () => {
    setViewMode('month');
    setSelectedDate(null); // Optional: Clear the selected date when going back
  };

  const days = getDays();

  return (
    <Box>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        {/* Header Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Button variant="contained" onClick={handlePrev}>Prev</Button>
          <Typography variant="h5">{format(currentMonth, 'MMMM yyyy')}</Typography>
          <Button variant="contained" onClick={handleNext}>Next</Button>
        </Box>

        {/* Back to Month View Button (Only visible in weekly view) */}
        {viewMode === 'week' && (
          <Box mb={2} textAlign="center">
            <Button
              variant="outlined"
              onClick={handleBackToMonthView}
              color="secondary"
            >
              Back to Month View
            </Button>
          </Box>
        )}

        {/* Days of the Week */}
        <Grid container spacing={1}>
          {daysOfWeek.map((day) => (
            <Grid item xs={1.71} key={day}>
              <Typography align="center" fontWeight="bold">{day}</Typography>
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
              onClick={() => handleDateClick(day)}
              sx={{
                textAlign: 'center',
                padding: 2,
                borderRadius: 2,
                cursor: 'pointer',
                backgroundColor: isSameDay(day, selectedDate)
                  ? 'primary.main'
                  : 'background.paper',
                color: isSameDay(day, selectedDate) ? 'white' : 'text.primary',
                '&:hover': {
                  backgroundColor: isSameDay(day, selectedDate) ? 'primary.dark' : 'grey.300',
                },
              }}
            >
              <Typography>{format(day, 'd')}</Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Journal Entry Section */}
      {selectedDate && (
        <Paper elevation={3} sx={{ padding: 3, marginTop: 3, borderRadius: 2 }}>
          <Typography variant="h6">Journal Entry</Typography>
          <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
            {format(selectedDate, 'MMMM d, yyyy')}
          </Typography>
          <TextField
            multiline
            fullWidth
            rows={4}
            value={journalEntry}
            onChange={handleEntryChange}
            placeholder="Write your journal entry here..."
            variant="outlined"
          />
        </Paper>
      )}
    </Box>
  );
};

export default Calendar;
