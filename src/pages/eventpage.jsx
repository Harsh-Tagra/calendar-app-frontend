
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import EventList from '../components/EventList';
import EventForm from '../components/EventForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [refresh, setRefresh] = useState(false);


const Navigate = useNavigate()
  useEffect(() => {
    // Fetch the events
    const fetchEvents = async () => {
      try {
        console.log(process.env.REACT_APP_API_URL);
        
        // Make a GET request to the /events endpoint
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/events`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store the JWT token in localStorage
          }
        });

        // Set the events data to state
 
        setEvents(response.data.data);
        
      } catch (err) {
        // Handle errors
  
        Navigate('/login')
      }
    };

    // Call the function to fetch events
    fetchEvents();
  }, [refresh]);


  // Open the form for adding a new event
  const handleAddEvent = () => {
    setEventToEdit(null);
    setOpenForm(true);
  };

  // Open the form for editing an existing event
  const handleEditEvent = async(id) => {
    await getEventById(id)
  
    setOpenForm(true);
  };

  // Close the form
  const handleCloseForm = () => {
    setOpenForm(false);
    setEventToEdit(null);
  };
 
   async function getEventById(eventId) {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/events/${eventId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add your JWT token if required
        }
      });
      setEventToEdit(response.data.data[0]);
      // Check if the response data is empty
    }catch(err){
      Navigate('/login')

    }
  }
  async function deleteEvent(eventId) {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/events/${eventId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add your JWT token if required
        }
      });
    
      setRefresh((prev) => !prev);
 
    }catch(err){
      Navigate('/login')

    }
          // Check if the response data is empty
   
  }
  
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
    
      </Typography>
      <Button
        variant="contained"
        className="bg-orange-custom" // Use custom class for consistency
        onClick={handleAddEvent}
        style={{ marginBottom: '20px' }}
      >
        Add Event
      </Button>
      <EventList
        openForm={openForm}
        handleAddEvent={handleAddEvent}
        handleClose={handleCloseForm}
        eventToEdit={eventToEdit}
      events={events} onEdit={handleEditEvent} deleteEvent={deleteEvent}setRefresh={setRefresh} />
      <EventForm
        open={openForm}
        handleClose={handleCloseForm}
        eventToEdit={eventToEdit}
        setRefresh={setRefresh}
      />
    </Container>
  );
};

export default EventPage;
