import React from 'react';

import './nflNoResults.css';

const NflNoResultsCard = ({ searchedTeamOne, searchedTeamTwo }) => {
  return (
    <div className="no-results-card">
      <div className="no-results-teams">
        <div className="no-results-home">
          <h2>{searchedTeamOne}</h2>
        </div>
        <div className="no-results-vs">
          <p>VS</p>
        </div>
        <div className="no-results-away">
          <h2>{searchedTeamTwo}</h2>
        </div>
      </div>
      <div className="no-results-stats">
        <h3 style={{ maxWidth: '250px', lineHeight: '2rem' }}>{searchedTeamOne} and {searchedTeamTwo} have yet to face each other this season.</h3>
      </div>
    </div>
  );
};

export default NflNoResultsCard;
