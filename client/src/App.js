import React, { useState } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import './App.css';

// components //
import Header from './components/Header';
import Footer from './components/Footer';
import TeamStats from './components/TeamStats';
import PlayerStats from './components/PlayerStats';

function App() {

  const [alignment, setAlignment] = useState('Team Stats');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div className="App">
      <Header />
      <ToggleButtonGroup
        color="success"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{ margin: '1rem'}}
      >
        <ToggleButton value="Team Stats">Team Stats</ToggleButton>
        <ToggleButton value="Player Stats">Player Stats</ToggleButton>
      </ToggleButtonGroup>
      {alignment === 'Team Stats' ? (
        <TeamStats />
      ) : alignment === 'Player Stats' ? (
        <PlayerStats />
      ) : (
        <></>
      )}
      <Footer />
    </div>
  );
}

export default App;
