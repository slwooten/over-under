import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './searchForm.css';

const SearchForm = () => {

  // form state //
  const [formState, setFormState] = useState({ teamOne: '', teamTwo: '' });

  // input helper text state //
  const [teamOneHelpText, setTeamOneHelpText] = useState('');
  const [teamTwoHelpText, setTeamTwoHelpText] = useState('');

  const getGames = async (teams) => {
    const games = await axios.post('/over-under/go', teams);

    console.log(games);
  };

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

    // validate user input //
    if (!formState.teamOne || !formState.teamTwo) {
      if (!formState.teamOne) {
        setTeamOneHelpText('Please enter a Team 1.');
        setTimeout(() => {
          setTeamOneHelpText('');
        }, "2000");
      };
      if (!formState.teamTwo) {
        setTeamTwoHelpText('Please enter a Team 2.');
        setTimeout(() => {
          setTeamTwoHelpText('');
        }, "2000");
      };
      return;
    }

    console.log('didnt return');
    // api call //
    getGames(formState);

    // clear form inputs //
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
              helperText={teamOneHelpText}
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
              helperText={teamTwoHelpText}
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
