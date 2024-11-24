import React, { useState, useEffect } from 'react';
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

const ratingInts = {
  "VERY BAD": 5,
  "BAD": 4,
  "OK": 3,
  "GOOD": 2,
  "VERY GOOD": 1
}
const ratingColors = ['#ffe5ec', '#ffc2d1', '#ffb3c6', '#ff8fab', '#fb6f92'];

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [journalData, setJournalData] = useState({}); // Stores journal data for the month
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Fetch journal data for the month whenever `currentMonth` changes
  useEffect(() => {
    const fetchJournalData = async () => {
      const year = format(currentMonth, 'yyyy');
      const month = format(currentMonth, 'M'); // 1-based month
      try {
        const response = await fetch(`http://localhost:8000/journal?year=${year}&month=${month}`);
        const data = await response.json();
        setJournalData(data[`${year}-${month}`] || {}); // Save journal data for the month
      } catch (error) {
        console.error('Error fetching journal data:', error);
        setJournalData({}); // Reset journal data on error
      }
    };

    fetchJournalData();
  }, [currentMonth]);

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

    // Get the background color for a specific date based on its rating
    const getBackgroundColor = (date) => {
      const dateKey = format(date, 'yyyy-MM-dd');
      console.log("Date:", dateKey);
      if (isSameDay(date, selectedDate)) {
        return 'primary.main'; // Highlight selected cell in blue
      } 

      const ratingColor = (dateKey) => {
        const entry = journalData[dateKey];
        // console.log("Entry:", entry);
        console.log(`Journal data for ${dateKey}:\n ${JSON.stringify(entry)}`);
        if (entry && entry.rating) {
          const ratingValue = ratingInts[entry.rating];
          if (ratingValue) {
            return ratingColors[ratingValue - 1]; // Map rating to color
          }
        }
        return 'background.paper'; // Default white for no rating
      };

      return isSameMonth(date, currentMonth)
        ? ratingColor(dateKey)
        : 'grey.200';
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

  // Get the journal message and rating for the selected date
  const getJournalEntry = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const entry = journalData[dateKey] || {};
    return entry.message || 'No journal made on this day 😔';
  };

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
                    ? () => {
                        if (isSameDay(day, selectedDate)) {
                          setSelectedDate(null); // Unselect the date
                        } else {
                          setSelectedDate(day); // Highlight the new date
                        }
                      }
                    : undefined
                }
                sx={{
                  textAlign: 'center',
                  padding: 2,
                  borderRadius: 2,
                  backgroundColor: getBackgroundColor(day), // Dynamic background color
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
      {selectedDate && (
        <JournalCard
          date={format(selectedDate, 'MMMM d, yyyy')}
          message={getJournalEntry(selectedDate)} // Get the message from journalData
        />
      )}
    </>
  );
};

export default Calendar;
