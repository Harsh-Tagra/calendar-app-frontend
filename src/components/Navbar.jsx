

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import {  NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
const Navigate = useNavigate();
  return (
    <AppBar position="static" className="bg-orange-custom">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Left: Calendar App title */}
        <Typography variant="h6" style={{ flex: 1 ,display:'flex',justifyContent:"flex-start"}}>
          Calendar App
        </Typography>

        {/* Center: Navigation buttons */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          
          <NavLink  to="/event"  >
          <Button color="inherit">
            My Events
          </Button>
        </NavLink>
           <NavLink to="/cal" >
          <Button color="inherit">
        Calendar
          </Button>
      </NavLink> 
         
        </div>
        
        {/* Right: Logout button */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Button color="inherit" onClick={() =>{  localStorage.clear() ; Navigate('/')}}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
