import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// game card component//
import NbaGameCard from '../NbaGameCard';
import NbaComparisonCard from '../NbaComparisonCard';

// nba teams array //
import nbaTeams from '../../utils/nbaTeams';

import './nba.css';

const NbaSearchForm = () => {

  const sortedNba = nbaTeams.sort();

  // form state //
  const [formState, setFormState] = useState({ teamOne: '', teamTwo: '' });

  // results state (previous games) //
  const [results, setResults] = useState();

  // upcoming game results state //
  const [upcomingResults, setUpcomingResults] = useState();

  // input helper text state //
  const [teamOneHelpText, setTeamOneHelpText] = useState('');
  const [teamTwoHelpText, setTeamTwoHelpText] = useState('');

  // search state //
  const [searched, setSearched] = useState(false);

  // loading state //
  const [loading, setLoading] = useState(false);


  // api call
  const getGames = async (teams) => {
    try {
      const response = await axios.post('/over-under/nba', teams);
      const upcomingResponse = await axios.post('/over-under/nba/upcoming', teams);

      console.log('upcoming response', upcomingResponse);

      const games = await response.data.data;
      const upcoming = await upcomingResponse.data.data;
      
      setResults(games);
      setUpcomingResults(upcoming);
    } catch (error) {
      // logs out too many request error
      console.log(error.response.data);
      setResults(false);
    }
  };

  // handle form submission //
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // validate user input 
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

    // show loader
    setLoading(true);
    // hide loader
    setTimeout(() => {
      setLoading(false);
    }, "2000");

    // api call 
    getGames(formState);

    // hide search form
    setSearched(true);

    // clear form inputs
    setFormState({
      teamOne: '',
      teamTwo: ''
    });
  }

  return (
    <div>
      {!searched ? (
        <>
          <form onSubmit={handleFormSubmit}>
            <div className="form">
              <div className="inputs">
                <Autocomplete
                  autoSelect
                  id="auto-select"
                  options={sortedNba}
                  onChange={(event, value) => setFormState({
                    ...formState,
                    teamOne: value
                  })}
                  name='teamOne'
                  renderInput={(params) =>
                    <TextField
                      {...params}
                      sx={{ margin: '1rem', width: 200 }}
                      helperText={teamOneHelpText}
                      label="Team 1"
                      value={formState.teamOne} />
                  }
                />
                <p>vs</p>
                <Autocomplete
                  autoSelect
                  id="auto-select"
                  options={sortedNba}
                  onChange={(event, value) => setFormState({
                    ...formState,
                    teamTwo: value
                  })}
                  name='teamTwo'
                  renderInput={(params) =>
                    <TextField
                      {...params}
                      sx={{ margin: '1rem', width: 200 }}
                      helperText={teamTwoHelpText}
                      label="Team 1"
                      value={formState.teamTwo} />
                  }
                />
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
        </>
      ) : (
        <Button sx={{
          margin: '1rem',
          backgroundColor: 'green',
          '&:hover': {
            backgroundColor: 'green',
          },
          textTransform: 'none'
        }} variant='contained' onClick={() => setSearched(false)}>New Search</Button>
      )}
      <div className="results-container">
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1rem' }}>
            <CircularProgress />
          </Box>
        ) : (
          <></>
        )}
        {results === false && loading === false ? (
          <div className='limit-reached'>
            <h2>You've reached your search limit. Please try again in 24hrs.</h2>
            <p>Free searches up to 3 per day.</p>
          </div>
        ) : (
          <div></div>
        )}
        {!results ? (
          <div></div>
        ) : loading === false ? (
          <div>
            {!upcomingResults || upcomingResults.length === 0 ? (
              <p>none here</p>
            ) : (
              <p>Booya</p>
            )}
            <NbaComparisonCard
              home={results[0].teams.home.name}
              homeLogo={results[0].teams.home.logo}
              away={results[0].teams.visitors.name}
              awayLogo={results[0].teams.visitors.logo}
              gamesPlayed={
                results.filter(game => game.status.long === 'Finished')
              }
            />
            <div className="game-cards-container">
              <h3>{results[0].teams.home.nickname} and {results[0].teams.visitors.nickname} this season...</h3>
              <div className='game-cards'>
                {results.filter(game => game.status.long === 'Finished')
                  .reverse()
                  .map((result, index) => {
                    return <NbaGameCard key={index} game={result} />
                  })}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NbaSearchForm;
