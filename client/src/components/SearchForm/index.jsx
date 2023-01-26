import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './searchForm.css';

const SearchForm = () => {

  // form state //
  const [formState, setFormState] = useState({ teamOne: '', teamTwo: '' });

  // handle input changes //
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // handle form submission //
  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log(formState);

    setFormState({
      teamOne: '',
      teamTwo: ''
    });
  }

  return (
    <div>
      <h2 className="league">NBA</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form">
          <div className="inputs">
            <TextField
              onChange={handleChange}
              name='teamOne'
              sx={{ margin: '1rem' }}
              color='success'
              id="outlined-basic"
              label="Team 1"
              variant="outlined"
              value={formState.teamOne} />
            <p>vs</p>
            <TextField
              onChange={handleChange}
              name='teamTwo'
              sx={{ margin: '1rem' }}
              color='success'
              id="outlined-basic"
              label="Team 2"
              variant="outlined"
              value={formState.teamTwo} />
          </div>
          <Button sx={{
            margin: '1rem',
            backgroundColor: 'green',
            '&:hover': {
              backgroundColor: 'green',
            },
            textTransform: 'none'
          }} variant="contained" type='submit' onClick={handleFormSubmit}>Go</Button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
