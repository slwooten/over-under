import React, { useState } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// search form components
import NbaSearchForm from '../NbaSearchForm';
import NflSearchForm from '../NflSearchForm';

const TeamStats = () => {

  const [league, setLeague] = useState('');

  const handleChange = (event) => {
    setLeague(event.target.value);
  };

  return (
    <>
      <FormControl color='success' sx={{ width: '120px', margin: '1rem' }}>
        <InputLabel id="demo-simple-select-label">League</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={league}
          label="League"
          onChange={handleChange}
        >
          <MenuItem value={'NBA'}>NBA</MenuItem>
          <MenuItem value={'NFL'}>NFL</MenuItem>
        </Select>
      </FormControl>
      {league === 'NBA' ? (
        <NbaSearchForm />
      ) : league === 'NFL' ? (
        <NflSearchForm />
      ) : (
        <></>
      )}
    </>
  );
};

export default TeamStats;
