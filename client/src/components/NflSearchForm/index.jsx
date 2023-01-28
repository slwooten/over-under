import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

// game card components //
import NflGameCard from '../NflGameCard';
import NflComparisonCard from '../NflComparisonCard';

// no results card //
import NflNoResultsCard from '../NflNoResultsCard';

// nfl teams array //
import nflTeams from '../../utils/nflTeams';

import './nfl.css';

const NflSearchForm = () => {

  const sortedNfl = nflTeams.sort();

  // form state //
  const [formState, setFormState] = useState({ teamOne: '', teamTwo: '' });

  // results state //
  const [results, setResults] = useState();

  // input helper text state //
  const [teamOneHelpText, setTeamOneHelpText] = useState('');
  const [teamTwoHelpText, setTeamTwoHelpText] = useState('');

  // search state //
  const [searched, setSearched] = useState(false);

  // searched teams state //
  const [searchedTeamOne, setSearchedTeamOne] = useState('');
  const [searchedTeamTwo, setSearchedTeamTwo] = useState('');


  // api call
  const getGames = async (teams) => {
    try {
      const response = await axios.post('/over-under/nfl', teams);

      const games = await response.data.data;
      setResults(games);
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

    // hide search form
    setSearched(true);

    // api call 
    getGames(formState);

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
                  options={sortedNfl}
                  onChange={(event, value) => {
                    setFormState({
                      ...formState,
                      teamOne: value
                    })
                    setSearchedTeamOne(value)
                  }}
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
                  options={sortedNfl}
                  onChange={(event, value) => {
                    setFormState({
                      ...formState,
                      teamTwo: value
                    })
                    setSearchedTeamTwo(value)
                  }}
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
        }} variant='contained' onClick={() => {
          setSearched(false)
          setResults()
        }}>New Search</Button>
      )}
      <div className="results-container">
        {results === false ? (
          <div className='limit-reached'>
            <h2>You've reached your search limit. Please try again in 24hrs.</h2>
            <p>Free searches up to 3 per day.</p>
          </div>
        ) : (
          <div></div>
        )}
        {!results || searched === false ? (
          <div></div>
        ) : results.length === 0 ? (
          <NflNoResultsCard searchedTeamOne={searchedTeamOne} searchedTeamTwo={searchedTeamTwo} />
        ) : (
          <div>
            <NflComparisonCard
              home={results[0].teams.home.name}
              homeLogo={results[0].teams.home.logo}
              away={results[0].teams.away.name}
              awayLogo={results[0].teams.away.logo}
              gamesPlayed={
                results.filter(game => game.game.status.long === 'Finished')
              }
            />
            <div className="game-cards-container">
              <h3>
                {results[0].teams.home.name.split(' ').findLast((mascot) => mascot)} and {results[0].teams.away.name.split(' ').findLast((mascot) => mascot)} this season...
              </h3>
              <div className='game-cards'>
                {results.filter(game => game.game.status.long === 'Finished')
                  .reverse()
                  .map((result, index) => {
                    return <NflGameCard key={index} game={result} />
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NflSearchForm;
