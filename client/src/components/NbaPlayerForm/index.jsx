import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, Box } from '@mui/material'

import './nbaPlayerSearchForm.css';

const NbaPlayerForm = () => {

  const [formState, setFormState] = useState({ firstName: '', lastName: '' });

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  }

  // handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log("You searched for:", formState)

    // clear form
    setFormState({
      firstName: '',
      lastName: '',
    })
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit} className='nba-player-search-form'>
        <div>
          <TextField
            name='firstName'
            value={formState.firstName}
            onChange={handleChange}
            sx={{ margin: '1rem' }}
            color='success'
            id="outlined-basic"
            label="First Name"
            variant="outlined"
          />
          <TextField
            name='lastName'
            value={formState.lastName}
            onChange={handleChange}
            sx={{ margin: '1rem' }}
            color='success'
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
          />
        </div>
        <Button sx={{ maxWidth: '6rem', margin: '1rem' }} color='success' variant="contained" type='submit'>Search</Button>
      </form>
    </div>
  );
};

export default NbaPlayerForm;
