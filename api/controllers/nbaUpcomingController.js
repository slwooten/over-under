const axios = require("axios");
require('dotenv').config()

const key = process.env.NBA_UPCOMING_KEY;

const getNbaUpcoming = async (req, res) => {
  const { teamOne, teamTwo } = req.body;

  try {
    // upcoming game request options
    const options = {
      method: 'GET',
      url: 'https://odds.p.rapidapi.com/v4/sports/basketball_nba/odds',
      params: {regions: 'us', oddsFormat: 'decimal', markets: 'totals', dateFormat: 'iso'},
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'odds.p.rapidapi.com'
      }
    };

    // upcoming game request
    const upcomingResponse = await axios(options);

    // filtering the data for actual upcoming game
    const upcomingGame = await upcomingResponse.filter((game) => {
      game.home_team.split(' ').findLast((mascot) => mascot) === teamOne && game.away_team.split(' ').findLast((mascot) => mascot) === teamTwo
    });

    console.log(upcomingGame);

    // response 
    res.status(200).jso({
      success: true,
      data: upcomingGame
    });

  } catch (error) {
    console.log(error);
  }
}

module.exports = { getNbaUpcoming };
