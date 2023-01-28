import React, { useState, useEffect } from 'react';

import './nflComparisonCard.css';

const NflComparisonCard = ({ home, homeLogo, away, awayLogo, gamesPlayed }) => {

  // games played state, avg total pts state
  const [gamesPlayedState, setGamesPlayedState] = useState(false);
  const [avgTotalPts, setAvgTotalPts] = useState();

  const checkGames = (gamesPlayed) => {
    if (gamesPlayed.length === 0) {
      setGamesPlayedState(false);
    } else {
      setGamesPlayedState(true);
      // total points scored from h2hs
      const totalPts = gamesPlayed.map((game) => {
        const homePts = game.scores.home.total
        const awayPts = game.scores.away.total;

        return homePts + awayPts;
      }).reduce((acc, currentVal) => acc + currentVal);

      // avg total points scored from h2hs
      setAvgTotalPts(totalPts / gamesPlayed.length);
    }
  }

  // executes checkGames every new search
  useEffect(() => {
    checkGames(gamesPlayed);
  }, [gamesPlayed]);

  // logos
  const homeSrc = homeLogo;
  const awaySrc = awayLogo;

  return (
    <div className="comparison-card">
      <div className="teams">
        <div className="home">
          <h2>{home}</h2>
          <img src={homeSrc} alt={`${home} logo`} />
        </div>
        <div className="vs">
          <p>VS</p>
        </div>
        <div className="away">
          <h2>{away}</h2>
          <img src={awaySrc} alt={`${away} logo`} />
        </div>
      </div>
      <div className="stats">
        {gamesPlayedState ? (
          <>
            <h3>Games played: <span className='games-played'>{gamesPlayed.length}</span></h3>
            <h3>Avg Total PPG: <span className='avg'>{Math.trunc(avgTotalPts)}</span></h3>
          </>
        ) : (
          <h3 style={{ maxWidth: '250px', lineHeight: '2rem' }}>{home.split(' ').findLast((mascot) => mascot)} and {away.split(' ').findLast((mascot) => mascot)} have yet to face each other this season.</h3>
        )}
      </div>
    </div>
  );
};

export default NflComparisonCard;
