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

    // filtering to get the correct game
    const isTeam = (game) => {
      const mascotArr = game.home_team.split(' ');
      const mascot = mascotArr.at(mascotArr.length - 1);
      return mascot === (teamOne || teamTwo);
    }

    // upcoming game
    const upcomingGame = await upcomingResponse.data.filter(isTeam);

    // response 
    res.status(200).json({
      success: true,
      data: upcomingGame
    });

  } catch (error) {
    console.log(error);
  }
}

module.exports = { getNbaUpcoming };
