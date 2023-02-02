const axios = require("axios");
require('dotenv').config()

const year = new Date().getFullYear() - 1;
const key = process.env.NBA_PLAYER_KEY;

const getNbaPlayer = async (req, res) => {

  let playerId;
  let totalPts = 0;
  let totalReb = 0;
  let totalAssists = 0;
  let totalSteals = 0;
  let totalTurnovers = 0;
  let totalBlocks = 0;

  const { firstName, lastName } = req.body;

  try {
    // options for finding player
    const options = {
      method: 'GET',
      url: 'https://api-nba-v1.p.rapidapi.com/players',
      params: { search: lastName },
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
      }
    };

    // player request
    const results = await axios.request(options);

    // filtering for player the user searched for
    results.data.response.map((item) => {
      if (item.firstname.toLowerCase() === firstName.toLowerCase()) {
        playerId = item.id;
      }
    })

    ////////////////////////////////////////////////

    // player stats options
    const statOptions = {
      method: 'GET',
      url: 'https://api-nba-v1.p.rapidapi.com/players/statistics',
      params: {id: playerId, season: year},
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
      }
    };

    // stats response
    const statsRes = await axios.request(statOptions);

    // getting player name
    const playerName = `${statsRes.data.response[0].player.firstname} ${statsRes.data.response[0].player.lastname}`;

    // getting totals
    statsRes.data.response.map((game) => {
      totalPts += game.points;
      totalReb += game.totReb;
      totalAssists += game.assists;
      totalSteals += game.steals;
      totalBlocks += game.blocks;
      totalTurnovers += game.turnovers; 
    })

    // getting averages
    const avgPts = Math.round(totalPts / statsRes.data.response.length);
    const avgReb = Math.round(totalReb / statsRes.data.response.length);
    const avgAssists = Math.round(totalAssists / statsRes.data.response.length);
    const avgSteals = Math.round(totalSteals / statsRes.data.response.length);
    const avgBlocks = Math.round(totalBlocks / statsRes.data.response.length);
    const avgTurnovers = Math.round(totalTurnovers / statsRes.data.response.length);

    // compiled player info
    const playerStats = {
      playerName,
      avgPts,
      avgReb,
      avgAssists,
      avgSteals,
      avgBlocks,
      avgTurnovers
    };

    res.status(200).json({
      status: 'Success',
      data: playerStats
    });

  } catch (error) {
    console.log(error);
  }
}

module.exports = { getNbaPlayer };