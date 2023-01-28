import React, { useState } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './App.css';

// components //
import Header from './components/Header';
import Footer from './components/Footer';
// search form components
import NbaSearchForm from './components/NbaSearchForm';
import NflSearchForm from './components/NflSearchForm';

function App() {

  const [league, setLeague] = useState('');

  const handleChange = (event) => {
    setLeague(event.target.value);
  };

  return (
    <div className="App">
      <Header />
      <FormControl sx={{ width: '120px', margin: '1rem' }}>
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
      <Footer />
    </div>
  );
}

export default App;
