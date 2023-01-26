import React from 'react';

import './gameCard.css';

const GameCard = ({ game }) => {

  // date and formatting
  const dateInfo = new Date(game.date.start);
  const month = dateInfo.getMonth();
  const year = dateInfo.getFullYear();
  const date = dateInfo.getDate();

  // home and away
  const home = game.teams.home.code;
  const away = game.teams.visitors.code;

  // home and away team points
  const homePts = game.scores.home.points;
  const awayPts = game.scores.visitors.points;

  // total points scored in game
  const totalPts = game.scores.home.points + game.scores.visitors.points;

  return (
    <div className="game-card">
      <h3>{
        month === 0 ? 'January' :
          month === 1 ? 'February' :
            month === 2 ? 'March' :
              month === 3 ? 'April' :
                month === 4 ? 'May' :
                  month === 5 ? 'June' :
                    month === 6 ? 'July' :
                      month === 7 ? 'August' :
                        month === 8 ? 'September' :
                          month === 9 ? 'October' :
                            month === 10 ? 'November' :
                              'December'
      }{' '}{date}, {year} @ {home}</h3>
      <h3>Total Points Scored: {totalPts}</h3>
      <div className="final-score">
        <h3>{home}: {homePts}</h3>
        <h3>{away}: {awayPts}</h3>
      </div>
    </div>
  );
};

export default GameCard;
