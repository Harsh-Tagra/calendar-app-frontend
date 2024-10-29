// src/pages/HomePage.jsx

import React, { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
 
const HomePage = () => {
  const Navigate = useNavigate()
  // Simulating authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle login (for demo purposes)
  const handleLogin = () => {
    Navigate('/login')
  };
  useEffect(()=>{
if(localStorage.getItem("token")){
  setIsAuthenticated(true)
}
},[])
  // Function to handle logout (for demo purposes)
  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <div className=" min-h-screen flex items-center justify-center">
      <Container maxWidth="md" style={{ textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom className='text-orange-500'>
          Welcome to the Calendar App
        </Typography>
        <Typography variant="h5" paragraph >
          Manage your events and meetings easily. Create, view, edit, and delete your calendar events in one place.
        </Typography>
        {isAuthenticated ? (
          <Button
            variant="contained"
            // Use custom class
   onClick={()=>{Navigate('/event')}}
            style={{ marginRight: '10px' }}
          >
            View Events
          </Button>
        ) : (
          <Button
            variant="outlined"
            className="bg-orange-custom" // Use custom class
   
            onClick={handleLogin} // Simulate login
          >
            Login
          </Button>
        )}
        {isAuthenticated ? (
          <Button
            variant="contained"
            color="error" // Use custom class
            onClick={handleLogout} // Simulate logout
            style={{ marginLeft: '10px' }}
          >
            Logout
          </Button>
        )
   :(
        <Button
          variant="contained"
          color="success" // Use custom class
          style={{ marginLeft: '10px' }}
          onClick={()=>{ Navigate('/reg')}}
        >
          Register
        </Button>
  )
      }
      </Container>
    </div>
  );
};

export default HomePage;
