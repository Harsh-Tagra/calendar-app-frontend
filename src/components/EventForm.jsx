
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventForm = ({ open, handleClose, eventToEdit, setRefresh }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const Navigate = useNavigate()
  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setDescription(eventToEdit.description);
      setDate(new Date(eventToEdit.date).toISOString().slice(0, 16)); // Set the date in the correct format
    }
  }, [eventToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      title,
      description,
      date: new Date(date).toISOString(),
    token: `${localStorage.getItem('token')}`
    };
try {
 
  if (eventToEdit) {
    // Update existing event
    await axios.put(`${process.env.REACT_APP_API_URL}/api/events/${eventToEdit.id}`, eventData); // Update with your API endpoint
  } else {
    // Create new event
    await axios.post(`${process.env.REACT_APP_API_URL}/api/events`, eventData); // Update with your API endpoint
  }

} catch (error) {
  Navigate('/login')
}
    setRefresh((prev) => !prev); // Refresh the event list
    setTitle("");
    setDescription('');
    setDate("");
 
    handleClose(); // Close the form
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{eventToEdit ? 'Edit Event' : 'Add Event'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
  margin="dense"
  label="Date and Time"
  type="datetime-local"
  fullWidth
  variant="outlined"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  InputLabelProps={{
    shrink: true, // This ensures the label is always visible
  }}
/>

      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{handleClose()
 setTitle("");
 setDescription('');
 setDate("");


        }} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {eventToEdit ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventForm;
