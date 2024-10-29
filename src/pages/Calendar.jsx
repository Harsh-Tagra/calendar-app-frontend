import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

const CalendarView = () => {
  const [date, setDate] = useState(new Date());
  const [currEvent, setCurrEvent] = useState(); // Corrected the variable name here
const [events, setevents] = useState([])
const Navigate = useNavigate()

useEffect(() => {
  // Fetch the events
  const fetchEvents = async () => {
    try {
      // Make a GET request to the /events endpoint
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/events`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store the JWT token in localStorage
        }
      });

      // Set the events data to state

      setevents(response.data.data);

    } catch (err) {
      // Handle errors
         Navigate('/login')
    }
  };

  // Call the function to fetch events
  fetchEvents();
}, []);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);

    const eventsOnSelectedDate = events.filter(
      (event) => new Date(event.date).toDateString() === selectedDate.toDateString()
    );

    setCurrEvent(eventsOnSelectedDate); // Corrected the variable name here
  };

  // Function to check if a date has events
  const hasEventOnDate = (date) => {
    return events.some(
      (event) => new Date(event.date).toDateString() === date.toDateString()
    );
  };

  return (
    <div className="p-4 flex">
      <Calendar
        onChange={handleDateChange}
        value={date}
        
        className="border rounded-md shadow-md  "
        tileClassName={({ date }) =>
          hasEventOnDate(date) ? 'highlighted-date' : ''
        }
      />
      <div className="mt-4">
        <ul className="list-disc pl-5">
          {currEvent && currEvent.length > 0 ? (
            currEvent.map((event) => (
              <Card
                key={event.id}
                className="shadow-md border border-gray-200 bg-white w-[60vw]" // Set white background
              >
                <CardContent>
                  <div className="mb-3">
                    <Typography variant="h5" className="font-bold text-orange-500"> {/* Set text color to orange */}
                      {event.title}
                    </Typography>
                  </div>
                  <Typography variant="h7" className="text-gray-500">
                    {event.description}
                  </Typography>
                  <div className="mt-3">
                    <Typography variant="h9" className="text-orange-400"> {/* Changed color for better contrast */}
                      {new Date(event.date).toLocaleString()}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <h1>No events on the selected date.</h1>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CalendarView;
